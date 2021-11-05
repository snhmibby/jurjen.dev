export function Hello(msg) {
	return "Hello " + msg;
}

export function CountButton() {
	const [val, set] = React.useState(0);
	return (
		<button onClick={()=>set(val+1)}>{val}</button>
	)
}
