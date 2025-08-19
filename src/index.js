import FetchWrapper from "./fetch-wrapper.js";
import { capitalize, calculateCalories } from "./helpers.js";
import snackbar from "snackbar";

const API = new FetchWrapper(
  "https://firestore.googleapis.com/v1/projects/jsdemo-3f387/databases/(default)/documents/lampros"
);

const form = document.querySelector("#create-form");
const name = document.querySelector("#create-name");
const protein = document.querySelector("#create-protein");
const carbs = document.querySelector("#create-carbs");
const fat = document.querySelector("#create-fat");
const foodList = document.querySelector("#food-list");

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
      const calories = calculateCalories(carbs.value, protein.value, fat.value);
      const foodItem = `
        <li class="card">
          <div>
            <h3 class="name">${capitalize(name.value)}</h3>
            <div class="calories">${calories} calories</div>
            <ul class="macros">
              <li class="carbs"><div>Carbs</div><div class="value">${
                carbs.value
              }g</div></li>
              <li class="protein"><div>Protein</div><div class="value">${
                protein.value
              }g</div></li>
              <li class="fat"><div>Fat</div><div class="value">${
                fat.value
              }g</div></li>
            </ul>
          </div>
        </li>
      `;

      foodList.insertAdjacentHTML("beforeend", foodItem);

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
