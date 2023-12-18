import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { NavLink } from 'react-router-dom';

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
        <Card>
            <h1>Editor Page Air Asia</h1>
            <h4>{first.arg}</h4>
            <p>This page only sample template feature</p>
            <NavLink to="/preview"> Auth</NavLink>
        </Card>
    );
}

export default React.memo(FeatuesOne);
