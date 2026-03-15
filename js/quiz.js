/* ==========================================================================
   quiz.js — Quiz engine
   Project: Sewing Learning Site

   Each quiz page defines a QUIZ_DATA constant and calls Quiz.init(QUIZ_DATA)
   ========================================================================== */

window.Quiz = (function () {
  'use strict';

  var _quizData = null;
  var _container = null;
  var _submitted = false;

  /* -----------------------------------------------------------------------
     Public: init
     ----------------------------------------------------------------------- */
  function init(quizData) {
    if (!quizData || !quizData.id || !Array.isArray(quizData.questions) || quizData.questions.length === 0) {
      console.error('Quiz.init: invalid quizData');
      return;
    }
    _quizData = quizData;
    _submitted = false;

    _container = document.getElementById('quiz-container');
    if (!_container) {
      console.error('Quiz.init: #quiz-container not found');
      return;
    }

    _render();
  }

  /* -----------------------------------------------------------------------
     Private: render the quiz form
     ----------------------------------------------------------------------- */
  function _render() {
    _submitted = false;
    _container.innerHTML = '';

    var form = document.createElement('form');
    form.id = 'quiz-form';
    form.setAttribute('novalidate', '');

    // Validation message region
    var validationMsg = document.createElement('div');
    validationMsg.id = 'quiz-validation-msg';
    validationMsg.className = 'quiz-validation-msg';
    validationMsg.setAttribute('role', 'alert');
    validationMsg.setAttribute('aria-live', 'assertive');
    form.appendChild(validationMsg);

    // Questions list
    var ol = document.createElement('ol');
    ol.className = 'quiz-questions';

    for (var i = 0; i < _quizData.questions.length; i++) {
      var q = _quizData.questions[i];
      ol.appendChild(_renderQuestion(q, i));
    }

    form.appendChild(ol);

    // Submit button
    var submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'btn btn--primary quiz-submit';
    submitBtn.textContent = 'Submit Quiz';
    form.appendChild(submitBtn);

    // Result card (hidden until submission)
    var resultCard = document.createElement('div');
    resultCard.id = 'quiz-result';
    resultCard.className = 'quiz-result';
    resultCard.setAttribute('role', 'status');
    resultCard.setAttribute('aria-live', 'assertive');
    form.appendChild(resultCard);

    form.addEventListener('submit', _handleSubmit);

    _container.appendChild(form);
  }

  /* -----------------------------------------------------------------------
     Private: render a single question
     ----------------------------------------------------------------------- */
  function _renderQuestion(q, index) {
    var li = document.createElement('li');
    li.className = 'quiz-question';
    li.dataset.questionIndex = index;

    var labelId = 'q' + index + '-label';

    var numSpan = document.createElement('span');
    numSpan.className = 'question-number';
    numSpan.textContent = 'Question ' + (index + 1) + ' of ' + _quizData.questions.length;
    li.appendChild(numSpan);

    var pText = document.createElement('p');
    pText.className = 'question-text';
    pText.id = labelId;
    pText.textContent = q.text;
    li.appendChild(pText);

    var fieldset = document.createElement('fieldset');
    fieldset.className = 'answer-group';
    fieldset.setAttribute('aria-labelledby', labelId);

    var legend = document.createElement('legend');
    legend.className = 'sr-only';
    legend.textContent = 'Choose an answer for question ' + (index + 1);
    fieldset.appendChild(legend);

    for (var j = 0; j < q.options.length; j++) {
      fieldset.appendChild(_renderOption(q, index, j));
    }
    li.appendChild(fieldset);

    // Explanation (hidden until after submission)
    var explanation = document.createElement('p');
    explanation.className = 'question-explanation';
    explanation.id = 'q' + index + '-explanation';
    explanation.textContent = q.explanation || '';
    li.appendChild(explanation);

    return li;
  }

  /* -----------------------------------------------------------------------
     Private: render an answer option
     ----------------------------------------------------------------------- */
  function _renderOption(q, questionIndex, optionIndex) {
    var label = document.createElement('label');
    label.className = 'answer-option';

    var input = document.createElement('input');
    input.type = 'radio';
    input.name = 'q' + questionIndex;
    input.value = optionIndex;
    input.id = 'q' + questionIndex + '-opt' + optionIndex;
    input.required = true;

    var span = document.createElement('span');
    span.className = 'answer-text';
    span.textContent = q.options[optionIndex];

    label.appendChild(input);
    label.appendChild(span);
    label.setAttribute('for', input.id);

    return label;
  }

  /* -----------------------------------------------------------------------
     Private: handle form submission
     ----------------------------------------------------------------------- */
  function _handleSubmit(e) {
    e.preventDefault();
    if (_submitted) return;

    var validationMsg = document.getElementById('quiz-validation-msg');

    // Validate: all questions answered
    var unanswered = [];
    for (var i = 0; i < _quizData.questions.length; i++) {
      var radios = document.querySelectorAll('input[name="q' + i + '"]');
      var answered = false;
      for (var r = 0; r < radios.length; r++) {
        if (radios[r].checked) { answered = true; break; }
      }
      if (!answered) unanswered.push(i + 1);
    }

    if (unanswered.length > 0) {
      validationMsg.textContent = 'Please answer all questions before submitting. (Missing: Question ' + unanswered.join(', ') + ')';
      validationMsg.classList.add('is-visible');
      validationMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }

    validationMsg.classList.remove('is-visible');
    _submitted = true;

    // Score
    var score = 0;
    for (var qi = 0; qi < _quizData.questions.length; qi++) {
      var q = _quizData.questions[qi];
      var selected = document.querySelector('input[name="q' + qi + '"]:checked');
      var selectedValue = selected ? parseInt(selected.value, 10) : -1;
      var isCorrect = selectedValue === q.correct;
      if (isCorrect) score++;

      _showQuestionFeedback(qi, selectedValue, q.correct, isCorrect);
    }

    var total = _quizData.questions.length;

    // Save score
    if (window.Progress && typeof window.Progress.saveQuizScore === 'function') {
      window.Progress.saveQuizScore(_quizData.id, score, total);
    }

    // Hide submit button
    var submitBtn = document.querySelector('.quiz-submit');
    if (submitBtn) submitBtn.style.display = 'none';

    // Show result card
    _showResult(score, total);
  }

  /* -----------------------------------------------------------------------
     Private: show per-question feedback after submission
     ----------------------------------------------------------------------- */
  function _showQuestionFeedback(questionIndex, selectedValue, correctValue, isCorrect) {
    var li = document.querySelector('.quiz-question[data-question-index="' + questionIndex + '"]');
    if (!li) return;

    li.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');

    // Disable all radios for this question
    var radios = li.querySelectorAll('input[type="radio"]');
    for (var r = 0; r < radios.length; r++) {
      radios[r].disabled = true;
    }

    // Style answer options
    var options = li.querySelectorAll('.answer-option');
    for (var o = 0; o < options.length; o++) {
      var input = options[o].querySelector('input');
      var idx = parseInt(input.value, 10);
      if (idx === correctValue) {
        options[o].classList.add('is-correct-answer');
      } else if (idx === selectedValue && !isCorrect) {
        options[o].classList.add('is-wrong-answer');
      }
    }

    // Show explanation
    var explanation = document.getElementById('q' + questionIndex + '-explanation');
    if (explanation) explanation.classList.add('is-visible');
  }

  /* -----------------------------------------------------------------------
     Private: show result card
     ----------------------------------------------------------------------- */
  function _showResult(score, total) {
    var passed = total > 0 && (score / total) >= 0.8;
    var resultCard = document.getElementById('quiz-result');
    if (!resultCard) return;

    resultCard.className = 'quiz-result is-visible ' + (passed ? 'quiz-result--pass' : 'quiz-result--fail');

    var scoreDiv = document.createElement('div');
    scoreDiv.className = 'result-score';
    scoreDiv.textContent = score + ' / ' + total;

    var labelDiv = document.createElement('div');
    labelDiv.className = 'result-label';
    labelDiv.textContent = passed ? 'Pass!' : 'Keep Practicing';

    var msgP = document.createElement('p');
    msgP.className = 'result-message';
    msgP.textContent = passed
      ? 'Well done! You\'ve passed this quiz.'
      : 'Review the lesson and try again — you can retake this quiz anytime.';

    var actionsDiv = document.createElement('div');
    actionsDiv.className = 'result-actions';

    var retryBtn = document.createElement('button');
    retryBtn.type = 'button';
    retryBtn.className = 'btn btn--secondary';
    retryBtn.id = 'retry-quiz-btn';
    retryBtn.textContent = 'Retake Quiz';
    retryBtn.addEventListener('click', function () {
      _render(); // Re-render resets the entire form
    });

    var homeLink = document.createElement('a');
    homeLink.href = '../index.html';
    homeLink.className = 'btn btn--ghost';
    homeLink.textContent = 'Back to Dashboard';

    actionsDiv.appendChild(retryBtn);
    actionsDiv.appendChild(homeLink);

    resultCard.innerHTML = '';
    resultCard.appendChild(scoreDiv);
    resultCard.appendChild(labelDiv);
    resultCard.appendChild(msgP);
    resultCard.appendChild(actionsDiv);

    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  return { init: init };
}());
