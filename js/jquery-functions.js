$("document").ready(function () {
  var currentQuestionId = 0; 
  var totalQuestions = 0;
  var all_questions;
  var all_questions_en;
  var faq;
  var faq_en;

  var historyStack = []; 
  var userAnswers = {}; 

  // UI HELPERS
  function hideFormBtns() {
    $("#nextQuestion").hide();
    $("#backButton").hide();
  }

  function updateProgress() {
    const progress = ((currentQuestionId + 1) / totalQuestions) * 100;
    $("#progress-bar").css("width", progress + "%");
  }

  function triggerUpdateContent() {
    if (typeof updateContent === "function") {
      updateContent();
    }
  }

  // FETCH
  function getQuestions() {
    return fetch("question-utils/all-questions.json")
      .then(res => res.json())
      .then(data => {
        all_questions = data.questions;
        totalQuestions = all_questions.length;

        return fetch("question-utils/all-questions-en.json")
          .then(res => res.json())
          .then(dataEn => {
            all_questions_en = dataEn.questions;
          });
      });
  }

  function getFaq() {
    return fetch("question-utils/faq.json")
      .then(res => res.json())
      .then(data => {
        faq = data;
        return fetch("question-utils/faq-en.json")
          .then(res => res.json())
          .then(dataEn => {
            faq_en = dataEn;
          });
      });
  }

  // FAQ 
  function convertURLsToLinks(text) {
    return text.replace(
      /https:\/\/www\.gov\.gr\/[\S]+/g,
      '<a href="$&" target="_blank">gov.gr</a>'
    );
  }

  function loadFaqs() {
    if (!faq || !faq_en) return;
    var faqData = currentLanguage === "greek" ? faq : faq_en;
    var title = currentLanguage === "greek" ? "Συχνές Ερωτήσεις" : "Frequently Asked Questions";

    var container = document.createElement("div");
    container.innerHTML = `<div class="govgr-heading-m">${title}</div>`;

    faqData.forEach(item => {
      var section = document.createElement("details");
      section.className = "govgr-accordion__section";
      section.innerHTML = `
        <summary class="govgr-accordion__section-summary">
          <h2 class="govgr-accordion__section-heading">
            <span class="govgr-accordion__section-button">${item.question}</span>
          </h2>
        </summary>
        <div class="govgr-accordion__section-content">
          <p class="govgr-body">${convertURLsToLinks(item.answer)}</p>
        </div>`;
      container.appendChild(section);
    });
    $(".faqContainer").html(container);
  }

  // STRICT SCHEMA
  function loadQuestion(id, noError) {
    $("#nextQuestion").show();
    
    if (historyStack.length > 0) {
      $("#backButton").show(); 
    } else {
      $("#backButton").hide();
    }

    let questionsSource = currentLanguage === "greek" ? all_questions : all_questions_en;
    let question = questionsSource.find(q => q.id === id);

    if (!question) return;

    let errorHtml = !noError ? `
        <p class='govgr-error-message'>
            <span class='govgr-visually-hidden'>Λάθος:</span>
            ${languageContent[currentLanguage].errorChoose}
        </p>` : "";


    let previousAnswerIndex = userAnswers[id] ? userAnswers[id].index : -1;

    let html = `
      <div style="display: flex; justify-content: center; width: 100%;">
        <div style="max-width: 600px; width: 100%; text-align: left;">
          <div class='govgr-field ${noError ? "" : "govgr-field__error"}' id='radios-${id}-error'>
            <fieldset class='govgr-fieldset' aria-describedby='radio-country'>
              <legend role='heading' aria-level='1' class='govgr-fieldset__legend govgr-heading-l' style="text-align: center; margin-bottom: 30px;">
                ${question.question_text}
              </legend>
              ${errorHtml}
              <div class='govgr-radios' id='radios-${id}'>
                <ul>
                  ${question.options.map((opt, i) => `
                    <div class='govgr-radios__item'>
                      <label class='govgr-label govgr-radios__label'>
                        ${opt.option_text}
                        <input class='govgr-radios__input' type='radio' name='question-option' value='${i}' ${previousAnswerIndex == i ? "checked" : ""} />
                      </label>
                    </div>
                  `).join("")}
                </ul>
              </div>
            </fieldset>
          </div>
        </div>
      </div>`;

    $(".question-container").html(html);
    updateProgress();
    triggerUpdateContent();
  }

  function setResult(text) {
    const resultWrapper = document.getElementById("resultWrapper");
    const result = document.createElement("p");
    result.className = "govgr-body";
    result.style.marginBottom = "5px";
    result.style.fontWeight = "bold";
    result.textContent = text;
    resultWrapper.appendChild(result);
  }

  function retrieveCustomMessages() {

    if (userAnswers[2] && userAnswers[2].index === 1) { 
        currentLanguage === "greek" 
            ? setResult("Επειδή επιλέξατε Leasing, απαιτείται η σύμβαση αντί για απόδειξη αγοράς.") 
            : setResult("Since you selected Leasing, the leasing contract is required instead of the proof of purchase.");
    }

    if (userAnswers[3] && userAnswers[3].index === 0) {
        currentLanguage === "greek" 
            ? setResult("Δικαιούστε έξτρα επιδότηση λόγω της απόσυρσης του παλαιού σας οχήματος.") 
            : setResult("You are entitled to an extra subsidy due to the scrapping of your old vehicle.");
    }
 
    if (userAnswers[5] && userAnswers[5].index === 0) {
        currentLanguage === "greek" 
            ? setResult("Δικαιούστε έξτρα επιδότηση 500€ για την αγορά έξυπνου φορτιστή.") 
            : setResult("You are entitled to an extra subsidy of 500€ for purchasing a smart charger.");
    }
 
    if (userAnswers[6] && userAnswers[6].index === 0) {
        currentLanguage === "greek" 
            ? setResult("Δικαιούστε επιδότηση για την έξτρα μπαταρία του δικύκλου/ποδηλάτου σας.") 
            : setResult("You are entitled to a subsidy for the extra battery of your two-wheeler/bicycle.");
    }

    if (userAnswers[7] && userAnswers[7].index === 0) {
        currentLanguage === "greek" 
            ? setResult("Δικαιούστε προσαύξηση 4.000€ λόγω μόνιμης κατοικίας σε Νησιωτικό Δήμο.") 
            : setResult("You are entitled to a 4,000€ bonus due to permanent residence in an Island Municipality.");
    }
  }

  function skipToEnd(reason) {
    $(".question-container").html(`
      <div class="govgr-error-summary" role="alert">
        <h2 class="govgr-error-summary__title">${languageContent[currentLanguage].notEligible}</h2>
        <div class="govgr-error-summary__body"><p>${reason}</p></div>
      </div>`);
    hideFormBtns();
    $("#backButton").show();
    triggerUpdateContent();
  }

  
  function showFinalResult() {
    const container = $(".question-container");
    const titleText = currentLanguage === "greek" ? "Είστε δικαιούχος επιδότησης!" : "You are eligible for the subsidy!";
    const subtitleText = currentLanguage === "greek" ? "Τα δικαιολογητικά που πρέπει να επισυνάψετε στην αίτησή σας είναι τα εξής:" : "The documents you need to provide are the following:";

    container.html(`
      <div style="display: flex; justify-content: center; width: 100%;">
        <div style="max-width: 650px; width: 100%; text-align: left;">
          <h1 class="govgr-heading-l" style="margin-bottom: 10px;">${titleText}</h1>
          <div id="resultWrapper" style="margin-bottom: 30px;"></div>
          <h4 class="govgr-heading-s" style="margin-bottom: 20px;">${subtitleText}</h4>
          
          <ol id="evidences"></ol> 
        </div>
      </div>
    `);
    

    retrieveCustomMessages();


    let finalEvidences = [];
    let allAnsweredIds = [...historyStack, currentQuestionId];
    
    allAnsweredIds.forEach(qId => {
        let ans = userAnswers[qId];
        if (ans && ans.option && ans.option.evidences) {
            ans.option.evidences.forEach(ev => {
                if (!finalEvidences.find(e => e.id === ev.id)) finalEvidences.push(ev);
            });
        }
    });

    const list = $("#evidences");
    finalEvidences.forEach(ev => {
      list.append(`<li>${ev.required_evidence}</li>`);
    });
    
    hideFormBtns();
    $("#backButton").show(); 
    triggerUpdateContent();
  }


  $("#nextQuestion").off("click").on("click", function () {

    let selectedVal = $("input[name='question-option']:checked").val();

    if (selectedVal === undefined) {
      loadQuestion(currentQuestionId, false);
      return;
    }

    let selectedIndex = parseInt(selectedVal, 10);
    let questionsSource = currentLanguage === "greek" ? all_questions : all_questions_en;
    let question = questionsSource.find(q => q.id === currentQuestionId);
    let selectedOption = question.options[selectedIndex];


    userAnswers[currentQuestionId] = { index: selectedIndex, option: selectedOption };
    

    historyStack.push(currentQuestionId);


    if (selectedOption.terminate) {
      skipToEnd(selectedOption.termination_reason);
      return;
    }


    if (selectedOption.next_step === null) {
      showFinalResult();
    } else {
      currentQuestionId = selectedOption.next_step;
      loadQuestion(currentQuestionId, true);
    }
  });


  $("#backButton").off("click").on("click", function (e) {
      e.preventDefault();
      if (historyStack.length > 0) {
          currentQuestionId = historyStack.pop();
          loadQuestion(currentQuestionId, true);
      }
  });

  $("#languageBtn").click(function () {
    if (typeof toggleLanguage === "function") toggleLanguage();
    loadFaqs();
    loadQuestion(currentQuestionId, true);
    triggerUpdateContent();
  });

  $("#startBtn").click(function () {
    $("#intro").hide();
    $("#languageBtn").hide();
    $("#questions-btns").show();
  });

  // INIT
  $("#questions-btns").hide();

  getQuestions()
    .then(() => getFaq())
    .then(() => {
      loadFaqs();
      $("#faqContainer").show();
      loadQuestion(currentQuestionId, true);
      triggerUpdateContent();
    });
});