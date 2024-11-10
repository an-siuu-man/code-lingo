// VariableUpdateNode.js
"use client";
import React from 'react';
import { Handle } from 'reactflow';

const VariableUpdateNode = ({ data }) => (
    <div className="border-2 border-red-500 p-3 rounded bg-red-100 text-red-900 shadow-md">
        <h2 className="text-lg font-semibold">Variable Update</h2>
        <p>Name: {data.name}</p>
        <p>Old Value: {data.oldValue}</p>
        <p>New Value: {data.newValue}</p>
        <p>Statement: {data.statement}</p>
        <Handle type="source" position="bottom" className="bg-red-500" />
    </div>
);

export default VariableUpdateNode;
