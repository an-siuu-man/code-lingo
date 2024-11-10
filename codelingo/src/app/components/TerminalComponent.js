

import React, { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

export default function TerminalComp() {
    const terminalRef = useRef(null);
    const xtermRef = useRef(null);

    useEffect(() => {
        if (!terminalRef.current) return;

        const xterm = new Terminal({
            cursorBlink: true,
            theme: {
                background: "#0d0d0d", // Dark background for terminal (Matrix-style black)
                foreground: "#73cf72", // Bright neon green text
                cursor: "#73cf72", // Bright green cursor
            },

        });
        const fitAddon = new FitAddon();
        xterm.loadAddon(fitAddon);

        xterm.open(terminalRef.current);
        fitAddon.fit();

        // Keep the terminal focused
        xterm.focus();

        // Write the welcome message and initial prompt
        xterm.writeln("Welcome to the CodeLingo Terminal!");
        xterm.write("$ ");

        // Local variables to track input, cursor position, and command history
        let input = "";
        let cursorPosition = 0;
        const history = []; // Array to store command history
        let historyIndex = -1; // Track position in history (-1 means no history selected)

        // Function to update the terminal display
        const refreshLine = () => {
            // Clear the current line and reset to prompt with input
            xterm.write(`\r$ ${input} `);
            // Move cursor back to correct position within the line
            xterm.write(`\r$ ${input.slice(0, cursorPosition)}`);
        };

        // Handle key events
        xterm.onKey(({ key, domEvent }) => {
            const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

            if (domEvent.key === "Enter") {
                console.log("Command entered:", input);

                // Add the command to history if it's not empty
                if (input.trim()) {
                    history.push(input);
                    historyIndex = -1; // Reset history navigation after executing a command
                }

                // Check for the 'cls' command to clear the screen
                if (input.trim() === "cls") {
                    xterm.write("\r\n");
                    xterm.clear(); // Clear the terminal screen completely
                    xterm.writeln("Welcome to CodeLingo Terminal"); // Optional welcome message after cls
                    xterm.write("$ ");
                } else if (input.startsWith("echo ")) {
                    xterm.writeln("");
                    xterm.writeln(input.slice(5)); // Display the text after 'echo'
                    xterm.write("$ ");
                } else if (input.trim() !== "") {
                    xterm.writeln("");
                    xterm.writeln(`Command not found: ${input}`);
                    xterm.write("$ ");
                }

                // Reset input and cursor position after each command
                input = "";
                cursorPosition = 0;
            } else if (domEvent.key === "Backspace") {
                if (cursorPosition > 0) {
                    input = input.slice(0, cursorPosition - 1) + input.slice(cursorPosition);
                    cursorPosition -= 1;
                    refreshLine();
                }
            } else if (domEvent.key === "ArrowUp") {
                // Navigate up in history
                if (history.length > 0) {
                    if (historyIndex === -1) {
                        // Start from the last command
                        historyIndex = history.length - 1;
                    } else if (historyIndex > 0) {
                        // Move up in history if not at the beginning
                        historyIndex -= 1;
                    }
                    // Load the command from history and refresh the line
                    input = history[historyIndex];
                    cursorPosition = input.length;
                    refreshLine();
                }
            } else if (domEvent.key === "ArrowDown") {
                // Navigate down in history
                if (history.length > 0 && historyIndex !== -1) {
                    if (historyIndex < history.length - 1) {
                        // Move down in history if not at the latest command
                        historyIndex += 1;
                    } else {
                        // Clear the input if moving past the last command in history
                        historyIndex = -1;
                        input = "";
                    }
                    // Load the command from history or clear the line and refresh
                    input = historyIndex === -1 ? "" : history[historyIndex];
                    cursorPosition = input.length;
                    refreshLine();
                }
            } else if (domEvent.key === "ArrowLeft") {
                if (cursorPosition > 0) {
                    cursorPosition -= 1;
                    xterm.write("\x1b[D"); // Move cursor left
                }
            } else if (domEvent.key === "ArrowRight") {
                if (cursorPosition < input.length) {
                    cursorPosition += 1;
                    xterm.write("\x1b[C"); // Move cursor right
                }
            } else if (printable && domEvent.key.length === 1) {
                input = input.slice(0, cursorPosition) + key + input.slice(cursorPosition);
                cursorPosition += 1;
                refreshLine();
            }
        });

        xtermRef.current = xterm;

        // Resize the terminal on window resize
        const handleResize = () => fitAddon.fit();
        window.addEventListener("resize", handleResize);

        return () => {
            xterm.dispose(); // Cleanup on unmount
            window.removeEventListener("resize", handleResize);
        };
    }, []); // Empty dependency array ensures useEffect runs only once

    return <div ref={terminalRef} style={{ width: "500px", height: "500px" }} />;
}
