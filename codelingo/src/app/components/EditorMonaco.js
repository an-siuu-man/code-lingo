// 'use client';

// import React, { useState } from 'react';
// import Editor from '@monaco-editor/react';
// import PageButton from './PageButton';
// import axios from 'axios';

// const EditorMonaco = ({ setIncomingJSON, incomingCode, readOnly = false, height = "", width = "" }) => {
//     const [code, setCode] = useState(incomingCode || ''); // State to store editor content

//     function handleEditorDidMount(editor, monaco) {
//       monaco.editor.defineTheme('monokai-one-darker', {
//         base: 'vs-dark',
//         inherit: true,
//         rules: [
//           { token: 'comment', foreground: '75715e', fontStyle: 'italic' },
//           { token: 'keyword', foreground: 'b5414b' },
//           { token: 'number', foreground: 'ae81ff' },
//           { token: 'string', foreground: 'e6db74' },
//           { token: 'variable', foreground: 'a6e22e' },
//           { token: 'function', foreground: '66d9ef' },
//           { token: 'type', foreground: 'a6e22e' },
//           { token: 'constant', foreground: 'fd971f' },
//           { token: 'tag', foreground: 'b5414b' },
//           { token: 'attribute.name', foreground: '66d9ef' },
//           { token: 'delimiter', foreground: 'f8f8f2' },
//         ],
//         // colors: {
//         //   "activityBar.background": "#2f373a",
//         //   "activityBar.foreground": "#d7dae0",
//         //   "activityBarBadge.background": "#528bff",
//         //   "activityBarBadge.foreground": "#f8fafd",
//         //   "button.background": "#528bff",
//         //   "diffEditor.insertedTextBackground": "#00809b33",
//         //   "dropdown.background": "#1d1f23",
//         //   "dropdown.border": "#181a1f",
//         //   "editor.background": "#1f2427",
//         //   "editor.findMatchBackground": "#42557b",
//         //   "editor.findMatchHighlightBackground": "#314365",
//         //   "editor.foreground": "#cacfd1",
//         //   "editor.lineHighlightBackground": "#2f373f",
//         //   "editor.selectionBackground": "#3e4451",
//         //   "editorCursor.foreground": "#f8f8f0",
//         //   "editorError.foreground": "#c24038",
//         //   "editorGroup.border": "#181a1f",
//         //   "editorGroup.emptyBackground": "#181a1f",
//         //   "editorGroupHeader.tabsBackground": "#21252b",
//         //   "editorHoverWidget.background": "#21252b",
//         //   "editorHoverWidget.border": "#181a1f",
//         //   "editorIndentGuide.background": "#3b4048",
//         //   "editorLineNumber.foreground": "#4d5052",
//         //   "editorRuler.foreground": "#484848",
//         //   "editorSuggestWidget.background": "#21252b",
//         //   "editorSuggestWidget.border": "#181a1f",
//         //   "editorSuggestWidget.selectedBackground": "#2c313a",
//         //   "editorUnnecessaryCode.opacity": "#000000c0",
//         //   "editorWhitespace.foreground": "#484a50",
//         //   "editorWidget.background": "#21252b",
//         //   "input.background": "#1d1f23",
//         //   "list.activeSelectionBackground": "#2c313a",
//         //   "list.activeSelectionForeground": "#d7dae0",
//         //   "list.focusBackground": "#383e4a",
//         //   "list.highlightForeground": "#c5c5c5",
//         //   "list.hoverBackground": "#292d35",
//         //   "list.inactiveSelectionBackground": "#2c313a",
//         //   "list.inactiveSelectionForeground": "#d7dae0",
//         //   "notifications.background": "#21252b",
//         //   "scrollbarSlider.activeBackground": "#747d9180",
//         //   "scrollbarSlider.background": "#4e566680",
//         //   "scrollbarSlider.hoverBackground": "#5a637580",
//         //   "sideBar.background": "#252c30",
//         //   "sideBarSectionHeader.background": "#282c34",
//         //   "statusBar.background": "#21252b",
//         //   "statusBar.debuggingBackground": "#21252b",
//         //   "statusBar.foreground": "#9da5b4",
//         //   "statusBar.noFolderBackground": "#21252b",
//         //   "statusBarItem.hoverBackground": "#2c313a",
//         //   "statusBarItem.remoteBackground": "#498527",
//         //   "tab.activeBackground": "#383e4a",
//         //   "tab.border": "#181a1f",
//         //   "tab.inactiveBackground": "#21252b",
//         //   "terminal.ansiBlack": "#2d3139",
//         //   "terminal.ansiBlue": "#528bff",
//         //   "terminal.ansiBrightBlack": "#7f848e",
//         //   "terminal.ansiBrightBlue": "#528bff",
//         //   "terminal.ansiBrightCyan": "#56b6c2",
//         //   "terminal.ansiBrightGreen": "#98c379",
//         //   "terminal.ansiBrightMagenta": "#7e0097",
//         //   "terminal.ansiBrightRed": "#f44747",
//         //   "terminal.ansiBrightWhite": "#d7dae0",
//         //   "terminal.ansiBrightYellow": "#e5c07b",
//         //   "terminal.ansiCyan": "#56b6c2",
//         //   "terminal.ansiGreen": "#98c379",
//         //   "terminal.ansiMagenta": "#c678dd",
//         //   "terminal.ansiRed": "#e06c75",
//         //   "terminal.ansiWhite": "#d7dae0",
//         //   "terminal.ansiYellow": "#e5c07b",
//         //   "terminal.foreground": "#abb2bf",
//         //   "titleBar.activeBackground": "#282c34",
//         //   "titleBar.activeForeground": "#9da5b4",
//         //   "titleBar.inactiveBackground": "#282c34",
//         //   "titleBar.inactiveForeground": "#6b717d",
//         // }
//         colors: {
//         "activityBar.background": "#101010", // Dark background for activity bar
//         "activityBar.foreground": "#00ff99", // Neon green for text
//         "activityBarBadge.background": "#00ff99", // Bright green for badges
//         "activityBarBadge.foreground": "#1a1a1a", // Dark foreground on badges
  
