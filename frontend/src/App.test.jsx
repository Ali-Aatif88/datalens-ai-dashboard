import { render, screen, cleanup } from "@testing-library/react";
import App from "./App";
import { describe, it, expect, afterEach } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(() => {
    cleanup();
});

describe("DataLens Frontend", () => {

    it("renders main title", () => {
        render(<App />);
        expect(
            screen.getByText(/DataLens AI Business Intelligence Dashboard/i)
        ).toBeInTheDocument();
    });

    it("renders upload button", () => {
        render(<App />);
        expect(
            screen.getByText(/Upload & Profile CSV/i)
        ).toBeInTheDocument();
    });

    it("renders Olist analytics button", () => {
        render(<App />);
        expect(
            screen.getByText(/Load Olist Analytics/i)
        ).toBeInTheDocument();
    });

    it("renders download report button", () => {
        render(<App />);
        expect(
            screen.getByText(/Download Report/i)
        ).toBeInTheDocument();
    });

    it("renders clear dashboard button", () => {
        render(<App />);
        expect(
            screen.getByText(/Clear Dashboard/i)
        ).toBeInTheDocument();
    });

});