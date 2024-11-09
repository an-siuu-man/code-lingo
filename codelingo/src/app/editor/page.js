'use client';
import EditorMonaco from '@/app/components/EditorMonaco';
import React from 'react';

export default function MonEditor() {

    return (
        <div>
            <div className='mt-10 w-[50%]'>
                <EditorMonaco />
            </div>
        </div>
    );

}