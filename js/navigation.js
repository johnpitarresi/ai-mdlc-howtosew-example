/* ==========================================================================
   navigation.js — Page navigation, sidebar state, dashboard updates,
                   export/import progress handlers
   Project: Sewing Learning Site
   ========================================================================== */

(function () {
  'use strict';

  /* -----------------------------------------------------------------------
     Initialize on DOM ready
     ----------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    // Progress must be initialized first (script order: progress.js before navigation.js)
    if (window.Progress && typeof window.Progress.init === 'function') {
      window.Progress.init();
    }

    var pageType = document.body.dataset.page || '';
    var lessonId = document.body.dataset.lessonId || '';

    updateSidebarProgress();
    setActiveSidebarLink();
    initMobileNav();
    initExportImport();

    if (pageType === 'dashboard') {
      initDashboard();
    } else if (pageType === 'lesson' && lessonId) {
      initLesson(lessonId);
    }
  });

  /* -----------------------------------------------------------------------
     updateSidebarProgress
     Updates the sidebar progress bar and lesson completion icons
     ----------------------------------------------------------------------- */
  function updateSidebarProgress() {
    if (!window.Progress) return;

    var completed = window.Progress.getCompletedCount();
    var total = window.Progress.getTotalLessons();
    var pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Progress bar
    var fill = document.querySelector('.sidebar-progress-fill');
    var bar = document.querySelector('.sidebar-progress-bar');
    var text = document.querySelector('.sidebar-progress-text');

    if (fill) fill.style.width = pct + '%';
    if (bar) {
      bar.setAttribute('aria-valuenow', completed);
      bar.setAttribute('aria-label', completed + ' of ' + total + ' lessons complete');
    }
    if (text) text.textContent = completed + ' / ' + total + ' lessons';

    // Lesson status icons in sidebar
    var links = document.querySelectorAll('.sidebar-link[data-lesson-id]');
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var id = link.dataset.lessonId;
      var icon = link.querySelector('.lesson-status-icon');
      if (icon) {
        if (window.Progress.isLessonComplete(id)) {
          icon.textContent = '✓';
          link.classList.add('is-complete');
        } else {
          icon.textContent = '○';
          link.classList.remove('is-complete');
        }
      }
    }
  }

  /* -----------------------------------------------------------------------
     setActiveSidebarLink
     Marks the current page link with aria-current="page"
     ----------------------------------------------------------------------- */
  function setActiveSidebarLink() {
    var currentPath = window.location.pathname.replace(/\\/g, '/');
    // Extract filename
    var currentFile = currentPath.split('/').pop();

    var links = document.querySelectorAll('.sidebar-link');
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var href = link.getAttribute('href') || '';
      var linkFile = href.split('/').pop();

      if (linkFile && currentFile && linkFile === currentFile) {
        link.setAttribute('aria-current', 'page');
        link.classList.add('is-active');
      } else {
        link.removeAttribute('aria-current');
        link.classList.remove('is-active');
      }
    }

    // Special case: index.html / root
    if (currentFile === 'index.html' || currentFile === '') {
      var homeLink = document.querySelector('.sidebar-link[href="./index.html"], .sidebar-link[href="../index.html"], .sidebar-link[href="index.html"]');
      if (homeLink) {
        homeLink.setAttribute('aria-current', 'page');
      }
    }
  }

  /* -----------------------------------------------------------------------
     initMobileNav
     Hamburger menu toggle
     ----------------------------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var sidebar = document.querySelector('#sidebar-nav');
    if (!toggle || !sidebar) return;

    toggle.addEventListener('click', function () {
      var isOpen = sidebar.classList.contains('is-open');
      if (isOpen) {
        sidebar.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        sidebar.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebar.classList.contains('is-open')) {
        sidebar.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (
        sidebar.classList.contains('is-open') &&
        !sidebar.contains(e.target) &&
        e.target !== toggle &&
        !toggle.contains(e.target)
      ) {
        sidebar.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* -----------------------------------------------------------------------
     initDashboard
     Updates the dashboard lesson cards and master progress bar
     ----------------------------------------------------------------------- */
  function initDashboard() {
    if (!window.Progress || !window.LESSONS_DATA) return;

    var completed = window.Progress.getCompletedCount();
    var total = window.Progress.getTotalLessons();
    var pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Master progress bar
    var fill = document.querySelector('.master-progress-fill');
    var bar = document.querySelector('.master-progress-bar');
    var countEl = document.querySelector('.progress-count');

    if (fill) fill.style.width = pct + '%';
    if (bar) {
      bar.setAttribute('aria-valuenow', completed);
      bar.setAttribute('aria-label', completed + ' of ' + total + ' lessons complete');
    }
    if (countEl) countEl.textContent = completed + ' / ' + total + ' lessons complete';

    // Update lesson cards
    var cards = document.querySelectorAll('.lesson-card');
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var lessonId = card.dataset.lessonId;
      if (!lessonId) continue;

      var isComplete = window.Progress.isLessonComplete(lessonId);
      var badge = card.querySelector('.completion-badge');
      var btn = card.querySelector('.lesson-card-btn');

      if (isComplete) {
        card.classList.add('lesson-card--complete');
        if (badge) badge.style.display = 'inline-flex';
        if (btn) btn.textContent = 'Review';
        card.setAttribute('aria-label', card.getAttribute('data-title') + ' — complete');
      } else {
        card.classList.remove('lesson-card--complete');
        if (badge) badge.style.display = 'none';
        if (btn) btn.textContent = 'Start Lesson';
        card.setAttribute('aria-label', card.getAttribute('data-title') + ' — not started');
      }

      // Quiz score badge
      var lesson = null;
      for (var j = 0; j < window.LESSONS_DATA.length; j++) {
        if (window.LESSONS_DATA[j].id === lessonId) {
          lesson = window.LESSONS_DATA[j];
          break;
        }
      }
      if (lesson && lesson.hasQuiz) {
        var quizId = lesson.quiz ? lesson.quiz.replace('quiz/', '').replace('.html', '') : null;
        if (quizId) {
          var scoreData = window.Progress.getQuizScore(quizId);
          var quizBadge = card.querySelector('.quiz-score-badge');
          if (scoreData && quizBadge) {
            quizBadge.textContent = scoreData.score + '/' + scoreData.total + (scoreData.passed ? ' ✓' : '');
            quizBadge.style.display = 'inline-block';
          }
        }
      }
    }
  }

  /* -----------------------------------------------------------------------
     initLesson
     Sets up the Mark Complete button and progress dot strip on lesson pages
     ----------------------------------------------------------------------- */
  function initLesson(lessonId) {
    if (!window.Progress) return;

    // Progress dot strip
    renderProgressDots(lessonId);

    // Mark Complete button
    var btn = document.querySelector('.btn-complete[data-lesson-id]');
    if (!btn) return;

    var liveRegion = document.querySelector('.complete-note');

    // Set initial state
    var alreadyComplete = window.Progress.isLessonComplete(lessonId);
    if (alreadyComplete) {
      _setCompleteState(btn, liveRegion, false);
    }

    btn.addEventListener('click', function () {
      if (btn.classList.contains('btn-complete--done')) return;
      window.Progress.markLessonComplete(lessonId);
      _setCompleteState(btn, liveRegion, true);
      updateSidebarProgress();
    });
  }

  function _setCompleteState(btn, liveRegion, announce) {
    btn.classList.add('btn-complete--done');
    var textEl = btn.querySelector('.btn-complete-text');
    if (textEl) textEl.textContent = 'Completed';
    btn.setAttribute('aria-label', 'Lesson marked complete');
    if (liveRegion && announce) {
      liveRegion.textContent = 'Lesson marked complete. Great work!';
    } else if (liveRegion && !announce) {
      liveRegion.textContent = 'You completed this lesson previously.';
    }
  }

  /* -----------------------------------------------------------------------
     renderProgressDots
     Renders the 10-dot lesson strip on lesson pages
     ----------------------------------------------------------------------- */
  function renderProgressDots(currentLessonId) {
    var container = document.querySelector('.lesson-dots');
    if (!container || !window.LESSONS_DATA || !window.Progress) return;

    container.innerHTML = '';
    for (var i = 0; i < window.LESSONS_DATA.length; i++) {
      var lesson = window.LESSONS_DATA[i];
      var dot = document.createElement('span');
      dot.className = 'lesson-dot';
      dot.setAttribute('aria-hidden', 'true');
      dot.setAttribute('title', 'Lesson ' + lesson.order + ': ' + lesson.title);

      if (window.Progress.isLessonComplete(lesson.id)) {
        dot.classList.add('is-complete');
      } else if (lesson.id === currentLessonId) {
        dot.classList.add('is-current');
      }
      container.appendChild(dot);
    }
  }

  /* -----------------------------------------------------------------------
     initExportImport
     Attaches export and import handlers to footer buttons
     ----------------------------------------------------------------------- */
  function initExportImport() {
    var exportBtn = document.getElementById('export-progress-btn');
    var importBtn = document.getElementById('import-progress-btn');

    if (exportBtn) {
      exportBtn.addEventListener('click', handleExport);
    }
    if (importBtn) {
      importBtn.addEventListener('click', handleImport);
    }
  }

  function handleExport() {
    if (!window.Progress) return;
    var json = window.Progress.exportProgress();
    if (!json) {
      _showFooterMessage('Export failed. Please try again.', true);
      return;
    }
    try {
      var blob = new Blob([json], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'sewing-progress.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      _showFooterMessage('Progress exported as sewing-progress.json');
    } catch (e) {
      _showFooterMessage('Export failed: ' + e.message, true);
    }
  }

  function handleImport() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.setAttribute('aria-hidden', 'true');
    input.style.position = 'absolute';
    input.style.left = '-9999px';
    document.body.appendChild(input);

    input.addEventListener('change', function () {
      var file = input.files[0];
      if (!file) {
        document.body.removeChild(input);
        return;
      }
      var reader = new FileReader();
      reader.onload = function (e) {
        try {
          _showFooterMessage('Importing progress…');
          window.Progress.importProgress(e.target.result);
          // importProgress calls window.location.reload() on success
        } catch (err) {
          _showFooterMessage('Import failed: ' + err.message, true);
        } finally {
          if (input.parentNode) document.body.removeChild(input);
        }
      };
      reader.onerror = function () {
        _showFooterMessage('Could not read file. Please try again.', true);
        if (input.parentNode) document.body.removeChild(input);
      };
      reader.readAsText(file);
    });

    input.click();
  }

  function _showFooterMessage(msg, isError) {
    var note = document.querySelector('.footer-note');
    if (!note) return;
    note.textContent = msg;
    note.style.color = isError ? 'var(--color-error)' : 'var(--color-success)';
    // Reset after 5 seconds
    setTimeout(function () {
      note.textContent = 'Progress is saved in your browser. Export to keep a backup.';
      note.style.color = '';
    }, 5000);
  }

}());
