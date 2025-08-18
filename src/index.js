import FetchWrapper from "./fetch-wrapper.js";

const API = new FetchWrapper(
  "https://firestore.googleapis.com/v1/projects/jsdemo-3f387/databases/(default)/documents/lampros"
);

const form = document.querySelector("#create-form");
const name = document.querySelector("#create-name");
const protein = document.querySelector("#create-protein");
const carbs = document.querySelector("#create-carbs");
const fat = document.querySelector("#create-fat");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const data = await API.post("/", {
      fields: {
        name: { stringValue: name.value },
        carbs: { integerValue: carbs.value },
        protein: { integerValue: protein.value },
        fat: { integerValue: fat.value },
      },
    });

    // Check if the response indicates success
    // Only clear form if we have a successful response
    if (data && !data.error) {
      name.value = "";
      carbs.value = "";
      protein.value = "";
      fat.value = "";
    }
  } catch (error) {
    console.error("POST failed:", error);
  }
});
