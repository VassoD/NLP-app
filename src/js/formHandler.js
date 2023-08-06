import axios from "axios";

export const handleSubmit = async (event) => {
  event.preventDefault();
  const url = document.getElementById("article-url").value;

  const urlRegex =
    /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,}(\/\S*)?$/;
  if (!url || !url.match(urlRegex)) {
    throw new Error("Please enter a valid URL.");
  }

  try {
    // Make API call
    const response = await axios.post("http://localhost:3000/api/analyze", {
      url,
    });

    const { agreement, subjectivity } = response.data;

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
      <p>Polarity: ${agreement === "AGREEMENT" ? "positive" : "negative"}</p>
      <p>Subjectivity: ${subjectivity}</p>
      <p>Text: ${response.data.sentence_list[0].text}</p>
    `;
  } catch (error) {
    throw new Error("Error fetching data from the server.");
  }
};
