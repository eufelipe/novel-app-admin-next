import React from "react";
import { render, screen } from "../test-utils";
import LoginPage from "@pages/Login";

describe("Login Page", () => {
  it("should render the label on login button", () => {
    render(<LoginPage />);

    const heading = screen.getByText(/Sign in with Google/i);

    expect(heading).toBeInTheDocument();
  });
});
