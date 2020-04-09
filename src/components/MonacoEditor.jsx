import React, { useState, useEffect } from "react";
import Editor, { monaco } from "@monaco-editor/react";
import "./MonacoEditor.scss";

const toggleSidebar = () => {
    document.body.classList.toggle("sidebar-open");
};

export default function MonacoEditor({
    currentCode,
    setCurrentCode,
    setSaved,
    currentTitle,
    projects,
}) {
    const [ready, setReady] = useState(false);

    const change = (ref) => {
        const code = ref.current.getValue();
        setCurrentCode(code);
    };

    const editorDidMount = (_, ref) => {
        setReady(true);
        ref.current = ref;

        change(ref);

        ref.current.onDidChangeModelContent(() => change(ref));
    };

    monaco.config({
        urls: {
            monacoLoader: "./vs/loader.js",
            monacoBase: "./vs",
        },
    });

    useEffect(() => {
        setSaved(projects.get(currentTitle) === currentCode);

        if (currentTitle === "") {
            setSaved(true);
        }
    }, [currentCode, currentTitle, projects, setSaved]);

    return (
        <div className="monaco-editor">
            <Editor
                height="100%"
                language="javascript"
                theme="vs-dark"
                value={currentCode}
                options={{
                    fontSize: 20,
                    minimap: {
                        enabled: false,
                    },
                }}
                editorDidMount={editorDidMount}
            ></Editor>
            <div className="overlay" onClick={toggleSidebar}></div>
        </div>
    );
}
