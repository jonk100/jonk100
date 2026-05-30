const fs = require('fs');
const file = '/home/jk/Code/portfolio/src/pages/design.astro';
let content = fs.readFileSync(file, 'utf8');

const imports = `
// New Typography
import Code from '../components/ui/primitives/Code.astro';
import List from '../components/ui/primitives/List.astro';

// New Layout (Card, Groups)
import Card from '../components/ui/layout/Card.astro';
import CardHeader from '../components/ui/layout/CardHeader.astro';
import CardContent from '../components/ui/layout/CardContent.astro';
import CardFooter from '../components/ui/layout/CardFooter.astro';
import ButtonGroup from '../components/ui/layout/ButtonGroup.astro';
import LinkGroup from '../components/ui/layout/LinkGroup.astro';
import BadgeGroup from '../components/ui/layout/BadgeGroup.astro';

// New Forms
import InputGroup from '../components/ui/input/InputGroup.astro';
import Select from '../components/ui/input/Select.astro';
import Search from '../components/ui/input/Search.astro';
import ComboBox from '../components/ui/input/ComboBox.astro';
import Switch from '../components/ui/input/Switch.astro';
import Checkbox from '../components/ui/input/Checkbox.astro';
import Radio from '../components/ui/input/Radio.astro';
import RadioGroup from '../components/ui/input/RadioGroup.astro';

// New Feedback
import Alert from '../components/ui/feedback/Alert.astro';
import AlertDialog from '../components/ui/overlay/AlertDialog.astro';

// New Tables
import Table from '../components/ui/data/Table.astro';
import TableCaption from '../components/ui/data/TableCaption.astro';
import TableHead from '../components/ui/data/TableHead.astro';
import TableHeading from '../components/ui/data/TableHeading.astro';
import TableBody from '../components/ui/data/TableBody.astro';
import TableRow from '../components/ui/data/TableRow.astro';
import TableCell from '../components/ui/data/TableCell.astro';
import TableFooter from '../components/ui/data/TableFooter.astro';
`;

content = content.replace('---', '---\n' + imports);

const sections = `
				<!-- NEW COMPONENTS SHOWCASE -->
				<Divider class="mt-4" />
				<Text type="h2" class="mt-4">9. Typography Extras</Text>
				<Code>const hello = "world";</Code>
				<Code inline={false} language="javascript">function greet() {\n  return "Hello World";\n}</Code>
				
				<List type="disc" class="mt-4">
					<li>First Item</li>
					<li>Second Item</li>
				</List>

				<Text type="h2" class="mt-4">10. Advanced Layouts & Groups</Text>
				<Grid cols={2} gap="md" class="mt-4">
					<Card border>
						<CardHeader><Text type="h3">Card Title</Text></CardHeader>
						<CardContent><Text tone="muted">This is card content powered by our new structured card components.</Text></CardContent>
						<CardFooter><Button size="sm">Action</Button></CardFooter>
					</Card>
				</Grid>

				<Stack gap="md" class="mt-4">
					<ButtonGroup>
						<Button theme="secondary">Left</Button>
						<Button theme="secondary">Middle</Button>
						<Button theme="secondary">Right</Button>
					</ButtonGroup>

					<BadgeGroup>
						<Badge tone="success">Operational</Badge>
						<Badge tone="subtle">v1.2.0</Badge>
					</BadgeGroup>
				</Stack>

				<Text type="h2" class="mt-4">11. Advanced Forms</Text>
				<Grid cols={2} gap="md" class="mt-4">
					<Stack gap="sm">
						<Search placeholder="Search users..." />
						<InputGroup>
							<Input placeholder="Enter domain..." />
							<Button theme="primary">Check</Button>
						</InputGroup>
						<Select label="Country">
							<option>United States</option>
							<option>Canada</option>
						</Select>
						<ComboBox label="Framework" placeholder="Type..." options={[{value: "Astro"}, {value: "React"}]} />
					</Stack>
					<Stack gap="sm">
						<Switch label="Airplane Mode" checked />
						<Checkbox label="Accept Terms" checked />
						<RadioGroup legend="Plan">
							<Radio name="plan" value="free" label="Free Plan" checked />
							<Radio name="plan" value="pro" label="Pro Plan" />
						</RadioGroup>
					</Stack>
				</Grid>

				<Text type="h2" class="mt-4">12. Feedback & Alerts</Text>
				<Stack gap="sm" class="mt-4">
					<Alert theme="info" title="Update Available">Version 2.0 is now ready to download.</Alert>
					<Alert theme="danger" title="Connection Lost">Failed to connect to the server.</Alert>
					<Button onclick="document.getElementById('demo-alert').showModal()">Show Critical Alert</Button>
					<AlertDialog id="demo-alert" title="Delete Account" description="This action cannot be undone." theme="danger" />
				</Stack>

				<Text type="h2" class="mt-4">13. Tables</Text>
				<Paper border padding="none" class="mt-4">
					<Table>
						<TableCaption>Recent Transactions</TableCaption>
						<TableHead>
							<TableRow>
								<TableHeading>ID</TableHeading>
								<TableHeading>Amount</TableHeading>
								<TableHeading align="right">Status</TableHeading>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell>TX-123</TableCell>
								<TableCell>$120.00</TableCell>
								<TableCell align="right"><Badge tone="success">Paid</Badge></TableCell>
							</TableRow>
							<TableRow>
								<TableCell>TX-124</TableCell>
								<TableCell>$45.00</TableCell>
								<TableCell align="right"><Badge tone="warning">Pending</Badge></TableCell>
							</TableRow>
						</TableBody>
						<TableFooter>
							<TableRow hover={false}>
								<TableCell>Total</TableCell>
								<TableCell>$165.00</TableCell>
								<TableCell align="right"></TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</Paper>
`;

content = content.replace('</main>', sections + '\n\t\t\t</main>');
fs.writeFileSync(file, content);
console.log('Updated design.astro');
