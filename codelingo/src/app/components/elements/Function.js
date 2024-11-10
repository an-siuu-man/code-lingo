// FunctionNode.js
"use client";
import React from 'react';
import { Handle } from 'reactflow';

const FunctionNode = ({ data }) => (
    <div className="border-2 border-green-500 p-3 rounded bg-green-100 text-green-900 shadow-md">
        <h2 className="text-lg font-semibold">Function Declaration</h2>
        <p>Name: {data.name}</p>
        <p>Return Type: {data.returnType}</p>
        <p>Arguments: {JSON.stringify(data.args)}</p>
        <Handle type="source" position="bottom" className="bg-green-500" />
    </div>
);

export default FunctionNode;
