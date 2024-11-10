// Visu.js
"use client";

import React from 'react';
import Include from '../components/elements/Include';
import Function from '../components/elements/Function';
import VariableDeclaration from '../components/elements/VariableDeclaration';
import VariableUpdate from '../components/elements/VariableUpdate';

const data = {
    "code": "#include <iostream>\nint main() {\n  int variable1 = 10;\n  int variable2 = 20;\n\n  variable2 = variable2 - variable1;\n  \n  return 0;\n}",
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
            "name": "main",
            "return_type": "int",
            "args": [
                []
            ],
            "startLine": 2,
            "endLine": 9
        },
        {
            "step": 2,
            "highlight": 3,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__3__NAME__variable1",
            "type": "int",
            "name": "variable1",
            "value": "10"
        },
        {
            "step": 3,
            "highlight": 4,
            "operation": "VAR_DECLARE",
            "reference": "__DECLAREDAT__4__NAME__variable2",
            "type": "int",
            "name": "variable2",
            "value": "20"
        },
        {
            "step": 4,
            "highlight": 6,
            "operation": "VAR_UPDATE",
            "reference": "__DECLAREDAT__4__NAME__variable2",
            "type": "int",
            "name": "variable2",
            "statement": "variable2 = variable2 - variable1",
            "old_value": "20",
            "new_value": "10"
        }
    ]
};

const Visu = () => {
    return (
        <div className="p-6 bg-gray-800">
            <h1 className="text-2xl font-bold mb-4 text-white">Visualization</h1>
            {data.executionSteps.map((step, index) => {
                switch (step.operation) {
                    case "INCLUDE":
                        return <Include key={index} name={step.lib_name} />;
                    case "FUNCT_DEFINE":
                        return (
                            <Function
                                key={index}
                                name={step.name}
                                returnType={step.return_type}
                                args={step.args}
                                startLine={step.startLine}
                                endLine={step.endLine}
                            />
                        );
                    case "VAR_DECLARE":
                        return (
                            <VariableDeclaration
                                key={index}
                                type={step.type}
                                name={step.name}
                                value={step.value}
                            />
                        );
                    case "VAR_UPDATE":
                        return (
                            <VariableUpdate
                                key={index}
                                name={step.name}
                                oldValue={step.old_value}
                                newValue={step.new_value}
                                statement={step.statement}
                            />
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default Visu;