//         "button.background": "#008080", // Muted cyan for buttons to match the hacker aesthetic
  
//         "editor.background": "#101010", // Very dark background to enhance neon colors
//         "editor.foreground": "#00ff99", // Neon green foreground
//         "editorCursor.foreground": "#00ff00", // Bright green cursor for classic hacker look
//         "editor.lineHighlightBackground": "#1a1a1a", // Dark highlight background
//         "editor.selectionBackground": "#003300", // Dark green selection for Matrix effect
//         "editor.findMatchBackground": "#2f4f4f", // Teal highlight for search matches
//         "editor.findMatchHighlightBackground": "#4c7f7f", // Light teal for match highlight
  
//         "editorIndentGuide.background": "#1e1e1e", // Subtle guide color
//         "editorLineNumber.foreground": "#4c7f7f", // Teal for line numbers
//         "editorWhitespace.foreground": "#333333", // Subtle, dark color for whitespace
  
//         "editorSuggestWidget.background": "#0d0d0d", // Black background for suggestions
//         "editorSuggestWidget.selectedBackground": "#004d4d", // Dark cyan highlight
//         "editorGroup.border": "#181a1f",
  
//         "scrollbarSlider.background": "#2f4f4f",
//         "scrollbarSlider.activeBackground": "#1a1a1a",
  
//         "sideBar.background": "#0d0d0d", // Very dark sidebar background
//         "sideBar.foreground": "#00ff99", // Neon green for sidebar text
//         "sideBarSectionHeader.background": "#101010", // Dark gray background for headers
  
//         "statusBar.background": "#101010", // Dark background for status bar
//         "statusBar.foreground": "#00ff99", // Neon green for status text
  
//         "tab.activeBackground": "#1b1b1b", // Very dark for active tab
//         "tab.inactiveBackground": "#101010", // Dark background for inactive tabs
  
