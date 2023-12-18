import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DynamicRoutes from './mapping';

function App() {
    const { t } = useTranslation();

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/p/*" element={<>dfsdfsds</>} />
                    <Route path="*" element={<DynamicRoutes onConfig={(e) => console.log(e)} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
