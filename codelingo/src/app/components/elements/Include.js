// Include.js
"use client";
import React from 'react';

const Include = ({ name }) => {
    return (
        <div className="border border-gray-300 p-4 m-2 rounded-lg bg-gray-800 text-white">
            <h2 className="text-lg font-bold">Include Library</h2>
            <p>{name}</p>
        </div>
    );
};

export default Include;
