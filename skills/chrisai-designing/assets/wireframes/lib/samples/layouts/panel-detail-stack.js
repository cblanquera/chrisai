(function () {
  var articles = {
    'article-1': {
      title: 'Designing resilient review workflows',
      status: 'Published',
      updated: 'Today, 9:42 AM',
      authorId: 'author-1',
      summary: 'A practical framework for keeping review queues clear without losing important context.'
    },
    'article-2': {
      title: 'A field guide to content operations',
      status: 'Draft',
      updated: 'Yesterday, 4:10 PM',
      authorId: 'author-2',
      summary: 'How editorial teams can organize ownership, handoffs, and recurring publishing work.'
    },
    'article-3': {
      title: 'Measuring knowledge-base quality',
      status: 'Review',
      updated: 'Jul 9, 2:15 PM',
      authorId: 'author-1',
      summary: 'Signals that reveal whether support content is accurate, discoverable, and actionable.'
    },
    'article-4': {
      title: 'Planning a documentation migration',
      status: 'Published',
      updated: 'Jul 8, 11:20 AM',
      authorId: 'author-3',
      summary: 'A staged migration approach for preserving links, ownership, and editorial confidence.'
    }
  };

  var authors = {
    'author-1': { name: 'Mara Chen', email: 'mara@example.test', role: 'Senior editor', bio: 'Leads editorial systems and knowledge-quality programs.' },
    'author-2': { name: 'Jon Bell', email: 'jon@example.test', role: 'Content operations', bio: 'Builds practical workflows for distributed publishing teams.' },
    'author-3': { name: 'Priya Shah', email: 'priya@example.test', role: 'Documentation lead', bio: 'Plans large documentation systems and platform migrations.' }
  };

  var stack = document.querySelector('#article-detail-panel');
  var currentArticleId = 'article-1';
  var currentAuthorId = articles[currentArticleId].authorId;

  function closeSelectedArticle(event) {
    var trigger = event.target.closest('[data-article-id][data-wf-detail-open]');
    var shell = trigger && trigger.closest('[data-wf-panel-layout]');
    if (!trigger || !shell || !trigger.hasAttribute('data-wf-detail-selected') || shell.getAttribute('data-wf-right-open') !== 'true') return false;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.WireframePanelDetailStack.close(stack);
    return true;
  }

  document.addEventListener('click', closeSelectedArticle, true);
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') closeSelectedArticle(event);
  }, true);

  function text(selector, value) {
    var node = stack.querySelector(selector);
    if (node) node.textContent = value;
  }

  function renderAuthor(authorId) {
    var author = authors[authorId];
    if (!author) return;
    currentAuthorId = authorId;
    text('[data-sample-author-name]', author.name);
    text('[data-sample-author-email]', author.email);
    text('[data-sample-author-role]', author.role);
    text('[data-sample-author-bio]', author.bio);
    var form = stack.querySelector('#sample-author-form');
    form.elements.name.value = author.name;
    form.elements.email.value = author.email;
    form.elements.role.value = author.role;
    form.elements.bio.value = author.bio;
    var remove = stack.querySelector('[data-sample-remove-author]');
    remove.disabled = false;
    remove.innerHTML = (window.WireframeIcons ? window.WireframeIcons.svg('trash') : '') + 'Remove';
  }

  function renderArticle(articleId) {
    var article = articles[articleId];
    if (!article) return;
    currentArticleId = articleId;
    text('[data-sample-article-title]', article.title);
    text('[data-sample-article-status]', article.status);
    text('[data-sample-article-updated]', article.updated);
    text('[data-sample-article-summary]', article.summary);
    renderAuthor(article.authorId);
    text('[data-sample-article-author]', authors[article.authorId].name);
  }

  stack.addEventListener('wf:detail-open', function (event) {
    var trigger = event.detail.trigger;
    if (trigger && trigger.dataset.articleId) renderArticle(trigger.dataset.articleId);
  });

  stack.addEventListener('wf:detail-submit', function (event) {
    if (event.detail.form.id !== 'sample-author-form') return;
    var form = event.detail.form;
    var author = authors[currentAuthorId];
    author.name = form.elements.name.value;
    author.email = form.elements.email.value;
    author.role = form.elements.role.value;
    author.bio = form.elements.bio.value;
    renderAuthor(currentAuthorId);
    text('[data-sample-article-author]', author.name);
    Array.prototype.forEach.call(document.querySelectorAll('[data-row-author="' + currentAuthorId + '"]'), function (cell) {
      cell.textContent = author.name;
    });
    if (window.WireframeNotifier) {
      window.WireframeNotifier.show({ title: 'Author updated', body: author.name + ' was saved.' });
    }
  });

  stack.addEventListener('click', function (event) {
    var remove = event.target.closest('[data-sample-remove-author]');
    if (!remove) return;
    remove.disabled = true;
    remove.textContent = 'Removed';
    text('[data-sample-author-role]', 'Removed from workspace');
    if (window.WireframeNotifier) {
      window.WireframeNotifier.show({ title: 'Author removed', body: authors[currentAuthorId].name + ' was removed from this workspace.' });
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    renderArticle(currentArticleId);
  });
})();
