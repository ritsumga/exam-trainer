import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { ExamsPage } from "./exams";
import { services } from "../services/app-services";

describe("ExamsPage", () => {
  it("承認済み製品Packがない場合に隔離状態を説明する", async () => {
    vi.spyOn(services.catalog, "list").mockResolvedValueOnce([]);
    render(<MemoryRouter><ExamsPage /></MemoryRouter>);
    expect(await screen.findByRole("heading", { name: "承認済みの試験問題はまだありません" })).toBeInTheDocument();
  });
});
