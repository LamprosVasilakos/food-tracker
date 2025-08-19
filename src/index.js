import FetchWrapper from "./fetch-wrapper.js";
import { capitalize, calculateCalories } from "./helpers.js";
import snackbar from "snackbar";

const API = new FetchWrapper(
  "https://firestore.googleapis.com/v1/projects/jsdemo-3f387/databases/(default)/documents/lampros"
);

// DOM elements
const form = document.querySelector("#create-form");
const name = document.querySelector("#create-name");
const protein = document.querySelector("#create-protein");
const carbs = document.querySelector("#create-carbs");
const fat = document.querySelector("#create-fat");
const foodList = document.querySelector("#food-list");

// Display single food entry
const displayEntry = (name, carbs, protein, fat) => {
  const calories = calculateCalories(carbs, protein, fat);
  const foodItem = `
    <li class="card">
      <div>
        <h3 class="name">${capitalize(name)}</h3>
        <div class="calories">${calories} calories</div>
        <ul class="macros">
          <li class="carbs"><div>Carbs</div><div class="value">${carbs}g</div></li>
          <li class="protein"><div>Protein</div><div class="value">${protein}g</div></li>
          <li class="fat"><div>Fat</div><div class="value">${fat}g</div></li>
        </ul>
      </div>
    </li>
  `;
  foodList.insertAdjacentHTML("beforeend", foodItem);
};

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

    if (data && !data.error) {
      displayEntry(name.value, carbs.value, protein.value, fat.value);
      snackbar.show("Food added successfully.");

      // Clear form
      name.value = "";
      carbs.value = "";
      protein.value = "";
      fat.value = "";
    } else {
      snackbar.show("Some data is missing.");
    }
  } catch (error) {
    console.error("POST failed:", error);
  }
});

const init = async () => {
  try {
    const data = await API.get("/?pageSize=50");

    if (!data.documents) {
      foodList.innerHTML = '<p class="empty-state">No foods added yet.</p>';
      return;
    }

    data.documents.forEach((item) => {
      const fields = item.fields;
      displayEntry(
        fields.name.stringValue,
        fields.carbs.integerValue,
        fields.protein.integerValue,
        fields.fat.integerValue
      );
    });
  } catch (error) {
    console.error("Failed to fetch foods:", error);
    snackbar.show("Failed to load foods");
  }
};

init();
