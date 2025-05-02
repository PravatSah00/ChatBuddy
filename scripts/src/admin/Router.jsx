/**
 * Defination of router
 */

import { lazy } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Layout from "@admin/Layout";
import FlowBuilder from "@admin/pages/FlowBuilder";
import SmartAnswer from "@admin/pages/SmartAnswer";
import Preview from "@admin/pages/Preview";

const Router = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<FlowBuilder />} />
                    <Route path="flowbuilder" element={<FlowBuilder />} />
                    <Route path="smartanswer" element={<SmartAnswer />} />
                    <Route path="preview" element={<Preview />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}

export default Router;
