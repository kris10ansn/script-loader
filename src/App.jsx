import React, { useState, useEffect } from "react";
import MonacoEditor from "./components/MonacoEditor";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import generateDefaultTitle from "./generateTitle";
import "./App.scss";

/* global chrome */

function App() {
	const savedProjectsArray = JSON.parse(
		localStorage.getItem("projects") || "[]"
	);
	const [projects, setProjects] = useState(new Map(savedProjectsArray));

	const [saved, setSaved] = useState(false);
	const [currentTitle, setCurrentTitle] = useState("");
	const [currentCode, setCurrentCode] = useState("");

	const updateProjects = () => {
		setProjects(projects);
	};

	const store = () => {
		const projectsArray = Array.from(projects.entries());
		localStorage.setItem("projects", JSON.stringify(projectsArray));
	};

	const save = () => {
		if (currentTitle.length === 0) {
			setCurrentTitle(generateDefaultTitle(projects));
		}

		projects.set(currentTitle, currentCode);
		updateProjects();

		store();

		setSaved(true);
	};

	const changeProject = (name, overrideConfirmation = false) => {
		const changeProject = () => {
			setCurrentTitle(name);
			setCurrentCode(projects.get(name));
			setSaved(true);

			if (!name) {
				setCurrentCode("");
				setCurrentTitle("");
			}
		};

		if (!saved && !overrideConfirmation) {
			const doChange = window.confirm(
				`Are you sure you want to close ${currentTitle}? You have unsaved changes!`
			);
			if (doChange) {
				changeProject();
			}
		} else {
			changeProject();
		}
	};

	const newProject = (override = false) => {
		const create = () => {
			const title = generateDefaultTitle(projects);
			const code = "";

			setCurrentCode(code);
			setCurrentTitle(title);
			setSaved(false);
		};

		if (!override && !saved) {
			const doCreate = window.confirm(
				`Are you sure you want to close ${currentTitle}? You have unsaved changes!`
			);
			doCreate && create();
		} else {
			create();
		}
	};

	const run = () => {
		chrome.tabs.query(
			{
				active: true,
				currentWindow: true
			},
			([tab]) => {
				chrome.tabs.sendMessage(tab.id, { run: currentCode });
			}
		);
	};

	const keyDown = event => {
		if (event.ctrlKey && event.key === "s") {
			event.preventDefault();
			save();
		}
	};

	const changeTitle = newTitle => {
		if (saved) {
			projects.delete(currentTitle);
			projects.set(newTitle, currentCode);

			updateProjects();
		}
		setCurrentTitle(newTitle);
	};

	const deleteProject = name => {
		projects.delete(name);

		store();
	};

	return (
		<div className="App">
			<Sidebar
				projects={projects}
				changeProject={changeProject}
				newProject={newProject}
				deleteProject={deleteProject}
				updateProjects={updateProjects}
				currentTitle={currentTitle}
			></Sidebar>
			<div className="main" onKeyDown={keyDown}>
				<Navbar
					currentTitle={currentTitle}
					setCurrentTitle={changeTitle}
					deleteProject={deleteProject}
					run={run}
					save={save}
					saved={saved}
				></Navbar>
				<MonacoEditor
					currentCode={currentCode}
					setCurrentCode={setCurrentCode}
					setSaved={setSaved}
					currentTitle={currentTitle}
					projects={projects}
				></MonacoEditor>
			</div>
		</div>
	);
}
export default App;
