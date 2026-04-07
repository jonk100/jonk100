import type { CollectionEntry } from "astro:content";

export interface TensionDataPoint {
  label: string;
  tension: number;
  overall?: number;
  timestamp?: string;
}

/**
 * Generate a scene/beat label from beat data
 */
async function generateBeatLabel(beat: CollectionEntry<"beats">, getEntry: any): Promise<string> {
  // Get beat number from first plot if available
  const beatNumber = beat.data.plots && beat.data.plots.length > 0 ? beat.data.plots[0].beatNumber : undefined;
  
  // Debug logging
  console.log(`generateBeatLabel called for beat ${beat.id}:`, {
    beatNumber,
    scene: beat.data.scene,
    sceneType: typeof beat.data.scene
  });
  
  if (!beatNumber) {
    console.log(`No beat number found, fallback: b?`);
    return 'b?';
  }
  
  // If scene is a string, try to extract scene number from it
  if (typeof beat.data.scene === 'string') {
    const scene = beat.data.scene;
    // Extract scene number from scene path like "her-majestys-displeasure/episode-1/s2-ceremony"
    const sceneMatch = scene.match(/episode-(\d+)\/s(\d+)-/);
    if (sceneMatch) {
      const episodeNum = sceneMatch[1];
      const sceneNum = sceneMatch[2];
      console.log(`String scene extraction: ${scene} -> s${sceneNum}b${beatNumber}`);
      return `s${sceneNum}b${beatNumber}`;
    }
    
    // Fallback for other scene formats
    const altSceneMatch = scene.match(/s(\d+)-/);
    if (altSceneMatch) {
      const sceneNum = altSceneMatch[1];
      console.log(`Alt string scene extraction: ${scene} -> s${sceneNum}b${beatNumber}`);
      return `s${sceneNum}b${beatNumber}`;
    }
    
    console.log(`String scene fallback: ${scene} -> b${beatNumber}`);
    return `b${beatNumber}`;
  }
  
  // If scene is a reference, fetch the actual scene data and use its sceneNumber
  if (beat.data.scene && typeof beat.data.scene === 'object' && beat.data.scene.id) {
    try {
      console.log(`Fetching scene data for: ${beat.data.scene.id}`);
      const sceneData = await getEntry(beat.data.scene);
      console.log(`Scene data fetched:`, sceneData?.data);
      const sceneNum = sceneData?.data?.sceneNumber || 0;
      console.log(`Object scene extraction: ${beat.data.scene.id} -> s${sceneNum}b${beatNumber}`);
      return `s${sceneNum}b${beatNumber}`;
    } catch (error) {
      console.warn('Could not fetch scene data:', error);
      return `b${beatNumber}`;
    }
  }
  
  console.log(`No scene found, fallback: b${beatNumber}`);
  return `b${beatNumber}`;
}

/**
 * Extract tension data from beats for a specific plot
 */
export async function extractTensionData(
  beats: CollectionEntry<"beats">[],
  plotName?: string,
  getEntry: any
): Promise<TensionDataPoint[]> {
  const tensionData: TensionDataPoint[] = [];
  
  // Sort beats by scene and beat number
  const sortedBeats = beats.sort((a, b) => {
    const aScene: string = typeof a.data.scene === 'string' ? a.data.scene : a.data.scene?.id || '';
    const bScene: string = typeof b.data.scene === 'string' ? b.data.scene : b.data.scene?.id || '';
    const aBeatNum = a.data.beatNumber || 0;
    const bBeatNum = b.data.beatNumber || 0;
    
    // Extract scene numbers from scene IDs for proper numeric sorting
    const aSceneMatch = aScene.match(/s(\d+)-/);
    const bSceneMatch = bScene.match(/s(\d+)-/);
    const aSceneNum = aSceneMatch ? parseInt(aSceneMatch[1]) : 0;
    const bSceneNum = bSceneMatch ? parseInt(bSceneMatch[1]) : 0;
    
    if (aSceneNum !== bSceneNum) {
      return aSceneNum - bSceneNum;
    }
    return aBeatNum - bBeatNum;
  });
  
  for (const beat of sortedBeats) {
    const tension = beat.data.tension;
    
    if (plotName && tension && typeof tension === 'object' && tension.byPlot?.[plotName]) {
      // Specific plot tension
      tensionData.push({
        label: plotName,
        tension: tension.byPlot[plotName],
        overall: tension.overall,
        timestamp: await generateBeatLabel(beat, getEntry)
      });
    } else if (!plotName && tension && typeof tension === 'object' && tension.overall) {
      // Overall tension only
      tensionData.push({
        label: 'Overall',
        tension: tension.overall,
        timestamp: await generateBeatLabel(beat, getEntry)
      });
    } else if (!plotName && tension && typeof tension === 'number') {
      // Simple overall tension
      tensionData.push({
        label: 'Overall',
        tension: tension,
        timestamp: await generateBeatLabel(beat, getEntry)
      });
    }
  }
  
  return tensionData;
}

/**
 * Extract tension data for all plots in a collection of beats
 */
