var languageContent = {
    greek: {
        languageBtn: "EN",
        mainTitle: "Κινούμαι Ηλεκτρικά ΙΙΙ",
        pageTitle: "Κινούμαι Ηλεκτρικά ΙΙΙ",
        infoTitle: "Οδηγός Δικαιολογητικών για την Επιδότηση Κινούμαι Ηλεκτρικά ΙΙΙ",
        subTitle1: "Αυτό το ερωτηματολόγιο θα σας βοηθήσει να βρείτε ακριβώς ποια δικαιολογητικά χρειάζεστε για την αίτησή σας.",
        subTitle2: "H συμπλήρωση του ερωτηματολογίου δεν απαιτεί παραπάνω από 2 λεπτά.",
        subTitle3: "Δεν θα αποθηκεύσουμε ούτε θα μοιραστούμε τις απαντήσεις σας.",
        disclaimerLabel: "Αποποίηση Ευθύνης",
        disclaimerShortText: "Η υπηρεσία αυτή αποτελεί ερευνητικό πρωτότυπο του Πανεπιστημίου Μακεδονίας και δεν αποτελεί επίσημη υπηρεσία του gov.gr.",
        startBtn: "Ας ξεκινήσουμε",
        backButton: "Πίσω",
        nextQuestion: "Επόμενη ερώτηση",
        footerText: "Αυτό το έργο δημιουργήθηκε στα πλαίσια του μαθήματος Συστήματα Ηλεκτρονικής Διακυβέρνησης. Φοιτητές:",
        student1: "Ανδρέας Μανθόπουλος", student2: "Αθανάσιος Γεωργούλας", student3: "Άρης Στεργίου",
        modalTitle: "Αποποίηση Ευθύνης (Disclaimer)",
        modalBody: `
            <p>Η παρούσα διαδικτυακή υπηρεσία αποτελεί ερευνητικό πρωτότυπο που αναπτύχθηκε από το Πανεπιστήμιο Μακεδονίας.</p>
            <p>Το περιεχόμενο και τα αποτελέσματα είναι πειραματικού χαρακτήρα και διατίθενται «ως έχουν» (as is).</p>
            <p><strong>Με τη χρήση της υπηρεσίας, ο επισκέπτης αποδέχεται πλήρως τους παραπάνω όρους.</strong></p>
        `,
        eligible: "Είστε δικαιούχος επιδότησης!",
        notEligible: "Δεν πληροίτε τα κριτήρια",
        documentsTitle: "Απαιτούμενα Δικαιολογητικά:",
        and:"και",
        errorChoose: "Πρέπει να επιλέξετε μια απάντηση"
    },
    english: {
        languageBtn: "EL",
        mainTitle: "Go Electric III",
        pageTitle: "Go Electric III",
        infoTitle: "Required Documents Guide for Go Electric III Subsidy",
        subTitle1: "This questionnaire will help you determine the exact documents you need for your application.",
        subTitle2: "Completing this questionnaire should not take more than 2 minutes.",
        subTitle3: "We will neither store nor share your answers.",
        disclaimerLabel: "Disclaimer",
        disclaimerShortText: "This service is a research prototype of the University of Macedonia and is not an official gov.gr service.",
        startBtn: "Let's start",
        backButton: "Back",
        nextQuestion: "Next Question",
        footerText: "This project was created for the e-Government Systems course. Students:",
        student1: "Andreas Manthopoulos", student2: "Athanasios Gewrgoulas", student3: "Aris Stergiou",
        modalTitle: "Disclaimer",
        modalBody: `
            <p>This online service is a research prototype developed by the University of Macedonia.</p>
            <p>The content, data, and results provided are experimental and provided "as is".</p>
            <p><strong>By using the service, the visitor fully accepts the above terms.</strong></p>
        `,
        eligible: "You are eligible for the subsidy!",
        notEligible: "You are not eligible",
        documentsTitle: "Required Documents:",
        errorChoose: "You must choose an answer",
        and: "and"
    }
};

var currentLanguage = localStorage.getItem("preferredLanguage") || "greek";

function toggleLanguage() {
    currentLanguage = (currentLanguage === "greek") ? "english" : "greek";
    localStorage.setItem("preferredLanguage", currentLanguage);
    updateContent();
}

function updateContent() {
    document.querySelectorAll(".language-component").forEach(function (component) {
        var componentName = component.dataset.component;
        if (languageContent[currentLanguage][componentName] !== undefined) {
        
            if (componentName === "modalBody") {
                component.innerHTML = languageContent[currentLanguage][componentName];
            } else {
                component.textContent = languageContent[currentLanguage][componentName];
            }
        }
    });
}

updateContent();