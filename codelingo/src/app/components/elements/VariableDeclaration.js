// VariableDeclaration.js
"use client";
import React from 'react';

const VariableDeclaration = ({ type, name, value }) => {
    return (
        <div className="border border-gray-300 p-4 m-2 rounded-lg bg-gray-800 text-white">
            <h2 className="text-lg font-bold">Variable Declaration</h2>
            <p>Type: {type}</p>
            <p>Name: {name}</p>
            <p>Value: {value}</p>
        </div>
    );
};

export default VariableDeclaration;
