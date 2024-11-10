// Function.js
"use client";
import React from 'react';

const Function = ({ name, returnType, args, startLine, endLine }) => {
    return (
        <div className="border border-gray-300 p-4 m-2 rounded-lg bg-gray-900 text-white">
            <h2 className="text-lg font-bold">Function Declaration</h2>
            <p>Name: {name}</p>
            <p>Return Type: {returnType}</p>
            <p>Arguments: {JSON.stringify(args)}</p>
            <p>Start Line: {startLine}</p>
            <p>End Line: {endLine}</p>
        </div>
    );
};

export default Function;
