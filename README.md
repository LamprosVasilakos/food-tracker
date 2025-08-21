# Food Tracker App

A web application for tracking daily food intake and monitoring macronutrient distribution.

## Features

- Track food entries with carbohydrates, protein, and fat content
- Automatic calorie calculation based on macronutrients
- Visual representation of macronutrient distribution using Chart.js
- Real-time data persistence using Firebase
- Responsive design for desktop and mobile devices

## Technologies Used

- Vanilla JavaScript
- Chart.js for data visualization
- Firebase Firestore for backend
- Snackbar for notifications
- HTML5 & CSS3

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/food-tracker.git
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

## How to Use

1. Select a food item from the dropdown menu
2. Enter the macronutrient values (carbs, protein, fat)
3. Submit the form to add the food entry
4. View the updated chart and total calories
5. All data is automatically saved to Firebase

## Project Structure

```
food-tracker/
│
├── src/
│   ├── app-data.js      # Data management class
│   ├── fetch-wrapper.js # API communication wrapper
│   ├── helpers.js      # Utility functions
│   ├── index.js        # Main application logic
│   └── index.css       # Styles
│
├── index.html          # Main HTML file
├── package.json        # Project dependencies
└── README.md          # Project documentation
```
