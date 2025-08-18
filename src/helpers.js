export function capitalize(word) {
  if (!word) return word;
  return word[0].toUpperCase() + word.substring(1).toLowerCase();
}

export function calculateCalories(carbs, protein, fat) {
  // Convert string inputs to numbers and multiply by their caloric values
  return (
    parseInt(carbs) * 4 + // carbs = 4 calories per gram
    parseInt(protein) * 4 + // protein = 4 calories per gram
    parseInt(fat) * 9 // fat = 9 calories per gram
  );
}
