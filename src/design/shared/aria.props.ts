export interface AriaProps {
    // Labelling & description — global, safe on any component
  "aria-label"?:            string;
  "aria-labelledby"?:       string;   // space-separated id refs
  "aria-describedby"?:      string;   // space-separated id refs
  "aria-description"?:      string;   // ARIA 1.3, newer AT support
  "aria-details"?:          string;   // single id ref
  "aria-roledescription"?:  string;
  "aria-keyshortcuts"?:     string;
  "aria-hidden"?:           boolean | "false" | "true";
  "aria-current"?:          boolean | "false" | "true" | "page" | "step" | "location" | "date" | "time";

  // Relationships — reasonable globally
  "aria-controls"?:         string;   // space-separated id refs
  "aria-owns"?:             string;   // space-separated id refs
  "aria-flowto"?:           string;   // space-separated id refs

  // Live region — if any component can become a live region in your system
  "aria-live"?:             "off" | "polite" | "assertive";
  "aria-atomic"?:           boolean | "false" | "true";
  "aria-relevant"?:         "additions" | "additions removals" | "additions text" | "all" | "removals" | "removals additions" | "removals text" | "text" | "text additions" | "text removals";
}
