/* ==========================================================================
   progress.js — localStorage progress tracking module
   Project: Sewing Learning Site

   All localStorage reads/writes go through this module exclusively.
   No other file may call localStorage.setItem or localStorage.getItem directly.
   ========================================================================== */

window.Progress = (function () {
  'use strict';

  var STORAGE_KEY = 'sewingProgress';
  var SCHEMA_VERSION = 1;
  var TOTAL_LESSONS = 10;
  var PASS_THRESHOLD = 0.8; // 80%

  var _data = null;
  var _disabled = false;

  /* -----------------------------------------------------------------------
     Private: Check if localStorage is available
     ----------------------------------------------------------------------- */
  function _isAvailable() {
    try {
      var testKey = '__sewing_test__';
      localStorage.setItem(testKey, '1');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  /* -----------------------------------------------------------------------
     Private: Default data structure
     ----------------------------------------------------------------------- */
  function _defaultData() {
    return {
      version: SCHEMA_VERSION,
      lessons: {},
      quizScores: {},
      preferences: {
        theme: 'light'
      }
    };
  }

  /* -----------------------------------------------------------------------
     Private: Read from localStorage
     ----------------------------------------------------------------------- */
  function _read() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return _defaultData();
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return _defaultData();
      // Version migration: if version missing or wrong, reset to default
      if (parsed.version !== SCHEMA_VERSION) {
        console.warn('Progress: schema version mismatch — resetting to default.');
        return _defaultData();
      }
      // Ensure required keys exist
      if (!parsed.lessons || typeof parsed.lessons !== 'object') parsed.lessons = {};
      if (!parsed.quizScores || typeof parsed.quizScores !== 'object') parsed.quizScores = {};
      if (!parsed.preferences || typeof parsed.preferences !== 'object') parsed.preferences = { theme: 'light' };
      return parsed;
    } catch (e) {
      console.warn('Progress: error reading localStorage —', e.message);
      return _defaultData();
    }
  }

  /* -----------------------------------------------------------------------
     Private: Write to localStorage
     ----------------------------------------------------------------------- */
  function _write(data) {
    if (_disabled) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Progress: error writing localStorage —', e.message);
    }
  }

  /* -----------------------------------------------------------------------
     Public API
     ----------------------------------------------------------------------- */
  var api = {};

  /* Initialize — MUST be called on DOMContentLoaded */
  api.init = function () {
    _disabled = !_isAvailable();
    if (_disabled) {
      console.warn('Progress: localStorage unavailable. Progress will not be saved.');
      _data = _defaultData();
      return;
    }
    _data = _read();
    // Write back immediately to ensure schema is current
    _write(_data);
  };

  /* Returns true if localStorage is accessible */
  api.isAvailable = function () {
    return !_disabled;
  };

  /* -----------------------------------------------------------------------
     Lesson Methods
     ----------------------------------------------------------------------- */

  /* Mark a lesson complete */
  api.markLessonComplete = function (lessonId) {
    if (!lessonId || typeof lessonId !== 'string') return;
    if (!_data) api.init();
    _data.lessons[lessonId] = {
      completed: true,
      completedAt: Date.now()
    };
    _write(_data);
  };

  /* Mark a lesson incomplete (undo) */
  api.markLessonIncomplete = function (lessonId) {
    if (!lessonId || typeof lessonId !== 'string') return;
    if (!_data) api.init();
    _data.lessons[lessonId] = {
      completed: false,
      completedAt: null
    };
    _write(_data);
  };

  /* Returns true if lesson is marked complete */
  api.isLessonComplete = function (lessonId) {
    if (!_data) api.init();
    var lesson = _data.lessons[lessonId];
    return !!(lesson && lesson.completed === true);
  };

  /* Returns { completed, completedAt } or null */
  api.getLessonData = function (lessonId) {
    if (!_data) api.init();
    return _data.lessons[lessonId] || null;
  };

  /* Returns full lessons object */
  api.getAllLessons = function () {
    if (!_data) api.init();
    return _data.lessons;
  };

  /* Returns count of completed lessons */
  api.getCompletedCount = function () {
    if (!_data) api.init();
    var count = 0;
    var lessons = _data.lessons;
    for (var id in lessons) {
      if (lessons.hasOwnProperty(id) && lessons[id] && lessons[id].completed) {
        count++;
      }
    }
    return count;
  };

  /* Returns total lesson count */
  api.getTotalLessons = function () {
    return TOTAL_LESSONS;
  };

  /* -----------------------------------------------------------------------
     Quiz Methods
     ----------------------------------------------------------------------- */

  /* Save a quiz score. Passed = score/total >= PASS_THRESHOLD */
  api.saveQuizScore = function (quizId, score, total) {
    if (!quizId || typeof quizId !== 'string') return;
    if (!_data) api.init();
    _data.quizScores[quizId] = {
      score: score,
      total: total,
      takenAt: Date.now(),
      passed: total > 0 && (score / total) >= PASS_THRESHOLD
    };
    _write(_data);
  };

  /* Returns { score, total, takenAt, passed } or null */
  api.getQuizScore = function (quizId) {
    if (!_data) api.init();
    return _data.quizScores[quizId] || null;
  };

  /* Returns true if quiz was passed */
  api.hasPassedQuiz = function (quizId) {
    var scoreData = api.getQuizScore(quizId);
    return !!(scoreData && scoreData.passed);
  };

  /* -----------------------------------------------------------------------
     Export / Import
     ----------------------------------------------------------------------- */

  /* Returns a JSON string of the full progress store */
  api.exportProgress = function () {
    if (!_data) api.init();
    try {
      return JSON.stringify(_data, null, 2);
    } catch (e) {
      console.warn('Progress: export failed —', e.message);
      return null;
    }
  };

  /* Validates and restores progress from a JSON string.
     Throws an Error with a descriptive message on invalid input.
     On success: overwrites localStorage and reloads the page. */
  api.importProgress = function (jsonString) {
    if (!jsonString || typeof jsonString !== 'string') {
      throw new Error('No data provided. Please select a valid sewing-progress.json file.');
    }

    var parsed;
    try {
      parsed = JSON.parse(jsonString);
    } catch (e) {
      throw new Error('File is not valid JSON. Please use a file exported from this site.');
    }

    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Invalid file format. Expected an object.');
    }
    if (parsed.version !== SCHEMA_VERSION) {
      throw new Error('File version is not compatible (expected version ' + SCHEMA_VERSION + ').');
    }
    if (typeof parsed.lessons !== 'object' || Array.isArray(parsed.lessons)) {
      throw new Error('Invalid file format: missing lessons data.');
    }
    if (typeof parsed.quizScores !== 'object' || Array.isArray(parsed.quizScores)) {
      throw new Error('Invalid file format: missing quiz scores data.');
    }

    // Valid — write and reload
    _data = parsed;
    _write(_data);
    window.location.reload();
  };

  /* -----------------------------------------------------------------------
     Preferences
     ----------------------------------------------------------------------- */

  api.getPreference = function (key) {
    if (!_data) api.init();
    return _data.preferences[key];
  };

  api.setPreference = function (key, value) {
    if (!_data) api.init();
    _data.preferences[key] = value;
    _write(_data);
  };

  /* -----------------------------------------------------------------------
     Clear Progress (wipes all data — used by clear button)
     ----------------------------------------------------------------------- */

  /* Wipes the entire progress store. Callers must confirm with the user first. */
  api.clearProgress = function () {
    _data = _defaultData();
    _write(_data);
  };

  return api;
}());
