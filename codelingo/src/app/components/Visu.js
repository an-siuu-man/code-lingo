// Visu.js
"use client";
import React from 'react';
import ReactFlow, { MiniMap, Controls, Background, Handle } from 'reactflow';
import 'reactflow/dist/style.css';

// import IncludeNode from '../components/elements/Include';
// import FunctionNode from '../components/elements/Function';
// import VariableDeclarationNode from '../components/elements/VariableDeclaration';
// import VariableUpdateNode from '../components/elements/VariableUpdate';

// Sample data
const data = {
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
            "args": [[]],
            "startLine": 2,
            "endLine": 9
        },
        {
            "step": 2,
            "highlight": 3,
            "operation": "VAR_DECLARE",
            "type": "int",
            "name": "variable1",
            "value": "10"
        },
        {
            "step": 3,
            "highlight": 4,
            "operation": "VAR_DECLARE",
            "type": "int",
            "name": "variable2",
            "value": "20"
        },
        {
            "step": 4,
            "highlight": 6,
            "operation": "VAR_UPDATE",
            "name": "variable2",
            "statement": "variable2 = variable2 - variable1",
            "old_value": "20",
            "new_value": "10"
        }
    ]
};

// Custom node components
const IncludeNode = ({ data }) => (
    <div className="border border-gray-300 p-2 rounded bg-gray-100">
        <h2>Include Library</h2>
        <p>{data.name}</p>
        <Handle type="source" position="bottom" />
    </div>
);

const FunctionNode = ({ data }) => (
    <div className="border border-gray-300 p-2 rounded bg-gray-100">
        <h2>Function Declaration</h2>
        <p>Name: {data.name}</p>
        <p>Return Type: {data.returnType}</p>
        <p>Arguments: {JSON.stringify(data.args)}</p>
        <Handle type="source" position="bottom" />
    </div>
);

const VariableDeclarationNode = ({ data }) => (
    <div className="border border-gray-300 p-2 rounded bg-gray-100">
        <h2>Variable Declaration</h2>
        <p>Type: {data.type}</p>
        <p>Name: {data.name}</p>
        <p>Value: {data.value}</p>
        <Handle type="source" position="bottom" />
    </div>
);

const VariableUpdateNode = ({ data }) => (
    <div className="border border-gray-300 p-2 rounded bg-gray-100">
        <h2>Variable Update</h2>
        <p>Name: {data.name}</p>
        <p>Old Value: {data.oldValue}</p>
        <p>New Value: {data.newValue}</p>
        <p>Statement: {data.statement}</p>
        <Handle type="source" position="bottom" />
    </div>
);

// Define node types
const nodeTypes = {
    include: IncludeNode,
    function: FunctionNode,
    variableDeclaration: VariableDeclarationNode,
    variableUpdate: VariableUpdateNode,
};

// Nodes and edges creation remains the same
const Visu = () => {
    // Map execution steps to nodes
    const nodes = data.executionSteps.map((step, index) => {
        let nodeType;
        let nodeData = {};

        // Define node type and data based on operation
        switch (step.operation) {
            case "INCLUDE":
                nodeType = "include";
                nodeData = { name: step.lib_name };
                break;
            case "FUNCT_DEFINE":
                nodeType = "function";
                nodeData = {
                    name: step.name,
                    returnType: step.return_type,
                    args: step.args,
                };
                break;
            case "VAR_DECLARE":
                nodeType = "variableDeclaration";
                nodeData = {
                    type: step.type,
                    name: step.name,
                    value: step.value,
                };
                break;
            case "VAR_UPDATE":
                nodeType = "variableUpdate";
                nodeData = {
                    name: step.name,
                    oldValue: step.old_value,
                    newValue: step.new_value,
                    statement: step.statement,
                };
                break;
            default:
                break;
        }

        return {
            id: `${index}`,
            type: nodeType,
            data: nodeData,
            position: { x: 0, y: index * 100 },
        };
    });

    // Define edges to connect the nodes
    const edges = data.executionSteps.slice(1).map((_, index) => ({
        id: `e${index}-${index + 1}`,
        source: `${index}`,
        target: `${index + 1}`,
        type: 'smoothstep',
    }));

    return (
        <div className="h-screen bg-gray-50 p-6">
            <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
                <MiniMap nodeColor={(node) => {
                    switch (node.type) {
                        case 'include':
                            return 'rgb(59, 130, 246)'; // Blue for Include
                        case 'function':
                            return 'rgb(34, 197, 94)'; // Green for Function
                        case 'variableDeclaration':
                            return 'rgb(234, 179, 8)'; // Yellow for Variable Declaration
                        case 'variableUpdate':
                            return 'rgb(239, 68, 68)'; // Red for Variable Update
                        default:
                            return '#ccc';
                    }
                }} />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
};

export default Visu;
