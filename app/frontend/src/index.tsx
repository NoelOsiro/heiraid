import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { HelmetProvider } from "react-helmet-async";
import { initializeIcons } from "@fluentui/react";

import "./index.css";

import { lazy, Suspense } from "react";
import Chat from "./pages/chat/Chat";
import LayoutWrapper from "./layoutWrapper";
import i18next from "./i18n/config";
import ErrorPage from "./pages/ErrorPage";

// Lazy load the Map component
const Map = lazy(() => import("./pages/map/Map"));

initializeIcons();

const router = createHashRouter([
    {
        path: "/",
        element: <LayoutWrapper />,
        children: [
            {
                index: true,
                element: <Chat />
            },
            {
                path: "qa",
                lazy: () => import("./pages/ask/Ask")
            },
            {
                path: "map",
                element: (
                    <Suspense fallback={<div style={{ textAlign: "center", padding: "20px", justifyContent: "center", alignItems: "center", display: "flex" }}>Loading map...</div>}>
                        <Map />
                    </Suspense>
                )
            },
            {
                path: "*",
                lazy: () => import("./pages/NoPage")
            }
        ]
        // errorElement: <ErrorPage />
    }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <I18nextProvider i18n={i18next}>
            <HelmetProvider>
                <RouterProvider router={router} />
            </HelmetProvider>
        </I18nextProvider>
    </React.StrictMode>
);
