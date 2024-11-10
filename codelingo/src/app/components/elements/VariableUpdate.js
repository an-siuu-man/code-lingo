// VariableUpdate.js
"use client";
import React from 'react';

const VariableUpdate = ({ name, oldValue, newValue, statement }) => {
    return (
        <div className="border border-gray-300 p-4 m-2 rounded-lg bg-gray-800 text-white">
            <h2 className="text-lg font-bold">Variable Update</h2>
            <p>Name: {name}</p>
            <p>Old Value: {oldValue}</p>
            <p>New Value: {newValue}</p>
            <p>Statement: {statement}</p>
        </div>
    );
};

export default VariableUpdate;
