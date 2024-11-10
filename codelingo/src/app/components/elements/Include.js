// IncludeNode.js
"use client";
import React from 'react';
import { Handle } from 'reactflow';

const IncludeNode = ({ data }) => (
    <div className="border-2 border-blue-500 p-3 rounded bg-blue-100 text-blue-900 shadow-md">
        <h2 className="text-lg font-semibold">Include Library</h2>
        <p>{data.name}</p>
        <Handle type="source" position="bottom" className="bg-blue-500" />
    </div>
);

export default IncludeNode;
