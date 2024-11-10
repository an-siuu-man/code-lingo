"use client";

import { useCallback, useEffect, useState } from "react";
import { ReactFlow, Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

const data =  {
    "code": "#include <iostream>\nint main() {\n  int leo = 0;\n  int jay = 10;\n  for (int i = 0; i < 10; i = i + 1 ){\n    leo = leo + i;\n    if (leo == 9){\n      int shivansh = 10;\n    } else {\n      jay = jay - i;\n    }\n    float ansuman = 99.1;\n  }\n  int sax = -1;\n  return 0;\n}",
    "executionSteps": [
        {
            "highlight": 1,
            "operation": "INCLUDE",
            "lib_name": "iostream"
        },
        {
            "step": 1,
            "highlight": 2,
            "operation": "FUNCT_DEFINE",
            "reference": "__int__main()__",
            "name": "main",
            "return_type": "int",
            "args": [
                []
            ],
            "startLine": 2,
            "endLine": 16,
            "scope": "__SCOPE__GLOBAL__"
        },
        {
            "step": 2,
            "highlight": 3,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__3__NAME__leo",
            "type": "int",
            "name": "leo",
            "value": "0",
            "scope": "__int__main()__"
        },
        {
            "step": 3,
            "highlight": 4,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__4__NAME__jay",
            "type": "int",
            "name": "jay",
            "value": "10",
            "scope": "__int__main()__"
        },
        {
            "step": 4,
            "highlight": 5,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__5__NAME__i",
            "type": "int",
            "name": "i",
            "value": "0",
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 4,
            "highlight": 5,
            "operation": "FOR_LOOP",
            "reference": "__DECLAREDAT__5__FOR_LOOP__",
            "statements": [
                "int i = 0",
                "i < 10",
                "i = i + 1"
            ],
            "condition": "i < 10",
            "result": "True",
            "startLine": 5,
            "endLine": 13,
            "scope": "__int__main()__"
        },
        {
            "step": 5,
            "highlight": 6,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__3__NAME__leo",
            "type": "int",
            "name": "leo",
            "statement": "leo = leo + i",
            "old_value": "0",
            "new_value": "0"
        },
        {
            "step": 6,
            "highlight": 7,
            "operation": "IF_BLOCK",
            "reference": "__DECLAREDAT__7__IF_BLOCK__",
            "condition": "leo == 9",
            "result": "False",
            "startLine": 7,
            "endLine": 9,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 7,
            "highlight": 8,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__8__NAME__shivansh",
            "type": "int",
            "name": "shivansh",
            "value": "10",
            "scope": "__DECLAREDAT__7__IF_BLOCK__"
        },
        {
            "step": 8,
            "highlight": 9,
            "operation": "ELSE_BLOCK",
            "reference": "__DECLAREDAT__9__ELSE_BLOCK__",
            "startLine": 9,
            "endLine": 11,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 9,
            "highlight": 10,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__4__NAME__jay",
            "type": "int",
            "name": "jay",
            "statement": "jay = jay - i",
            "old_value": "10",
            "new_value": "10"
        },
        {
            "step": 10,
            "highlight": 12,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__12__NAME__ansuman",
            "type": "float",
            "name": "ansuman",
            "value": "99.1",
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 11,
            "highlight": 5,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__5__NAME__i",
            "type": "int",
            "name": "i",
            "statement": "i = i + 1",
            "old_value": "0",
            "new_value": "1"
        },
        {
            "step": 11,
            "highlight": 6,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__3__NAME__leo",
            "type": "int",
            "name": "leo",
            "statement": "leo = leo + i",
            "old_value": "0",
            "new_value": "1"
        },
        {
            "step": 12,
            "highlight": 7,
            "operation": "IF_BLOCK",
            "reference": "__DECLAREDAT__7__IF_BLOCK__",
            "condition": "leo == 9",
            "result": "False",
            "startLine": 7,
            "endLine": 9,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 13,
            "highlight": 8,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__8__NAME__shivansh",
            "type": "int",
            "name": "shivansh",
            "value": "10",
            "scope": "__DECLAREDAT__7__IF_BLOCK__"
        },
        {
            "step": 14,
            "highlight": 9,
            "operation": "ELSE_BLOCK",
            "reference": "__DECLAREDAT__9__ELSE_BLOCK__",
            "startLine": 9,
            "endLine": 11,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 15,
            "highlight": 10,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__4__NAME__jay",
            "type": "int",
            "name": "jay",
            "statement": "jay = jay - i",
            "old_value": "10",
            "new_value": "9"
        },
        {
            "step": 16,
            "highlight": 12,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__12__NAME__ansuman",
            "type": "float",
            "name": "ansuman",
            "value": "99.1",
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 17,
            "highlight": 5,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__5__NAME__i",
            "type": "int",
            "name": "i",
            "statement": "i = i + 1",
            "old_value": "1",
            "new_value": "2"
        },
        {
            "step": 17,
            "highlight": 6,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__3__NAME__leo",
            "type": "int",
            "name": "leo",
            "statement": "leo = leo + i",
            "old_value": "1",
            "new_value": "3"
        },
        {
            "step": 18,
            "highlight": 7,
            "operation": "IF_BLOCK",
            "reference": "__DECLAREDAT__7__IF_BLOCK__",
            "condition": "leo == 9",
            "result": "False",
            "startLine": 7,
            "endLine": 9,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 19,
            "highlight": 8,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__8__NAME__shivansh",
            "type": "int",
            "name": "shivansh",
            "value": "10",
            "scope": "__DECLAREDAT__7__IF_BLOCK__"
        },
        {
            "step": 20,
            "highlight": 9,
            "operation": "ELSE_BLOCK",
            "reference": "__DECLAREDAT__9__ELSE_BLOCK__",
            "startLine": 9,
            "endLine": 11,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 21,
            "highlight": 10,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__4__NAME__jay",
            "type": "int",
            "name": "jay",
            "statement": "jay = jay - i",
            "old_value": "9",
            "new_value": "7"
        },
        {
            "step": 22,
            "highlight": 12,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__12__NAME__ansuman",
            "type": "float",
            "name": "ansuman",
            "value": "99.1",
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 23,
            "highlight": 5,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__5__NAME__i",
            "type": "int",
            "name": "i",
            "statement": "i = i + 1",
            "old_value": "2",
            "new_value": "3"
        },
        {
            "step": 23,
            "highlight": 6,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__3__NAME__leo",
            "type": "int",
            "name": "leo",
            "statement": "leo = leo + i",
            "old_value": "3",
            "new_value": "6"
        },
        {
            "step": 24,
            "highlight": 7,
            "operation": "IF_BLOCK",
            "reference": "__DECLAREDAT__7__IF_BLOCK__",
            "condition": "leo == 9",
            "result": "False",
            "startLine": 7,
            "endLine": 9,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 25,
            "highlight": 8,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__8__NAME__shivansh",
            "type": "int",
            "name": "shivansh",
            "value": "10",
            "scope": "__DECLAREDAT__7__IF_BLOCK__"
        },
        {
            "step": 26,
            "highlight": 9,
            "operation": "ELSE_BLOCK",
            "reference": "__DECLAREDAT__9__ELSE_BLOCK__",
            "startLine": 9,
            "endLine": 11,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 27,
            "highlight": 10,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__4__NAME__jay",
            "type": "int",
            "name": "jay",
            "statement": "jay = jay - i",
            "old_value": "7",
            "new_value": "4"
        },
        {
            "step": 28,
            "highlight": 12,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__12__NAME__ansuman",
            "type": "float",
            "name": "ansuman",
            "value": "99.1",
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 29,
            "highlight": 5,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__5__NAME__i",
            "type": "int",
            "name": "i",
            "statement": "i = i + 1",
            "old_value": "3",
            "new_value": "4"
        },
        {
            "step": 29,
            "highlight": 6,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__3__NAME__leo",
            "type": "int",
            "name": "leo",
            "statement": "leo = leo + i",
            "old_value": "6",
            "new_value": "10"
        },
        {
            "step": 30,
            "highlight": 7,
            "operation": "IF_BLOCK",
            "reference": "__DECLAREDAT__7__IF_BLOCK__",
            "condition": "leo == 9",
            "result": "False",
            "startLine": 7,
            "endLine": 9,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 31,
            "highlight": 8,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__8__NAME__shivansh",
            "type": "int",
            "name": "shivansh",
            "value": "10",
            "scope": "__DECLAREDAT__7__IF_BLOCK__"
        },
        {
            "step": 32,
            "highlight": 9,
            "operation": "ELSE_BLOCK",
            "reference": "__DECLAREDAT__9__ELSE_BLOCK__",
            "startLine": 9,
            "endLine": 11,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 33,
            "highlight": 10,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__4__NAME__jay",
            "type": "int",
            "name": "jay",
            "statement": "jay = jay - i",
            "old_value": "4",
            "new_value": "0"
        },
        {
            "step": 34,
            "highlight": 12,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__12__NAME__ansuman",
            "type": "float",
            "name": "ansuman",
            "value": "99.1",
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 35,
            "highlight": 5,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__5__NAME__i",
            "type": "int",
            "name": "i",
            "statement": "i = i + 1",
            "old_value": "4",
            "new_value": "5"
        },
        {
            "step": 35,
            "highlight": 6,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__3__NAME__leo",
            "type": "int",
            "name": "leo",
            "statement": "leo = leo + i",
            "old_value": "10",
            "new_value": "15"
        },
        {
            "step": 36,
            "highlight": 7,
            "operation": "IF_BLOCK",
            "reference": "__DECLAREDAT__7__IF_BLOCK__",
            "condition": "leo == 9",
            "result": "False",
            "startLine": 7,
            "endLine": 9,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 37,
            "highlight": 8,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__8__NAME__shivansh",
            "type": "int",
            "name": "shivansh",
            "value": "10",
            "scope": "__DECLAREDAT__7__IF_BLOCK__"
        },
        {
            "step": 38,
            "highlight": 9,
            "operation": "ELSE_BLOCK",
            "reference": "__DECLAREDAT__9__ELSE_BLOCK__",
            "startLine": 9,
            "endLine": 11,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 39,
            "highlight": 10,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__4__NAME__jay",
            "type": "int",
            "name": "jay",
            "statement": "jay = jay - i",
            "old_value": "0",
            "new_value": "-5"
        },
        {
            "step": 40,
            "highlight": 12,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__12__NAME__ansuman",
            "type": "float",
            "name": "ansuman",
            "value": "99.1",
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 41,
            "highlight": 5,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__5__NAME__i",
            "type": "int",
            "name": "i",
            "statement": "i = i + 1",
            "old_value": "5",
            "new_value": "6"
        },
        {
            "step": 41,
            "highlight": 6,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__3__NAME__leo",
            "type": "int",
            "name": "leo",
            "statement": "leo = leo + i",
            "old_value": "15",
            "new_value": "21"
        },
        {
            "step": 42,
            "highlight": 7,
            "operation": "IF_BLOCK",
            "reference": "__DECLAREDAT__7__IF_BLOCK__",
            "condition": "leo == 9",
            "result": "False",
            "startLine": 7,
            "endLine": 9,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 43,
            "highlight": 8,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__8__NAME__shivansh",
            "type": "int",
            "name": "shivansh",
            "value": "10",
            "scope": "__DECLAREDAT__7__IF_BLOCK__"
        },
        {
            "step": 44,
            "highlight": 9,
            "operation": "ELSE_BLOCK",
            "reference": "__DECLAREDAT__9__ELSE_BLOCK__",
            "startLine": 9,
            "endLine": 11,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 45,
            "highlight": 10,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__4__NAME__jay",
            "type": "int",
            "name": "jay",
            "statement": "jay = jay - i",
            "old_value": "-5",
            "new_value": "-11"
        },
        {
            "step": 46,
            "highlight": 12,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__12__NAME__ansuman",
            "type": "float",
            "name": "ansuman",
            "value": "99.1",
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 47,
            "highlight": 5,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__5__NAME__i",
            "type": "int",
            "name": "i",
            "statement": "i = i + 1",
            "old_value": "6",
            "new_value": "7"
        },
        {
            "step": 47,
            "highlight": 6,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__3__NAME__leo",
            "type": "int",
            "name": "leo",
            "statement": "leo = leo + i",
            "old_value": "21",
            "new_value": "28"
        },
        {
            "step": 48,
            "highlight": 7,
            "operation": "IF_BLOCK",
            "reference": "__DECLAREDAT__7__IF_BLOCK__",
            "condition": "leo == 9",
            "result": "False",
            "startLine": 7,
            "endLine": 9,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 49,
            "highlight": 8,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__8__NAME__shivansh",
            "type": "int",
            "name": "shivansh",
            "value": "10",
            "scope": "__DECLAREDAT__7__IF_BLOCK__"
        },
        {
            "step": 50,
            "highlight": 9,
            "operation": "ELSE_BLOCK",
            "reference": "__DECLAREDAT__9__ELSE_BLOCK__",
            "startLine": 9,
            "endLine": 11,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 51,
            "highlight": 10,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__4__NAME__jay",
            "type": "int",
            "name": "jay",
            "statement": "jay = jay - i",
            "old_value": "-11",
            "new_value": "-18"
        },
        {
            "step": 52,
            "highlight": 12,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__12__NAME__ansuman",
            "type": "float",
            "name": "ansuman",
            "value": "99.1",
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 53,
            "highlight": 5,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__5__NAME__i",
            "type": "int",
            "name": "i",
            "statement": "i = i + 1",
            "old_value": "7",
            "new_value": "8"
        },
        {
            "step": 53,
            "highlight": 6,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__3__NAME__leo",
            "type": "int",
            "name": "leo",
            "statement": "leo = leo + i",
            "old_value": "28",
            "new_value": "36"
        },
        {
            "step": 54,
            "highlight": 7,
            "operation": "IF_BLOCK",
            "reference": "__DECLAREDAT__7__IF_BLOCK__",
            "condition": "leo == 9",
            "result": "False",
            "startLine": 7,
            "endLine": 9,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 55,
            "highlight": 8,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__8__NAME__shivansh",
            "type": "int",
            "name": "shivansh",
            "value": "10",
            "scope": "__DECLAREDAT__7__IF_BLOCK__"
        },
        {
            "step": 56,
            "highlight": 9,
            "operation": "ELSE_BLOCK",
            "reference": "__DECLAREDAT__9__ELSE_BLOCK__",
            "startLine": 9,
            "endLine": 11,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 57,
            "highlight": 10,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__4__NAME__jay",
            "type": "int",
            "name": "jay",
            "statement": "jay = jay - i",
            "old_value": "-18",
            "new_value": "-26"
        },
        {
            "step": 58,
            "highlight": 12,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__12__NAME__ansuman",
            "type": "float",
            "name": "ansuman",
            "value": "99.1",
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 59,
            "highlight": 5,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__5__NAME__i",
            "type": "int",
            "name": "i",
            "statement": "i = i + 1",
            "old_value": "8",
            "new_value": "9"
        },
        {
            "step": 59,
            "highlight": 6,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__3__NAME__leo",
            "type": "int",
            "name": "leo",
            "statement": "leo = leo + i",
            "old_value": "36",
            "new_value": "45"
        },
        {
            "step": 60,
            "highlight": 7,
            "operation": "IF_BLOCK",
            "reference": "__DECLAREDAT__7__IF_BLOCK__",
            "condition": "leo == 9",
            "result": "False",
            "startLine": 7,
            "endLine": 9,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 61,
            "highlight": 8,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__8__NAME__shivansh",
            "type": "int",
            "name": "shivansh",
            "value": "10",
            "scope": "__DECLAREDAT__7__IF_BLOCK__"
        },
        {
            "step": 62,
            "highlight": 9,
            "operation": "ELSE_BLOCK",
            "reference": "__DECLAREDAT__9__ELSE_BLOCK__",
            "startLine": 9,
            "endLine": 11,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 63,
            "highlight": 10,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__4__NAME__jay",
            "type": "int",
            "name": "jay",
            "statement": "jay = jay - i",
            "old_value": "-26",
            "new_value": "-35"
        },
        {
            "step": 64,
            "highlight": 12,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__12__NAME__ansuman",
            "type": "float",
            "name": "ansuman",
            "value": "99.1",
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 65,
            "highlight": 5,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__5__NAME__i",
            "type": "int",
            "name": "i",
            "statement": "i = i + 1",
            "old_value": "9",
            "new_value": "10"
        },
        {
            "step": 65,
            "highlight": 14,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__14__NAME__sax",
            "type": "int",
            "name": "sax",
            "value": "-1",
            "scope": "__int__main()__"
        }
    ]
};

const nodeStyle = {
  padding: "8px",
  backgroundColor: "black",
  color: "white",
  border: "1px solid white",
  fontFamily: "monospace",
  fontSize: "12px",
};

const generateNodes = () => {
  const nodes = [];
  const scopePositions = { "__SCOPE__GLOBAL__": { x: 10, y: 10 } }; // Track positions for each scope

  // Create the global scope node first
  nodes.push({
    id: "__SCOPE__GLOBAL__",
    type: "group",
    data: { label: "Global Scope" },
    position: { x: 10, y: 10 },
    style: { ...nodeStyle, width: 400, height: 600 },
  });

  data.executionSteps.forEach((step, index) => {
    const id = step.reference || `node-${index}`;
    const scope = step.scope || "__SCOPE__GLOBAL__";

    // Initialize position if scope not defined
if (!scopePositions[scope]) {
  const parentScope = scopePositions[step.scope] || scopePositions["__SCOPE__GLOBAL__"];
  scopePositions[scope] = { x: 20, y: parentScope.y + 50 };
}

    const position = scopePositions[scope];
    const baseNode = {
      id,
      data: { label: "" },
      position: { x: position.x, y: position.y },
      parentNode: scope,
      extent: "parent",
      style: { ...nodeStyle, width: 200 },
    };

    switch (step.operation) {
      case "FUNCT_DEFINE":
        baseNode.data.label = `${step.name}(${step.args.join(", ")})`;
        baseNode.type = "group";
        baseNode.style.width = 300;
        baseNode.style.height = 400;
        scopePositions[step.reference] = { x: position.x + 20, y: position.y + 50 }; // Set inner position for the function scope
        break;

      case "VAR_DECLARE":
        baseNode.data.label = `${step.name} = ${step.value}`;
        break;

      case "VAR_UPDATE":
        baseNode.data.label = `${step.name} = ${step.new_value}`;
        break;

      case "FOR_LOOP":
        baseNode.data.label = `${step.name} (${step.condition}: ${step.result})`;
        baseNode.type = "group";
        baseNode.style.width = 250;
        baseNode.style.height = 300;
        scopePositions[step.reference] = { x: position.x + 20, y: position.y + 50 }; // Set inner position for the loop scope
        break;

      case "IF_BLOCK":
        baseNode.data.label = `${step.name} (${step.condition}: ${step.result})`;
        baseNode.type = "group";
        baseNode.style.width = 220;
        baseNode.style.height = 150;
        scopePositions[step.reference] = { x: position.x + 20, y: position.y + 50 }; // Set inner position for the if-block scope
        break;

      case "ELSE_BLOCK":
        baseNode.data.label = "else";
        baseNode.type = "group";
        baseNode.style.width = 220;
        baseNode.style.height = 150;
        scopePositions[step.reference] = { x: position.x + 20, y: position.y + 50 }; // Set inner position for the else-block scope
        break;

      default:
        baseNode.data.label = step.lib_name || "";
        break;
    }

    // Increment position for the next node within the same scope
    scopePositions[scope].y += 80;

    nodes.push(baseNode);
  });

  return nodes;
};

const CustomFlow = () => {
  const initialNodes = generateNodes();
  const [nodes, setNodes] = useState(initialNodes);
  const [stepIndex, setStepIndex] = useState(0);

  const updateNodes = useCallback(() => {
    const currentStep = data.executionSteps[stepIndex];

    if (currentStep?.operation === "VAR_UPDATE") {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === currentStep.reference
            ? { ...node, data: { ...node.data, label: `${currentStep.name} = ${currentStep.new_value}` } }
            : node
        )
      );
    }

    setStepIndex((prevIndex) => prevIndex + 1);
  }, [stepIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (stepIndex < data.executionSteps.length) {
        updateNodes();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [stepIndex, updateNodes]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ReactFlow nodes={nodes} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default CustomFlow;