export async function extractAllPlotTensionData(
  beats: CollectionEntry<"beats">[],
  getEntry: any
): Promise<TensionDataPoint[]> {
  const tensionData: TensionDataPoint[] = [];
  
  // Sort beats by scene and beat number
  const sortedBeats = beats.sort((a, b) => {
    const aScene: string = typeof a.data.scene === 'string' ? a.data.scene : a.data.scene?.id || '';
    const bScene: string = typeof b.data.scene === 'string' ? b.data.scene : b.data.scene?.id || '';
    const aBeatNum = a.data.beatNumber || 0;
    const bBeatNum = b.data.beatNumber || 0;
    
    // Extract scene numbers from scene IDs for proper numeric sorting
    const aSceneMatch = aScene.match(/s(\d+)-/);
    const bSceneMatch = bScene.match(/s(\d+)-/);
    const aSceneNum = aSceneMatch ? parseInt(aSceneMatch[1]) : 0;
    const bSceneNum = bSceneMatch ? parseInt(bSceneMatch[1]) : 0;
    
    if (aSceneNum !== bSceneNum) {
      return aSceneNum - bSceneNum;
    }
    return aBeatNum - bBeatNum;
  });
  
  // Create data points for each beat
  for (const beat of sortedBeats) {
    const tension = beat.data.tension;
    const timestamp = await generateBeatLabel(beat, getEntry);
    
    // Add overall tension if available
    if (tension && typeof tension === 'object' && tension.overall) {
      tensionData.push({
        label: 'Overall',
        tension: tension.overall,
        timestamp
      });
    } else if (tension && typeof tension === 'number') {
      tensionData.push({
        label: 'Overall',
        tension: tension,
        timestamp
      });
    }
    
    // Add plot-specific tensions
    if (tension && typeof tension === 'object' && tension.byPlot) {
      Object.entries(tension.byPlot).forEach(([plotName, plotTension]) => {
        tensionData.push({
          label: plotName,
          tension: plotTension,
          timestamp
        });
      });
    }
  }
  
  return tensionData;
}

/**
 * Group tension data by plot for multi-line graphs
 */
export function groupTensionByPlot(data: TensionDataPoint[]): Map<string, TensionDataPoint[]> {
  const grouped = new Map<string, TensionDataPoint[]>();
  
  data.forEach(point => {
    if (!grouped.has(point.label)) {
      grouped.set(point.label, []);
    }
    grouped.get(point.label)!.push(point);
  });
  
  return grouped;
}

/**
 * Extract tension data for beats in a specific episode
 */
export async function extractEpisodeTensionData(
  beats: CollectionEntry<"beats">[],
  episodeId: string,
  getEntry: any
): Promise<TensionDataPoint[]> {
  const tensionData: TensionDataPoint[] = [];
  
  // Filter beats for this episode
  const episodeBeats = beats.filter(beat => {
    const scene = typeof beat.data.scene === 'string' ? beat.data.scene : beat.data.scene?.id || '';
    return scene.includes(`episode-${episodeId}/`);
  });
  
  // Sort beats by scene and beat number
  const sortedBeats = episodeBeats.sort((a, b) => {
    const aScene: string = typeof a.data.scene === 'string' ? a.data.scene : a.data.scene?.id || '';
    const bScene: string = typeof b.data.scene === 'string' ? b.data.scene : b.data.scene?.id || '';
    const aBeatNum = a.data.beatNumber || 0;
    const bBeatNum = b.data.beatNumber || 0;
    
    // Extract scene numbers from scene IDs for proper numeric sorting
    const aSceneMatch = aScene.match(/s(\d+)-/);
    const bSceneMatch = bScene.match(/s(\d+)-/);
    const aSceneNum = aSceneMatch ? parseInt(aSceneMatch[1]) : 0;
    const bSceneNum = bSceneMatch ? parseInt(bSceneMatch[1]) : 0;
    
    if (aSceneNum !== bSceneNum) {
      return aSceneNum - bSceneNum;
    }
    return aBeatNum - bBeatNum;
  });
  
  return extractAllPlotTensionData(sortedBeats, getEntry);
}

/**
 * Create tension data for scene-level visualization
 */
export async function createSceneTensionData(
  beats: CollectionEntry<"beats">[],
  getEntry: any
): Promise<TensionDataPoint[]> {
  const sceneData = new Map<string, { tensions: number[]; overallTensions: number[] }>();
  
  // Group beats by scene
  for (const beat of beats) {
    const scene = await generateBeatLabel(beat, getEntry);
    const tension = beat.data.tension;
    
    if (!sceneData.has(scene)) {
      sceneData.set(scene, { tensions: [], overallTensions: [] });
    }
    
    const sceneInfo = sceneData.get(scene)!;
    
    if (tension && typeof tension === 'object' && tension.overall) {
      sceneInfo.overallTensions.push(tension.overall);
    } else if (tension && typeof tension === 'number') {
      sceneInfo.overallTensions.push(tension);
    }
    
    if (tension && typeof tension === 'object' && tension.byPlot) {
      Object.entries(tension.byPlot).forEach(([plotName, plotTension]) => {
        sceneInfo.tensions.push(plotTension);
      });
    }
  }
  
  // Calculate average tension per scene
  const result: TensionDataPoint[] = [];
  sceneData.forEach((data, scene) => {
    const avgTension = data.tensions.length > 0 
      ? data.tensions.reduce((a, b) => a + b, 0) / data.tensions.length 
      : 0;
    
    const avgOverall = data.overallTensions.length > 0
      ? data.overallTensions.reduce((a, b) => a + b, 0) / data.overallTensions.length
      : 0;
    
    result.push({
      label: 'Scene Average',
      tension: Math.round(avgTension * 10) / 10,
      overall: Math.round(avgOverall * 10) / 10,
      timestamp: scene.split('/').pop()?.replace('.mdx', '') || scene
    });
  });
  
  return result;
}
