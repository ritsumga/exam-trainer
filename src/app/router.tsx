import { lazy } from "react";
import { createHashRouter, Navigate } from "react-router-dom";
import { AppLayout, RouteError } from "./shell";

const ExamsPage = lazy(async () => ({ default: (await import("../features/exams")).ExamsPage }));
const ExamHomePage = lazy(async () => ({ default: (await import("../features/exams")).ExamHomePage }));
const PracticeSetupPage = lazy(async () => ({ default: (await import("../features/practice")).PracticeSetupPage }));
const PracticePage = lazy(async () => ({ default: (await import("../features/practice")).PracticePage }));
const MockSetupPage = lazy(async () => ({ default: (await import("../features/mock-exam")).MockSetupPage }));
const MockExamPage = lazy(async () => ({ default: (await import("../features/mock-exam")).MockExamPage }));
const MockResultPage = lazy(async () => ({ default: (await import("../features/mock-exam")).MockResultPage }));
const StatisticsPage = lazy(async () => ({ default: (await import("../features/statistics")).StatisticsPage }));
const DataSettingsPage = lazy(async () => ({ default: (await import("../features/data-settings")).DataSettingsPage }));

export const router = createHashRouter([{
  path: "/", element: <AppLayout />, errorElement: <RouteError />, children: [
    { index: true, element: <Navigate to="/exams" replace /> },
    { path: "exams", element: <ExamsPage /> },
    { path: "exams/:examId", element: <ExamHomePage /> },
    { path: "exams/:examId/practice/setup", element: <PracticeSetupPage /> },
    { path: "exams/:examId/practice/:sessionId", element: <PracticePage /> },
    { path: "exams/:examId/mock/setup", element: <MockSetupPage /> },
    { path: "exams/:examId/mock/:sessionId", element: <MockExamPage /> },
    { path: "exams/:examId/mock/:sessionId/result", element: <MockResultPage /> },
    { path: "exams/:examId/statistics", element: <StatisticsPage /> },
    { path: "settings/data", element: <DataSettingsPage /> },
    { path: "*", element: <RouteError /> },
  ],
}]);
