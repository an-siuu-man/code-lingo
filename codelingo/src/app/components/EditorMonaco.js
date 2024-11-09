// components/MonacoEditor.js
'use client';

import React from 'react';
import Editor from '@monaco-editor/react';

const EditorMonaco = () => {

  // Define the Monokai One Darker theme within the onMount callback
  function handleEditorDidMount(editor, monaco) {
    monaco.editor.defineTheme('monokai-one-darker', {
      base: 'vs-dark',
      inherit: true,
      rules: [
      { token: 'comment', foreground: '75715e', fontStyle: 'italic' },   // Muted, Monokai-style comments
      { token: 'keyword', foreground: 'b5414b' },                        // Pink keywords
      { token: 'number', foreground: 'ae81ff' },                         // Purple for numbers
      { token: 'string', foreground: 'e6db74' },                         // Yellow strings
      { token: 'variable', foreground: 'a6e22e' },                       // Green variables
      { token: 'function', foreground: '66d9ef' },                       // Cyan functions
      { token: 'type', foreground: 'a6e22e' },                           // Green types
      { token: 'constant', foreground: 'fd971f' },                       // Orange constants
      { token: 'tag', foreground: 'b5414b' },                            // Pink tags
      { token: 'attribute.name', foreground: '66d9ef' },                 // Cyan attribute names
      { token: 'delimiter', foreground: 'f8f8f2' },                      // Light text
      ],
      colors: {
      "activityBar.background": "#2f373a",
      "activityBar.foreground": "#d7dae0",
      "activityBarBadge.background": "#528bff",
      "activityBarBadge.foreground": "#f8fafd",
      "button.background": "#528bff",
      "diffEditor.insertedTextBackground": "#00809b33",
      "dropdown.background": "#1d1f23",
      "dropdown.border": "#181a1f",
      "editor.background": "#1f2427",
      "editor.findMatchBackground": "#42557b",
      "editor.findMatchHighlightBackground": "#314365",
      "editor.foreground": "#cacfd1",
      "editor.lineHighlightBackground": "#2f373f",
      "editor.selectionBackground": "#3e4451",
      "editorCursor.foreground": "#f8f8f0",
      "editorError.foreground": "#c24038",
      "editorGroup.border": "#181a1f",
      "editorGroup.emptyBackground": "#181a1f",
      "editorGroupHeader.tabsBackground": "#21252b",
      "editorHoverWidget.background": "#21252b",
      "editorHoverWidget.border": "#181a1f",
      "editorIndentGuide.background": "#3b4048",
      "editorLineNumber.foreground": "#4d5052",
      "editorRuler.foreground": "#484848",
      "editorSuggestWidget.background": "#21252b",
      "editorSuggestWidget.border": "#181a1f",
      "editorSuggestWidget.selectedBackground": "#2c313a",
      "editorUnnecessaryCode.opacity": "#000000c0",
      "editorWhitespace.foreground": "#484a50",
      "editorWidget.background": "#21252b",
      "input.background": "#1d1f23",
      "list.activeSelectionBackground": "#2c313a",
      "list.activeSelectionForeground": "#d7dae0",
      "list.focusBackground": "#383e4a",
      "list.highlightForeground": "#c5c5c5",
      "list.hoverBackground": "#292d35",
      "list.inactiveSelectionBackground": "#2c313a",
      "list.inactiveSelectionForeground": "#d7dae0",
      "notifications.background": "#21252b",
      "scrollbarSlider.activeBackground": "#747d9180",
      "scrollbarSlider.background": "#4e566680",
      "scrollbarSlider.hoverBackground": "#5a637580",
      "sideBar.background": "#252c30",
      "sideBarSectionHeader.background": "#282c34",
      "statusBar.background": "#21252b",
      "statusBar.debuggingBackground": "#21252b",
      "statusBar.foreground": "#9da5b4",
      "statusBar.noFolderBackground": "#21252b",
      "statusBarItem.hoverBackground": "#2c313a",
      "statusBarItem.remoteBackground": "#498527",
      "tab.activeBackground": "#383e4a",
      "tab.border": "#181a1f",
      "tab.inactiveBackground": "#21252b",
      "terminal.ansiBlack": "#2d3139",
      "terminal.ansiBlue": "#528bff",
      "terminal.ansiBrightBlack": "#7f848e",
      "terminal.ansiBrightBlue": "#528bff",
      "terminal.ansiBrightCyan": "#56b6c2",
      "terminal.ansiBrightGreen": "#98c379",
      "terminal.ansiBrightMagenta": "#7e0097",
      "terminal.ansiBrightRed": "#f44747",
      "terminal.ansiBrightWhite": "#d7dae0",
      "terminal.ansiBrightYellow": "#e5c07b",
      "terminal.ansiCyan": "#56b6c2",
      "terminal.ansiGreen": "#98c379",
      "terminal.ansiMagenta": "#c678dd",
      "terminal.ansiRed": "#e06c75",
      "terminal.ansiWhite": "#d7dae0",
      "terminal.ansiYellow": "#e5c07b",
      "terminal.foreground": "#abb2bf",
      "titleBar.activeBackground": "#282c34",
      "titleBar.activeForeground": "#9da5b4",
      "titleBar.inactiveBackground": "#282c34",
      "titleBar.inactiveForeground": "#6b717d",
      }
    });
    monaco.editor.setTheme('monokai-one-darker'); // Set the custom theme as the default
  }

  function handleEditorChange(value, event) {
    console.log('here is the current model value: \n', value);
  }

  return (
    <Editor
      height="600px"
      defaultLanguage="cpp"
      defaultValue={`#include <iostream>\nint main() {\n  //Print "Hello World" here\n  return 0;\n}`}
      onMount={handleEditorDidMount} // Attach the onMount event handler
      onChange={handleEditorChange}
    />
  );
};

export default EditorMonaco;
