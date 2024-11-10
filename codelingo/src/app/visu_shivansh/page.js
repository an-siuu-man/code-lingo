// pages/index.js
"use client";
import VisualizationPageStyled from '../components/Visu';

export default function Home() {
  const data = {
    "code": "#include <iostream>\nint main() {\n  int leo = 0;\n  int jay = 10;\n  for (int i = 0; i < 10; i++ ){\n    leo = leo + i;\n    if (i == 9){\n      int shivansh = 10;\n    } else {\n      jay = jay - i;\n    }\n    float ansuman = 99.1;\n  }\n  int sax = -1;\n  return 0;\n}\n\n",
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
            "reference": "__DECLAREDAT__3__NAME__leo__",
            "type": "int",
            "name": "leo",
            "value": "0",
            "scope": "__int__main()__"
        },
        {
            "step": 3,
            "highlight": 4,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__4__NAME__jay__",
            "type": "int",
            "name": "jay",
            "value": "10",
            "scope": "__int__main()__"
        },
        {
            "step": 4,
            "highlight": 5,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__5__NAME__i__",
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
                "i++"
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
            "reference": "__DECLAREDAT__3__NAME__leo__",
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
            "condition": "i == 9",
            "executed": "False",
            "startLine": 7,
            "endLine": 9,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 7,
            "highlight": 9,
            "operation": "ELSE_BLOCK",
            "executed": "True",
            "reference": "__DECLAREDAT__9__ELSE_BLOCK__",
            "startLine": 9,
            "endLine": 11,
            "scope": "__DECLAREDAT__7__IF_BLOCK__"
        },
        {
            "step": 8,
            "highlight": 10,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__4__NAME__jay__",
            "type": "int",
            "name": "jay",
            "statement": "jay = jay - i",
            "old_value": "10",
            "new_value": "10"
        },
        {
            "step": 9,
            "highlight": 12,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__12__NAME__ansuman__",
            "type": "float",
            "name": "ansuman",
            "value": "99.1",
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 10,
            "highlight": 5,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__5__NAME__i__",
            "type": "int",
            "name": "i",
            "statement": "i++",
            "old_value": "0",
            "new_value": "1"
        },
        {
            "step": 10,
            "highlight": 6,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__3__NAME__leo__",
            "type": "int",
            "name": "leo",
            "statement": "leo = leo + i",
            "old_value": "0",
            "new_value": "1"
        },
        {
            "step": 11,
            "highlight": 7,
            "operation": "IF_BLOCK",
            "reference": "__DECLAREDAT__7__IF_BLOCK__",
            "condition": "i == 9",
            "executed": "False",
            "startLine": 7,
            "endLine": 9,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 12,
            "highlight": 9,
            "operation": "ELSE_BLOCK",
            "executed": "True",
            "reference": "__DECLAREDAT__9__ELSE_BLOCK__",
            "startLine": 9,
            "endLine": 11,
            "scope": "__DECLAREDAT__7__IF_BLOCK__"
        },
        {
            "step": 13,
            "highlight": 10,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__4__NAME__jay__",
            "type": "int",
            "name": "jay",
            "statement": "jay = jay - i",
            "old_value": "10",
            "new_value": "9"
        },
        {
            "step": 14,
            "highlight": 12,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__12__NAME__ansuman__",
            "type": "float",
            "name": "ansuman",
            "value": "99.1",
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 15,
            "highlight": 5,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__5__NAME__i__",
            "type": "int",
            "name": "i",
            "statement": "i++",
            "old_value": "1",
            "new_value": "2"
        },
        {
            "step": 15,
            "highlight": 6,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__3__NAME__leo__",
            "type": "int",
            "name": "leo",
            "statement": "leo = leo + i",
            "old_value": "1",
            "new_value": "3"
        },
        {
            "step": 16,
            "highlight": 7,
            "operation": "IF_BLOCK",
            "reference": "__DECLAREDAT__7__IF_BLOCK__",
            "condition": "i == 9",
            "executed": "False",
            "startLine": 7,
            "endLine": 9,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 17,
            "highlight": 9,
            "operation": "ELSE_BLOCK",
            "executed": "True",
            "reference": "__DECLAREDAT__9__ELSE_BLOCK__",
            "startLine": 9,
            "endLine": 11,
            "scope": "__DECLAREDAT__7__IF_BLOCK__"
        },
        {
            "step": 18,
            "highlight": 10,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__4__NAME__jay__",
            "type": "int",
            "name": "jay",
            "statement": "jay = jay - i",
            "old_value": "9",
            "new_value": "7"
        },
        {
            "step": 19,
            "highlight": 12,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__12__NAME__ansuman__",
            "type": "float",
            "name": "ansuman",
            "value": "99.1",
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 20,
            "highlight": 5,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__5__NAME__i__",
            "type": "int",
            "name": "i",
            "statement": "i++",
            "old_value": "2",
            "new_value": "3"
        },
        {
            "step": 20,
            "highlight": 6,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__3__NAME__leo__",
            "type": "int",
            "name": "leo",
            "statement": "leo = leo + i",
            "old_value": "3",
            "new_value": "6"
        },
        {
            "step": 21,
            "highlight": 7,
            "operation": "IF_BLOCK",
            "reference": "__DECLAREDAT__7__IF_BLOCK__",
            "condition": "i == 9",
            "executed": "False",
            "startLine": 7,
            "endLine": 9,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 22,
            "highlight": 9,
            "operation": "ELSE_BLOCK",
            "executed": "True",
            "reference": "__DECLAREDAT__9__ELSE_BLOCK__",
            "startLine": 9,
            "endLine": 11,
            "scope": "__DECLAREDAT__7__IF_BLOCK__"
        },
        {
            "step": 23,
            "highlight": 10,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__4__NAME__jay__",
            "type": "int",
            "name": "jay",
            "statement": "jay = jay - i",
            "old_value": "7",
            "new_value": "4"
        },
        {
            "step": 24,
            "highlight": 12,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__12__NAME__ansuman__",
            "type": "float",
            "name": "ansuman",
            "value": "99.1",
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 25,
            "highlight": 5,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__5__NAME__i__",
            "type": "int",
            "name": "i",
            "statement": "i++",
            "old_value": "3",
            "new_value": "4"
        },
        {
            "step": 25,
            "highlight": 6,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__3__NAME__leo__",
            "type": "int",
            "name": "leo",
            "statement": "leo = leo + i",
            "old_value": "6",
            "new_value": "10"
        },
        {
            "step": 26,
            "highlight": 7,
            "operation": "IF_BLOCK",
            "reference": "__DECLAREDAT__7__IF_BLOCK__",
            "condition": "i == 9",
            "executed": "False",
            "startLine": 7,
            "endLine": 9,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 27,
            "highlight": 9,
            "operation": "ELSE_BLOCK",
            "executed": "True",
            "reference": "__DECLAREDAT__9__ELSE_BLOCK__",
            "startLine": 9,
            "endLine": 11,
            "scope": "__DECLAREDAT__7__IF_BLOCK__"
        },
        {
            "step": 28,
            "highlight": 10,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__4__NAME__jay__",
            "type": "int",
            "name": "jay",
            "statement": "jay = jay - i",
            "old_value": "4",
            "new_value": "0"
        },
        {
            "step": 29,
            "highlight": 12,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__12__NAME__ansuman__",
            "type": "float",
            "name": "ansuman",
            "value": "99.1",
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 30,
            "highlight": 5,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__5__NAME__i__",
            "type": "int",
            "name": "i",
            "statement": "i++",
            "old_value": "4",
            "new_value": "5"
        },
        {
            "step": 30,
            "highlight": 6,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__3__NAME__leo__",
            "type": "int",
            "name": "leo",
            "statement": "leo = leo + i",
            "old_value": "10",
            "new_value": "15"
        },
        {
            "step": 31,
            "highlight": 7,
            "operation": "IF_BLOCK",
            "reference": "__DECLAREDAT__7__IF_BLOCK__",
            "condition": "i == 9",
            "executed": "False",
            "startLine": 7,
            "endLine": 9,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 32,
            "highlight": 9,
            "operation": "ELSE_BLOCK",
            "executed": "True",
            "reference": "__DECLAREDAT__9__ELSE_BLOCK__",
            "startLine": 9,
            "endLine": 11,
            "scope": "__DECLAREDAT__7__IF_BLOCK__"
        },
        {
            "step": 33,
            "highlight": 10,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__4__NAME__jay__",
            "type": "int",
            "name": "jay",
            "statement": "jay = jay - i",
            "old_value": "0",
            "new_value": "-5"
        },
        {
            "step": 34,
            "highlight": 12,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__12__NAME__ansuman__",
            "type": "float",
            "name": "ansuman",
            "value": "99.1",
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 35,
            "highlight": 5,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__5__NAME__i__",
            "type": "int",
            "name": "i",
            "statement": "i++",
            "old_value": "5",
            "new_value": "6"
        },
        {
            "step": 35,
            "highlight": 6,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__3__NAME__leo__",
            "type": "int",
            "name": "leo",
            "statement": "leo = leo + i",
            "old_value": "15",
            "new_value": "21"
        },
        {
            "step": 36,
            "highlight": 7,
            "operation": "IF_BLOCK",
            "reference": "__DECLAREDAT__7__IF_BLOCK__",
            "condition": "i == 9",
            "executed": "False",
            "startLine": 7,
            "endLine": 9,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 37,
            "highlight": 9,
            "operation": "ELSE_BLOCK",
            "executed": "True",
            "reference": "__DECLAREDAT__9__ELSE_BLOCK__",
            "startLine": 9,
            "endLine": 11,
            "scope": "__DECLAREDAT__7__IF_BLOCK__"
        },
        {
            "step": 38,
            "highlight": 10,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__4__NAME__jay__",
            "type": "int",
            "name": "jay",
            "statement": "jay = jay - i",
            "old_value": "-5",
            "new_value": "-11"
        },
        {
            "step": 39,
            "highlight": 12,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__12__NAME__ansuman__",
            "type": "float",
            "name": "ansuman",
            "value": "99.1",
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 40,
            "highlight": 5,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__5__NAME__i__",
            "type": "int",
            "name": "i",
            "statement": "i++",
            "old_value": "6",
            "new_value": "7"
        },
        {
            "step": 40,
            "highlight": 6,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__3__NAME__leo__",
            "type": "int",
            "name": "leo",
            "statement": "leo = leo + i",
            "old_value": "21",
            "new_value": "28"
        },
        {
            "step": 41,
            "highlight": 7,
            "operation": "IF_BLOCK",
            "reference": "__DECLAREDAT__7__IF_BLOCK__",
            "condition": "i == 9",
            "executed": "False",
            "startLine": 7,
            "endLine": 9,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 42,
            "highlight": 9,
            "operation": "ELSE_BLOCK",
            "executed": "True",
            "reference": "__DECLAREDAT__9__ELSE_BLOCK__",
            "startLine": 9,
            "endLine": 11,
            "scope": "__DECLAREDAT__7__IF_BLOCK__"
        },
        {
            "step": 43,
            "highlight": 10,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__4__NAME__jay__",
            "type": "int",
            "name": "jay",
            "statement": "jay = jay - i",
            "old_value": "-11",
            "new_value": "-18"
        },
        {
            "step": 44,
            "highlight": 12,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__12__NAME__ansuman__",
            "type": "float",
            "name": "ansuman",
            "value": "99.1",
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 45,
            "highlight": 5,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__5__NAME__i__",
            "type": "int",
            "name": "i",
            "statement": "i++",
            "old_value": "7",
            "new_value": "8"
        },
        {
            "step": 45,
            "highlight": 6,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__3__NAME__leo__",
            "type": "int",
            "name": "leo",
            "statement": "leo = leo + i",
            "old_value": "28",
            "new_value": "36"
        },
        {
            "step": 46,
            "highlight": 7,
            "operation": "IF_BLOCK",
            "reference": "__DECLAREDAT__7__IF_BLOCK__",
            "condition": "i == 9",
            "executed": "False",
            "startLine": 7,
            "endLine": 9,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 47,
            "highlight": 9,
            "operation": "ELSE_BLOCK",
            "executed": "True",
            "reference": "__DECLAREDAT__9__ELSE_BLOCK__",
            "startLine": 9,
            "endLine": 11,
            "scope": "__DECLAREDAT__7__IF_BLOCK__"
        },
        {
            "step": 48,
            "highlight": 10,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__4__NAME__jay__",
            "type": "int",
            "name": "jay",
            "statement": "jay = jay - i",
            "old_value": "-18",
            "new_value": "-26"
        },
        {
            "step": 49,
            "highlight": 12,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__12__NAME__ansuman__",
            "type": "float",
            "name": "ansuman",
            "value": "99.1",
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 50,
            "highlight": 5,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__5__NAME__i__",
            "type": "int",
            "name": "i",
            "statement": "i++",
            "old_value": "8",
            "new_value": "9"
        },
        {
            "step": 50,
            "highlight": 6,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__3__NAME__leo__",
            "type": "int",
            "name": "leo",
            "statement": "leo = leo + i",
            "old_value": "36",
            "new_value": "45"
        },
        {
            "step": 51,
            "highlight": 7,
            "operation": "IF_BLOCK",
            "reference": "__DECLAREDAT__7__IF_BLOCK__",
            "condition": "i == 9",
            "executed": "True",
            "startLine": 7,
            "endLine": 9,
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 52,
            "highlight": 8,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__8__NAME__shivansh__",
            "type": "int",
            "name": "shivansh",
            "value": "10",
            "scope": "__DECLAREDAT__7__IF_BLOCK__"
        },
        {
            "step": 53,
            "highlight": 9,
            "operation": "ELSE_BLOCK",
            "executed": "False",
            "reference": "__DECLAREDAT__9__ELSE_BLOCK__",
            "startLine": 9,
            "endLine": 11,
            "scope": "__DECLAREDAT__7__IF_BLOCK__"
        },
        {
            "step": 54,
            "highlight": 12,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__12__NAME__ansuman__",
            "type": "float",
            "name": "ansuman",
            "value": "99.1",
            "scope": "__DECLAREDAT__5__FOR_LOOP__"
        },
        {
            "step": 55,
            "highlight": 5,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__5__NAME__i__",
            "type": "int",
            "name": "i",
            "statement": "i++",
            "old_value": "9",
            "new_value": "10"
        },
        {
            "step": 55,
            "highlight": 14,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__14__NAME__sax__",
            "type": "int",
            "name": "sax",
            "value": "-1",
            "scope": "__int__main()__"
        }
    ]
};
  return (
    <div>
      <VisualizationPageStyled data={data} />
    </div>
  );
}
