// VariableDeclarationNode.js
"use client";
import React from 'react';
import { Handle } from 'reactflow';

const VariableDeclarationNode = ({ data }) => (
    <div className="border-2 border-yellow-500 p-3 rounded bg-yellow-100 text-yellow-900 shadow-md">
        <h2 className="text-lg font-semibold">Variable Declaration</h2>
        <p>Type: {data.type}</p>
        <p>Name: {data.name}</p>
        <p>Value: {data.value}</p>
        <Handle type="source" position="bottom" className="bg-yellow-500" />
    </div>
);

export default VariableDeclarationNode;
