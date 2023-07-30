import axios from "axios";

export const handleSubmit = async (event) => {
  event.preventDefault();
  const url = document.getElementById("article-url").value;

  // Validate the input URL
  const urlRegex =
    /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,}(\/\S*)?$/;
  if (!url || !url.match(urlRegex)) {
    alert("Please enter a valid URL.");
    return;
  }

  // Make API call
  try {
    const response = await axios.post("http://localhost:3000/api/analyze", {
      url,
    });
    console.log("API Response:", response.data);
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
      <p>Irony: ${response.data.irony}</p>
      <p>Subjectivity: ${response.data.subjectivity}</p>
      <p>Confidence: ${response.data.confidence}</p>
    `;
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Error fetching data");
  }
};
