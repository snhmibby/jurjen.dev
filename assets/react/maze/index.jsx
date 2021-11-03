const GameState = {
	Starting: "Starting",
	Building: "Building",
	Playing: "Playing"
};

const helptext = new Map([
	[GameState.Starting, "Pick the grid size for you game"],
])

/* helper functions */
function InputNum(props) {
	return (
		<input
			type="number"
			value={props.val}
			onChange={(e) => props.setVal(parseInt(e.target.value))}
		/>
	)
}

/* How way out works:
 * 2 players each have an amount of walls and a treasure.
 * Each creates a little maze & hides the treasure in it.
 * Players take turns exploring each others maze, 
 *   if you hit a wall your turn is over.
 * You enter the maze on field (0,0)
 * Game keeps track of walls you bumped into and fields you visited
 */

const path = 0;
const wall = 1;
const treasure = 2;
const explored = 3;
const fieldNames = ["path", "wall", "treasure", "explored"];

function Field(props) {
	return (
		<button className={props.type} onClick={props.onClick} />
	);
}

function Maze(props) {
	return (
		<table className="maze-table">{props.maze.map((row, x) =>
			<tr> {row.map((type, y) =>
				<Field
					type={fieldNames[type]}
					onClick={() => props.onClick(x, y)}
				/>
			)} </tr>
		)} </table>
	)
}

function Start(props) {
	const [height, setHeight] = React.useState(10);
	const [width, setWidth] = React.useState(10);

	return (
		<div>
			<label>Maze height:
				<InputNum val={height} setVal={setHeight} />
			</label>
			<label>Maze width:
				<InputNum val={width} setVal={setWidth} />
			</label>
			<button onClick={() => {
				props.setMaze(newMaze(height, width));
				props.setState(GameState.Building);
			}}>
				Start game!
			</button>
		</div>
	)
}

function Game(props) {
	const [state, setState] = React.useState(GameState.Starting);
	const [maze, setMaze] = React.useState([]);
	switch (state) {
		case GameState.Starting:
			return <Start setState={setState} setMaze={setMaze} />;
		case GameState.Building:
			return <Build setState={setState} maze={maze} setMaze={setMaze} />;
		case GameState.Playing:
			alert('TODO');
			break;
	}
}

function Build(props) {
	return (
		<div>
			<Maze
				maze={props.maze}
				onClick={(x, y) => toggleCell(props.maze, props.setMaze, x, y)}
			/>
			<button onClick={() => props.setState(GameState.Playing)}> Start! </button>
		</div>
	);
}

function newMaze(h, w) {
	let m = [];
	for (let i = 0; i < h; i++) {
		m.push(new Array(w).fill(path));
	}
	return m;
}

function toggleCell(maze, set, x, y) {
	if (x == 0 && y == 0) {
		return;
	}
	var newtype = path;
	switch (maze[x][y]) {
		case wall:
			newtype = path;
			break;
		case path:
			newtype = wall;
			break;
		default:
			newtype = path;
			break;
	}
	let m = maze.slice();
	m[x] = maze[x].slice();
	m[x][y] = newtype;
	set(m);
}

ReactDOM.render(<Game />, document.getElementById('React-Test'));


