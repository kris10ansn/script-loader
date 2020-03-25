import React from "react";
import "./Navbar.scss";
import grip from "./grip.svg";
import play from "./play-button.svg";

export default function Navbar() {
	const toggleSidebar = () => {
		document.body.classList.toggle("sidebar-open");
	};

	return (
		<nav>
			<div className="left">
				<div className="grip">
					<img
						id="grip"
						onClick={toggleSidebar}
						src={grip}
						alt="::"
					/>
				</div>

				<h1 id="title" contentEditable="true">
					Untitled
				</h1>
			</div>

			<div className="buttons">
				<img id="run" src={play} alt=">" />

				<button className="save">Save</button>
			</div>
		</nav>
	);
}
