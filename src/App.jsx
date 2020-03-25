import React, { useState, useEffect } from "react";
import MonacoEditor from "./components/MonacoEditor";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import generateDefaultTitle from "./generateTitle";
import "./App.scss";

function App() {
	const savedProjectsArray = JSON.parse(
		localStorage.getItem("projects") || "[]"
	);

	const [currentTitle, setCurrentTitle] = useState("");
	const [currentCode, setCurrentCode] = useState("");
	const [projects, setProjects] = useState(new Map(savedProjectsArray));

	useEffect(() => {
		const title = generateDefaultTitle(projects);
		const code = "alert(1);";

		setCurrentCode(code);
		setCurrentTitle(title);
	}, []);

	const updateProjects = () => {
		setProjects(projects);
	};

	const save = () => {
		console.log("save");
		projects.set(currentTitle, currentCode);
		updateProjects();

		const projectsArray = Array.from(projects.entries());
		localStorage.setItem("projects", JSON.stringify(projectsArray));
	};

	const saved = () => {
		return projects.get(currentTitle) !== undefined;
	};

	const changeProject = name => {
		const changeProject = () => {
			setCurrentTitle(name);
			setCurrentCode(projects.get(name));
		};

		if (!saved()) {
			const doChange = window.confirm("Do you want to switch without saving?");
			if (doChange) {
				changeProject();
			}
		} else {
			changeProject();
		}
	};

	const run = () => {
		window.eval(currentCode);
	};

	/** @param {KeyboardEvent} [event] */
	const keyDown = event => {
		if (event.ctrlKey && event.key === "s") {
			event.preventDefault();
			save();
		}
	};

	window.test = { changeProject };

	return (
		<div className="App">
			<Sidebar projects={projects}></Sidebar>
			<div className="main" onKeyDown={keyDown}>
				<Navbar
					currentTitle={currentTitle}
					setCurrentTitle={setCurrentTitle}
					run={run}
					save={save}
				></Navbar>
				<MonacoEditor
					currentCode={currentCode}
					setCurrentCode={setCurrentCode}
				></MonacoEditor>
			</div>
		</div>
	);
}
export default App;
