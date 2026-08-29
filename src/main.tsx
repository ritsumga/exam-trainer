import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import "./styles.css";

const root = document.getElementById("root");
if (root === null) throw new Error("root要素がありません");
createRoot(root).render(<StrictMode><RouterProvider router={router} /></StrictMode>);
