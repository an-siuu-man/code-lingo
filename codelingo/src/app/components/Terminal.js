import dynamic from 'next/dynamic';

const TerminalComp = dynamic(() => import('./TerminalComponent'), { ssr: false });


export default function Terminal() {
    return (
        <div>
            <TerminalComp />
        </div>
    );
}
