import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("blog list", () => {
  const blog = {
    author: "John",
    title: "Undercover",
    url: "example.com",
    likes: 0,
    user: {
      username: "doe",
    },
  };
  test("renders title and author only", () => {
    const container = render(<Blog blog={blog} />).container;
    const visibleElement = container.querySelector(".blog-list-header");
    const inVisibleElement = container.querySelector(".blog-list-body");

    expect(visibleElement).toBeInTheDocument();
    expect(inVisibleElement).not.toBeInTheDocument();

    const authorText = screen.getByText("John", { exact: false });
    const titleText = screen.getByText("Undercover", { exact: false });

    expect(authorText).toBeDefined();
    expect(titleText).toBeDefined();
  });

  test("url and number of likes are shown when like button is clicked", async () => {
    const container = render(<Blog blog={blog} />).container;
    const showButton = screen.getByText("Show");
    const user = userEvent.setup();
    await user.click(showButton);

    const element = container.querySelector(".blog-list-body");
    expect(element).toBeInTheDocument();
  });

  test("like button is clicked twice to ensure event handler is called twice", async () => {
    const updateBlog = jest.fn();

    render(<Blog blog={blog} updateBlog={updateBlog} />).container;
    const showButton = screen.getByText("Show");
    const user = userEvent.setup();
    await user.click(showButton);

    const likeButton = screen.getByText("Like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(updateBlog.mock.calls).toHaveLength(2);
  });
});
