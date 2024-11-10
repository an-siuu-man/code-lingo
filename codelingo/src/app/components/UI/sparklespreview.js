"use client";
import React from "react";
import { SparklesCore } from "../UI/sparkles";

export function SparklesPreview() {
return (
    <div
        className="h-[20rem] w-full bg-rgb(29, 31, 33) flex flex-col items-center justify-center overflow-hidden rounded-md">
        <h1
            className="md:text-7xl text-3xl lg:text-8xl text-center text-white relative z-20">
            Code<span className="text-[#FF6B6B]">{'Lingo</>'}</span>
        </h1>
        <h2 className="text-2xl text-center text-white relative z-20 m-3 fade-in-left">
            An Interactive Learning Platform for Coding
        </h2>
        <div className="w-[40rem] h-10 relative">
            {/* Gradients */}
            <div
                className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div
                className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div
                className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div
                className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

            {/* Core component */}
            <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={600}
                className="w-full z-[-5]"
                particleColor="#FF6B6B" />

            {/* Radial Gradient to prevent sharp edges */}
            <div
                className="absolute inset-0 w-full h-[50%] bg-rgb(29, 31, 33) [mask-image:radial-gradient(350px_200px_at_top,transparent_40%,white)]"></div>
        </div>
    </div>
);
}
