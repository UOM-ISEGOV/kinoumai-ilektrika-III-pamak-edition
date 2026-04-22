# Go Electric III - Eligibility Engine (Κινούμαι Ηλεκτρικά ΙΙΙ)

This project is a web-based dialog system designed to assist citizens during the information stage of the **"Κινούμαι Ηλεκτρικά ΙΙΙ" (Go Electric III)** public service. 

It functions as an **Eligibility Engine**, featuring an adaptive questionnaire that dynamically determines a citizen's eligibility for the subsidy and identifies the exact supporting documents (evidences) required for their specific case. It also includes a Frequently Asked Questions (FAQ) section.

You can visit the live web-based dialogue system [here](https://github.com/andreasf2/kinoumai-ilektrika-III-pamak-edition). 

## Project Features

* **Adaptive Flow (Strict Schema Logic):** The questionnaire is not static. It branches dynamically based on user input, ensuring they only answer relevant questions.
* **Automatic Termination:** The system automatically ends the dialogue if the user selects an option that makes them ineligible (e.g., trying to buy a gasoline car).
* **Dynamic Evidence Mapping:** Required documents are gathered "on the fly" based on the specific choices made during the questionnaire.
* **State Management (History Stack):** The system remembers the user's path, allowing them to safely navigate back, change their answers, and recalculate outcomes without errors.
* **Bilingual Support:** Fully supports both Greek and English, including all UI elements, questions, and FAQs.
* **Gov.gr Design System:** Styled using the official design guidelines of the Greek digital state (`@digigov-css`).

## Requirements

To use and modify this project locally, you need the following:

* A modern web browser (Chrome, Firefox, Safari, Edge, etc.)
* Visual Studio Code (VSCode) or another preferred code editor
* [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for VSCode (or an equivalent local development server)
* Basic knowledge of HTML, CSS, and JavaScript

## Setup Instructions

### 1. Download the Repository
Clone or download this repository to your local machine.

### 2. Run Locally
Open the project folder in VSCode. Start the Live Server by clicking the 'Go Live' button at the bottom-right corner of the editor. This will open the project in your default browser at a local port (e.g., `http://localhost:5500/`).

## Project Structure

The project is organized as follows:

```sh
project
│
├── index.html                     # Main HTML structure and UI
├── styles.css                     # Custom styling (Gov.gr design system overrides and centering)
├── js/
│   ├── jquery-functions.js        # Core logic: fetches JSON, handles strict schema, history, and builds UI
│   └── change-language-functions.js # Handles bilingual content and static translations
├── question-utils/
│   ├── all-questions.json         # Strict Schema JSON: Greek questions, branch logic, and evidences
│   ├── all-questions-en.json      # Strict Schema JSON: English questions, branch logic, and evidences
│   ├── faq.json                   # Greek FAQs
│   └── faq-en.json                # English FAQs
└── README.md                      # Project documentation