import React from "react";
import { render, screen } from "../../test-utils";
import NovelsPage from "@pages/novels";

describe("Novels Page", () => {
  it("should render home text", () => {
    render(<NovelsPage />);

    const text = screen.getByText(/Home/i);

    expect(text).toBeInTheDocument();
  });
});