//         "terminal.ansiBlack": "#0d0d0d", // Dark black for terminal
//         "terminal.ansiBrightGreen": "#00ff00", // Bright green for Matrix-style text
//         "terminal.foreground": "#00ff99", // Neon green for general terminal text
//         "terminal.ansiCyan": "#00ffff", // Bright cyan for terminal commands
//         "terminal.ansiBrightYellow": "#ffff00", // Bright yellow for errors
  
//         "titleBar.activeBackground": "#101010", // Dark background for title bar
//         "titleBar.activeForeground": "#00ff99", // Neon green for title bar text
//         }
  
//       });
//       monaco.editor.setTheme('monokai-one-darker');
//     }

//     function handleEditorChange(value) {
//         setCode(value || '');
//     }

//     async function handleSubmit() {
//       try {
//           const response = await axios.post('/api/generate', { code }, {
//               headers: { 'Content-Type': 'application/json' }
//           });
          
//           setIncomingJSON(response.data); // Update with new JSON data
  
//           console.log('API Response:', response.data); // Confirm JSON is correct in console
//       } catch (error) {
//           console.error('Error submitting code:', error);
//       }
//   }

//     return (
//         <div>
//             <Editor
//                 defaultLanguage="cpp"
//                 height={height}
//                 width={width}
//                 defaultValue={`#include <iostream>\nint main() {\n  // Print "Hello World" here\n  return 0;\n}`}
//                 value={incomingCode}
//                 onMount={handleEditorDidMount}
//                 onChange={!readOnly ? handleEditorChange : undefined}
//                 options={{
//                     readOnly: readOnly,
//                 }}
//             />
//             {!readOnly && (
//                 <div className="py-4 flex justify-start w-full">
//                     <PageButton label="Submit" handleClick={handleSubmit} />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default EditorMonaco;


//-------------------------shiv=---------------------------------

// components/MonacoEditor.js
'use client';

import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import PageButton from './PageButton';
import axios from 'axios';


