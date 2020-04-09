import "./Sidebar.scss";
import plus from "../assets/plus.svg";
import run from "../assets/play.svg";
import arrow from "../assets/white-arrow.svg";
import trash from "../assets/delete.svg";
import React, { useState } from "react";

function Sidebar({
    projects,
    changeProject,
    newProject,
    deleteProject,
    updateProjects,
    currentTitle,
}) {
    const [updateValue, setUpdateValue] = useState(false);

    const update = () => {
        setUpdateValue(!updateValue);
    };

    const toggleSidebar = () => {
        document.body.classList.toggle("sidebar-open");
    };

    const createProject = () => {
        newProject();
        toggleSidebar();
    };

    const projectOpener = (name) => {
        return () => {
            changeProject(name);
            toggleSidebar();
        };
    };

    const projectDeleter = (name) => {
        return () => {
            deleteProject(name);
            updateProjects();

            update();

            if (currentTitle === name) {
                changeProject("", true);
            }
        };
    };

    const projectRunner = (name) => {
        return () => {
            const code = projects.get(name);
            run(code);
        };
    };

    return (
        <div className="Sidebar">
            <div className="new-project" onClick={createProject}>
                <img src={plus} alt="+" />
                <h1>New Project</h1>
            </div>

            <div className="projects">
                {Array.from(projects.keys()).map((title, index) => (
                    <div className="project" key={index}>
                        <div className="left" onClick={projectOpener(title)}>
                            <img src={arrow} alt=">" className="arrow" />
                            <h1>
                                {title.toUpperCase().substring(0, 13)}
                                {title.length > 13 ? "..." : ""}
                            </h1>
                        </div>
                        <div className="buttons">
                            <img
                                src={run}
                                alt=">"
                                onClick={projectRunner(title)}
                                className="run"
                            />
                            <img
                                src={trash}
                                alt="delete"
                                onClick={projectDeleter(title)}
                                className="delete"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Sidebar;
