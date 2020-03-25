import "./Sidebar.scss";
import plus from "./plus.svg";
import arrow from "./white-arrow.svg";
import React, { useState, useEffect } from "react";

function Sidebar({ projects }) {
	const toggleSidebar = () => {
		document.body.classList.toggle("sidebar-open");
	};

	const newProject = () => {
		console.error("TODO: newProject() @ Sidebar.jsx");
		toggleSidebar();
	};

	const createProjectOpener = name => {
		// Could remove braces but won't because of readability
		return () => {
			console.error("TODO: openProject() @ Sidebar.jsx");
			console.error(`Open ${name}`);
			toggleSidebar();
		};
	};

	return (
		<div className="Sidebar">
			<div className="new-project" onClick={newProject}>
				<img src={plus} alt="+" />
				<h1>New Project</h1>
			</div>

			<div className="projects">
				{Array.from(projects.keys()).map((title, index) => (
					<div
						className="project"
						key={index}
						onClick={createProjectOpener(title)}
					>
						<img src={arrow} alt=">" />
						<h1>{title.toUpperCase()}</h1>
					</div>
				))}
			</div>
		</div>
	);
}
export default Sidebar;
