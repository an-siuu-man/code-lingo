import React from 'react';

const Textbox = ({content}) => {
    return (
        <div style={{ border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
            <textarea
                value={content}
                readOnly
                style={{ width: '100%', height: '200px', border: 'none', backgroundColor: '#1e1e1e', resize: 'none', outline: 'none' }}
            />
        </div>
    );
};

export default Textbox;