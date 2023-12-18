import React, { useState, useEffect } from 'react';

interface IFeature {
    title?: string;
}
interface IState {
    arg: null | string;
}

export function FeatuesOne({ title = '' }: IFeature): JSX.Element {
    const initState = {
        arg: null,
    };
    // always define initial state
    const [first, setFirst] = useState<IState>(initState);

    useEffect(() => {
        setFirst({ arg: 'Running state' });
        return () => {
            setFirst(initState);
        };
    }, []);

    return (
        <>
            <h1>State Samsung</h1>
            <h4>{first.arg}</h4>
            <p>This page only sample template feature</p>
        </>
    );
}

export default React.memo(FeatuesOne);
