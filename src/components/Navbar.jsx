import React, { useRef, useEffect, useState } from "react";
import "./Navbar.scss";
import grip from "./grip.svg";
import play from "./play.svg";

export default function Navbar({ currentTitle, setCurrentTitle, run, save }) {
	const toggleSidebar = () => {
		document.body.classList.toggle("sidebar-open");
	};

	const titleRef = useRef();
	const updateTitle = () => {
		console.log("updateTitle");
		const newTitle = titleRef.current.textContent.trim().toLowerCase();

		if (newTitle.length > 0) {
			setCurrentTitle(newTitle);
		}

		titleRef.current.textContent = currentTitle;
	};

	useEffect(() => {
		titleRef.current.textContent = currentTitle;
	}, [currentTitle]);

	const titleKeyDown = event => {
		if (event.key === "Enter") {
			titleRef.current.blur();
			event.preventDefault();
		}
	};

	return (
		<nav>
			<div className="left">
				<div className="grip">
					<img id="grip" onClick={toggleSidebar} src={grip} alt="::" />
				</div>

				<h1
					id="title"
					ref={titleRef}
					contentEditable="true"
					suppressContentEditableWarning={true}
					onBlur={updateTitle}
					onKeyDown={titleKeyDown}
				>
					{currentTitle}
				</h1>
			</div>

			<div className="buttons">
				<img
					id="run"
					src={play}
					alt=">"
					onClick={run}
					style={{ color: "green" }}
				/>
				<button onClick={save}>Save</button>
			</div>
		</nav>
	);
}
