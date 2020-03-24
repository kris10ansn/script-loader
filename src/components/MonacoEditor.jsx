import React from "react";
import Editor, { monaco } from "@monaco-editor/react";
import "./MonacoEditor.scss";

export default function MonacoEditor() {
	const toggleSidebar = () => {
		document.body.classList.toggle("sidebar-open");
	};

	monaco.config({
		urls: {
			monacoLoader: "./vs/loader.js",
			monacoBase: "./vs"
		}
	});
	return (
		<div className="monaco-editor">
			<Editor
				height="100%"
				language="javascript"
				theme="vs-dark"
				value={'console.log("Hello, world!");\n'}
				options={{
					fontSize: 22,
					minimap: {
						enabled: false
					}
				}}
			></Editor>
			<div className="overlay" onClick={toggleSidebar}></div>
		</div>
	);
}
