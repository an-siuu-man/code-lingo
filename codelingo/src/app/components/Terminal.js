import React, { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

export default function TerminalComp() {
    const terminalRef = useRef(null);
    const xtermRef = useRef(null);

    useEffect(() => {
        const xterm = new Terminal({
            cursorBlink: true,
            theme: {
                background: "#282c34",
                foreground: "#abb2bf",
            },
        });
        const fitAddon = new FitAddon();
        xterm.loadAddon(fitAddon);

        xterm.open(terminalRef.current);
        fitAddon.fit();

        // Write the welcome message
        xterm.write("Welcome to CodeLingo Terminal\r\n$ ");

        // Handle user input
        xterm.onData((data) => {
            if (data === "\r") {
                xterm.write("\r\n$ "); 
            } else {
                xterm.write(data); 
            }
        });

        xtermRef.current = xterm;

        return () => {
            xterm.dispose(); 
        };
    }, []);

    return <div ref={terminalRef} style={{ width: "100%", height: "400px" }} />;
}
