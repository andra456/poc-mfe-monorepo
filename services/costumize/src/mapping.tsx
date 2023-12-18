import React, { useState, useEffect } from 'react';
import loadable from '@loadable/component';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';
import Loader from 'host/loader';

const AsyncPage = loadable((props: any) => import(`./routes/source/${props.client}/pages/${props.page}`), {
    cacheKey: (props) => props.page,
    ssr: false,
    fallback: <Loader />,
});

function AsComponent({ onConfig, clientId }: { onConfig?: (e: any) => void; clientId?: string }) {
    const [page, setPage] = useState<string | undefined | null>();
    const location = useLocation();
    const client = clientId ?? process.env.CLIENT ?? 'airasia';
    const path = window.location.pathname;
    const params = path.split('/');

    const indexPath = params[1];

    const getAnyCostome = async () => {
        const indexPath = params[1];

        const path_full = `src/routes/source/${client}/pages/${indexPath}`;
        const regexName = path_full.replaceAll('/', '_');
        const regexChunk = `${regexName}_index_tsx.chunk.bundle.js`;

        try {
            const isAny = await fetch(`${process.env.BASEPATH}${regexChunk}`);
            console.log(isAny);
            if (isAny.status === 200) {
                setPage(indexPath);
            }
        } catch {
            setPage(null);
        }
    };

    useEffect(() => {
        indexPath && getAnyCostome(); //setPage(indexPath);
    }, [location]);

    useEffect(() => {
        console.log(page, location);
        if (page && client) {
            try {
                const config = require(`./routes/source/${client}/pages/${indexPath}/config.json`);
                config && onConfig && onConfig(config);
            } catch {
                console.log('error get config');
            }
        }
    }, [page, client]);

    return <div>{page && client && <AsyncPage page={page} client={client} />}</div>;
}

const AsyncDynamic = ({ onConfig, clientId }: { onConfig?: (e: any) => void; clientId?: string }) => {
    console.log(clientId);
    return (
        <ErrorBoundary fallback={<>err</>}>
            <AsComponent clientId={clientId} onConfig={onConfig} />
        </ErrorBoundary>
    );
};
export default AsyncDynamic;
