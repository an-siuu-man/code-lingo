import React, { useEffect, useState } from 'react';

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

const VisualizationPage = () => {
  const [variables, setVariables] = useState({}); // Store variable state
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedReference, setHighlightedReference] = useState(null); // Track highlighted reference

  useEffect(() => {
    // Function to process each step
    const processStep = (step) => {
      const { operation, reference, name, value, new_value, condition, result, scope } = step;
      setVariables((prevVars) => {
        const updatedVars = { ...prevVars };

        if (operation === 'VAR_DECLARE' || operation === 'FUNCT_DEFINE') {
          updatedVars[reference] = {
            label: `${name} = ${value ?? ''}`,
            scope
          };
        } else if (operation === 'VAR_UPDATE' && updatedVars[reference]) {
          updatedVars[reference].label = `${name} = ${new_value}`;
        } else if (operation === 'IF_BLOCK') {
          updatedVars[reference] = {
            label: `IF (${condition}: ${result})`,
            scope
          };
        } else if (operation === 'ELSE_BLOCK') {
          updatedVars[reference] = {
            label: `ELSE`,
            scope
          };
        } else if (operation === 'FOR_LOOP') {
          updatedVars[reference] = {
            label: `FOR (${condition})`,
            scope
          };
        } else if (operation === 'WHILE_LOOP') {
          updatedVars[reference] = {
            label: `WHILE (${condition})`,
            scope
          };
        }

        return updatedVars;
      });

      // Highlight the updated or newly added variable
      setHighlightedReference(reference);
      setTimeout(() => setHighlightedReference(null), 1000); // Remove highlight after 1 second
    };

    // Step through execution data
    const interval = setInterval(() => {
      if (currentStep < data.executionSteps.length) {
        processStep(data.executionSteps[currentStep]);
        setCurrentStep((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentStep]);

  // Function to render variables in nested scopes
  const renderVariables = (scope = "__SCOPE__GLOBAL__") => {
    return Object.entries(variables)
      .filter(([, varData]) => varData.scope === scope)
      .map(([key, varData]) => (
        <div
          key={key}
          className={`variable-box ${highlightedReference === key ? 'highlight' : ''}`} // Add highlight class if needed
        >
          <div>{varData.label}</div>
          {renderVariables(key)} {/* Recursively render nested scopes */}
        </div>
      ));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Execution Visualization</h2>
      <div className="visualization-container">
        {renderVariables()}
      </div>
    </div>
  );
};

// CSS in JS styling for better control
const styles = {
  visualizationContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: '10px',
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '8px',
  },
  variableBox: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    border: '1px solid white',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '14px',
    marginLeft: '20px',
    transition: 'background-color 0.5s ease', // Transition effect for background color
  },
  highlight: {
    backgroundColor: '#4CAF50', // Highlight color for updated variable
  },
};

// Injecting styles to match inline CSS
const VisualizationPageStyled = () => (
  <>
    <style>
      {`
        .visualization-container {
          display: flex;
          flex-direction: column;
          align-items: start;
          gap: 10px;
          background-color: #f0f0f0;
          padding: 20px;
          border-radius: 8px;
        }
        .variable-box {
          background-color: #333;
          color: #fff;
          padding: 10px;
          border: 1px solid white;
          border-radius: 4px;
          font-family: monospace;
          font-size: 14px;
          margin-left: 20px;
          transition: background-color 0.5s ease;
        }
        .variable-box.highlight {
          background-color: #4CAF50; /* Highlight color */
        }
      `}
    </style>
    <VisualizationPage />
  </>
);

export default VisualizationPageStyled;
