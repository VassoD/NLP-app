import { handleSubmit } from "./formHandler";
import "../scss/main.scss";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("article-form");
  form.addEventListener("submit", handleSubmit);
});
