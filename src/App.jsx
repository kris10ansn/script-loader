import React, { useState } from "react";
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

    const projectTitles = Array.from(projects.keys());
    const title = projectTitles[projectTitles.length - 1];
    const code = projects.get(title);

    const [saved, setSaved] = useState(false);
    const [currentTitle, setCurrentTitle] = useState(title);
    const [currentCode, setCurrentCode] = useState(code);

    const updateProjects = () => {
        setProjects(projects);
    };

    const store = () => {
        const projectsArray = Array.from(projects.entries());

        localStorage.setItem("projects", JSON.stringify(projectsArray));
        // chrome.storage.sync.set({ projects: projectsArray });
    };

    // chrome.storage.sync.get(({ projects: values }) => {
    // 	if (!values) {
    // 		return;
    // 	}

    // 	for (const [key, value] of values) {
    // 		if (!projects.has(key)) {
    // 			projects.set(key, value);
    // 		}
    // 	}

    // 	store();
    // });

    const save = () => {
        let title = currentTitle;
        if (!currentTitle || currentTitle.trim().length === 0) {
            title = generateDefaultTitle(projects);
            setCurrentTitle(title);
        }

        projects.set(title, currentCode);
        updateProjects();

        store();

        setSaved(true);
    };

    const changeProject = (name) => {
        const change = () => {
            setCurrentTitle(name);
            setCurrentCode(projects.get(name));
            setSaved(true);

            if (!name) {
                setCurrentCode("");
                setCurrentTitle("");
            }
        };

        if (!saved && Boolean(currentTitle)) {
            const doChange = window.confirm(
                `Are you sure you want to close ${currentTitle}? You have unsaved changes!`
            );
            if (doChange) {
                change();
            }
        } else {
            change();
        }
    };

    const newProject = () => {
        const create = () => {
            const title = generateDefaultTitle(projects);
            const code = "";

            setCurrentCode(code);
            setCurrentTitle(title);
            setSaved(false);
        };

        if (!saved && Boolean(currentTitle)) {
            const doCreate = window.confirm(
                `Are you sure you want to close ${currentTitle}? You have unsaved changes!`
            );
            doCreate && create();
        } else {
            create();
        }
    };

    const run = (code) => {
        save();
        if ("chrome" in window && "tabs" in window.chrome) {
            chrome.tabs.query(
                {
                    active: true,
                    currentWindow: true,
                },
                ([tab]) => {
                    chrome.tabs.sendMessage(tab.id, { run: code });
                    chrome.tabs.sendMessage(tab.id, {
                        run: `console.log("%cScript-Loader ran code!", "font-size:1.3rem;background:white;color:black;font-weight:bold;")`,
                    });
                    window.close();
                }
            );
        } else {
            window.eval(code);
        }
    };

    const keyDown = (event) => {
        if (event.ctrlKey && event.key === "s") {
            event.preventDefault();
            save();
        }

        if (event.ctrlKey && event.key === "t") {
            event.preventDefault();
            changeProject("");
        }
    };

    const changeTitle = (newTitle) => {
        if (saved) {
            projects.delete(currentTitle);
            projects.set(newTitle, currentCode);

            updateProjects();
        }
        setCurrentTitle(newTitle);
    };

    const deleteProject = (name) => {
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
                    currentCode={currentCode}
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
