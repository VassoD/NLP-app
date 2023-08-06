import { handleSubmit } from "../formHandler";
import axios from "axios";
import { JSDOM } from "jsdom";

jest.mock("axios");

test("Test handle submit function with valid URL", async () => {
  // DOM environment
  const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
  const { window } = jsdom;
  global.document = window.document;
  global.window = window;

  const event = {
    preventDefault: jest.fn(),
  };

  document.getElementById = jest.fn().mockReturnValueOnce({
    value: "https://www.nytimes.com/international/",
  });

  axios.post.mockRejectedValueOnce(new Error("Mocked error message"));

  expect.assertions(1);
  try {
    await handleSubmit(event);
  } catch (error) {
    expect(error.message).toBe("Error fetching data from the server.");
  }
});
