import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddNewBlog from "./AddNewBlog";

test("calls event handler with the right details", async () => {
  const createBlog = jest.fn();
  const getNotification = jest.fn();
  render(
    <AddNewBlog createBlog={createBlog} getNotification={getNotification} />
  ).container;

  const title = screen.getByPlaceholderText("Add title");
  const author = screen.getByPlaceholderText("Add author");
  const url = screen.getByPlaceholderText("Add url");
  const save = screen.getByText("Save");

  const user = userEvent.setup();
  await user.type(title, "Undercover");
  await user.type(author, "John");
  await user.type(url, "example.com");
  await user.click(save);

  expect(createBlog.mock.calls).toHaveLength(1);
});