const EditorMonaco = ({ setIncomingJSON, incomingCode, readOnly = false, height="", width="" }) => {
  const [code, setCode] = useState(incomingCode || ''); // State to store editor content


  useEffect(() => {
    if (!code && incomingCode) {
      setCode(incomingCode);
    }
  }, [incomingCode]); // Empty useEffect to prevent infinite loop


  function handleEditorDidMount(editor, monaco) {
    monaco.editor.defineTheme('monokai-one-darker', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '75715e', fontStyle: 'italic' },     // Dark olive for comments
        { token: 'keyword', foreground: 'ad1f52' },                          // Monokai pink for keywords
        { token: 'number', foreground: 'ae81ff' },                           // Light purple for numbers
        { token: 'string', foreground: 'e6db74' },                           // Yellow for strings
        { token: 'variable', foreground: 'a6e22e' },                         // Green for variables
        { token: 'function', foreground: '66d9ef' },                         // Light blue for functions
        { token: 'type', foreground: 'a6e22e' },                             // Green for types
        { token: 'constant', foreground: 'fd971f' },                         // Orange for constants
        { token: 'tag', foreground: 'f92672' },                              // Monokai pink for tags
        { token: 'attribute.name', foreground: 'a6e22e' },                   // Green for attribute names
        { token: 'delimiter', foreground: 'f8f8f2' },                        // Light gray for delimiters
        { token: 'class-name', foreground: '66d9ef' },                       // Light blue for class names
        { token: 'type.identifier', foreground: 'fd971f' }    
      ],
      // colors: {
      //   "activityBar.background": "#2f373a",
      //   "activityBar.foreground": "#d7dae0",
      //   "activityBarBadge.background": "#528bff",
      //   "activityBarBadge.foreground": "#f8fafd",
      //   "button.background": "#528bff",
      //   "diffEditor.insertedTextBackground": "#00809b33",
      //   "dropdown.background": "#1d1f23",
      //   "dropdown.border": "#181a1f",
      //   "editor.background": "#1f2427",
      //   "editor.findMatchBackground": "#42557b",
      //   "editor.findMatchHighlightBackground": "#314365",
      //   "editor.foreground": "#cacfd1",
      //   "editor.lineHighlightBackground": "#2f373f",
      //   "editor.selectionBackground": "#3e4451",
      //   "editorCursor.foreground": "#f8f8f0",
      //   "editorError.foreground": "#c24038",
      //   "editorGroup.border": "#181a1f",
      //   "editorGroup.emptyBackground": "#181a1f",
      //   "editorGroupHeader.tabsBackground": "#21252b",
      //   "editorHoverWidget.background": "#21252b",
      //   "editorHoverWidget.border": "#181a1f",
      //   "editorIndentGuide.background": "#3b4048",
      //   "editorLineNumber.foreground": "#4d5052",
      //   "editorRuler.foreground": "#484848",
      //   "editorSuggestWidget.background": "#21252b",
      //   "editorSuggestWidget.border": "#181a1f",
      //   "editorSuggestWidget.selectedBackground": "#2c313a",
      //   "editorUnnecessaryCode.opacity": "#000000c0",
      //   "editorWhitespace.foreground": "#484a50",
      //   "editorWidget.background": "#21252b",
      //   "input.background": "#1d1f23",
      //   "list.activeSelectionBackground": "#2c313a",
      //   "list.activeSelectionForeground": "#d7dae0",
      //   "list.focusBackground": "#383e4a",
      //   "list.highlightForeground": "#c5c5c5",
      //   "list.hoverBackground": "#292d35",
      //   "list.inactiveSelectionBackground": "#2c313a",
      //   "list.inactiveSelectionForeground": "#d7dae0",
      //   "notifications.background": "#21252b",
      //   "scrollbarSlider.activeBackground": "#747d9180",
      //   "scrollbarSlider.background": "#4e566680",
      //   "scrollbarSlider.hoverBackground": "#5a637580",
      //   "sideBar.background": "#252c30",
      //   "sideBarSectionHeader.background": "#282c34",
      //   "statusBar.background": "#21252b",
      //   "statusBar.debuggingBackground": "#21252b",
      //   "statusBar.foreground": "#9da5b4",
      //   "statusBar.noFolderBackground": "#21252b",
      //   "statusBarItem.hoverBackground": "#2c313a",
      //   "statusBarItem.remoteBackground": "#498527",
      //   "tab.activeBackground": "#383e4a",
      //   "tab.border": "#181a1f",
      //   "tab.inactiveBackground": "#21252b",
      //   "terminal.ansiBlack": "#2d3139",
      //   "terminal.ansiBlue": "#528bff",
      //   "terminal.ansiBrightBlack": "#7f848e",
      //   "terminal.ansiBrightBlue": "#528bff",
      //   "terminal.ansiBrightCyan": "#56b6c2",
      //   "terminal.ansiBrightGreen": "#98c379",
      //   "terminal.ansiBrightMagenta": "#7e0097",
      //   "terminal.ansiBrightRed": "#f44747",
      //   "terminal.ansiBrightWhite": "#d7dae0",
      //   "terminal.ansiBrightYellow": "#e5c07b",
      //   "terminal.ansiCyan": "#56b6c2",
      //   "terminal.ansiGreen": "#98c379",
      //   "terminal.ansiMagenta": "#c678dd",
      //   "terminal.ansiRed": "#e06c75",
      //   "terminal.ansiWhite": "#d7dae0",
      //   "terminal.ansiYellow": "#e5c07b",
      //   "terminal.foreground": "#abb2bf",
      //   "titleBar.activeBackground": "#282c34",
      //   "titleBar.activeForeground": "#9da5b4",
      //   "titleBar.inactiveBackground": "#282c34",
      //   "titleBar.inactiveForeground": "#6b717d",
      // }
      colors: {
      "activityBar.background": "#101010", // Dark background for activity bar
      "activityBar.foreground": "#00ff99", // Neon green for text
      "activityBarBadge.background": "#00ff99", // Bright green for badges
      "activityBarBadge.foreground": "#1a1a1a", // Dark foreground on badges

      "button.background": "#008080", // Muted cyan for buttons to match the hacker aesthetic

      "editor.background": "#101d21", // Very dark background to enhance neon colors
      "editor.foreground": "#00ff99", // Neon green foreground
      "editorCursor.foreground": "#00ff00", // Bright green cursor for classic hacker look
      "editor.lineHighlightBackground": "#2e3030", // Dark highlight background
      "editor.selectionBackground": "#003300", // Dark green selection for Matrix effect
      "editor.findMatchBackground": "#2f4f4f", // Teal highlight for search matches
      "editor.findMatchHighlightBackground": "#4c7f7f", // Light teal for match highlight

      "editorIndentGuide.background": "#1e1e1e", // Subtle guide color
      "editorLineNumber.foreground": "#4c7f7f", // Teal for line numbers
      "editorWhitespace.foreground": "#333333", // Subtle, dark color for whitespace

      "editorSuggestWidget.background": "#0d0d0d", // Black background for suggestions
      "editorSuggestWidget.selectedBackground": "#004d4d", // Dark cyan highlight
      "editorGroup.border": "#181a1f",

      "scrollbarSlider.background": "#2f4f4f",
      "scrollbarSlider.activeBackground": "#1a1a1a",

      "sideBar.background": "#0d0d0d", // Very dark sidebar background
      "sideBar.foreground": "#00ff99", // Neon green for sidebar text
      "sideBarSectionHeader.background": "#101010", // Dark gray background for headers

      "statusBar.background": "#101010", // Dark background for status bar
      "statusBar.foreground": "#00ff99", // Neon green for status text

      "tab.activeBackground": "#1b1b1b", // Very dark for active tab
      "tab.inactiveBackground": "#101010", // Dark background for inactive tabs

      "terminal.ansiBlack": "#0d0d0d", // Dark black for terminal
      "terminal.ansiBrightGreen": "#00ff00", // Bright green for Matrix-style text
      "terminal.foreground": "#00ff99", // Neon green for general terminal text
      "terminal.ansiCyan": "#00ffff", // Bright cyan for terminal commands
      "terminal.ansiBrightYellow": "#ffff00", // Bright yellow for errors

      "titleBar.activeBackground": "#101010", // Dark background for title bar
      "titleBar.activeForeground": "#00ff99", // Neon green for title bar text
      }

    });
    monaco.editor.setTheme('monokai-one-darker');
  }

  function handleEditorChange(value) {
    setCode(value || ''); // Safely update the code state
  }

  async function handleSubmit() {
    try {
      console.log('Submitting code:', code);
      const response = await axios.post('/api/generate', { code }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('API Response:', response.data);
      setIncomingJSON(response.data); // Update incomingJSON state in MonEditor

    } catch (error) {
      console.error('Error submitting code:', error);
    }
  }

  // return (
  //   <div>
  //     <Editor
  //       height="300px"
  //       defaultLanguage="cpp"
  //       defaultValue={`#include <iostream>\nint main() {\n  // Print "Hello World" here\n  return 0;\n}`}
  //       value={code}
  //       onMount={handleEditorDidMount}
  //       onChange={handleEditorChange} // Directly use `handleEditorChange`
  //     />
  //     <div className='py-4 flex justify-end w-full'>
  //       <PageButton label="Submit" handleClick={handleSubmit} />
  //     </div>
  //   </div>
  // );

  return (
    <div>
      <Editor
        defaultLanguage="cpp"
        height={height}
        width={width}
        defaultValue={`#include <iostream>\nint main() {\n  // Print "Hello World" here\n  return 0;\n}`}
        value={incomingCode}
        onMount={handleEditorDidMount}
        onChange={!readOnly ? handleEditorChange : undefined} // Disable onChange when readOnly
        options={{
          readOnly: readOnly, // Set editor as read-only if true
          fontFamily: 'Source Code Pro, monospace'
        }}
      />
      {!readOnly && (
        <div className='py-4 flex justify-end w-full'>
          <PageButton label="Compile" handleClick={handleSubmit} />
        </div>
      )}
    </div>
  );


};

export default EditorMonaco;
