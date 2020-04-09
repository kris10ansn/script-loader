import React, { useRef, useEffect } from "react";
import "./Navbar.scss";
import grip from "../assets/grip.svg";
import play from "../assets/play.svg";

export default function Navbar({
    currentTitle,
    setCurrentTitle,
    currentCode,
    run,
    save,
    saved,
}) {
    const self = useRef();

    const toggleSidebar = () => {
        document.body.classList.toggle("sidebar-open");
    };

    const titleRef = useRef();
    const updateTitle = () => {
        const newTitle = titleRef.current.textContent.trim().toLowerCase();

        if (newTitle.length > 0) {
            setCurrentTitle(newTitle);
        }

        titleRef.current.textContent = currentTitle;
    };

    useEffect(() => {
        titleRef.current.textContent = currentTitle;
    }, [currentTitle]);

    const titleKeyDown = (event) => {
        if (event.key === "Enter") {
            titleRef.current.blur();
            self.current.focus();
            event.preventDefault();
        }
    };

    const runCode = () => {
        run(currentCode);
    };

    return (
        <nav ref={self}>
            <div className="left">
                <div className="grip">
                    <img
                        id="grip"
                        onClick={toggleSidebar}
                        src={grip}
                        alt="::"
                    />
                </div>

                <h1
                    id="title"
                    ref={titleRef}
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    onBlur={updateTitle}
                    onKeyDown={titleKeyDown}
                    style={{ fontStyle: !saved ? "italic" : "" }}
                >
                    {currentTitle}
                </h1>
            </div>

            <div className="buttons">
                <img
                    id="run"
                    src={play}
                    alt=">"
                    onClick={runCode}
                    style={{ color: "green" }}
                />
                <button onClick={save}>Save</button>
            </div>
        </nav>
    );
}
