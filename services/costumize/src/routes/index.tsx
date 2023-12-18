import React from 'react';
import loadable from '@loadable/component';
interface IDynamic {
    url: string;
    client: string;
}
function DynamicRoutes({ url, client }: IDynamic) {
    console.log(url, client);
    // eslint-disable-next-line react/prop-types
    const AsyncPage = loadable((props: any) => import(`./${props.page}`), {
        fallback: <div>loading content...</div>,
        ssr: false,
    });

    let Page: any = <AsyncPage page="loader" />;
    const path = url.split('/');
    try {
        Page = <AsyncPage page={`source/${client}/pages/${path[0]}/dinamic`} />;
    } catch {
        try {
            Page = <AsyncPage page={`source/${client}/pages/${url}/`} />;
        } catch {
            Page = <AsyncPage page="default-page" />;
        }
    }

    return <Page />;
}

export default DynamicRoutes;
