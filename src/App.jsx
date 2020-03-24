import React from "react";
import MonacoEditor from "./components/MonacoEditor";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./App.scss";

function App() {
	return (
		<div className="App">
			<Sidebar></Sidebar>
			<div className="main">
				<Navbar></Navbar>
				<MonacoEditor></MonacoEditor>
			</div>
		</div>
	);
}
export default App;
