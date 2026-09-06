(function () {
  function init(root) {
    root = root || document;
    if (window.WireframeIcons) window.WireframeIcons.render(root);
    if (window.WireframeAccordion) window.WireframeAccordion.init(root);
    if (window.WireframeAssignmentManager) window.WireframeAssignmentManager.init(root);
    if (window.WireframeCategoryManager) window.WireframeCategoryManager.init(root);
    if (window.WireframeCarousel) window.WireframeCarousel.init(root);
    if (window.WireframeDialog) window.WireframeDialog.init(root);
    if (window.WireframeDateRange) window.WireframeDateRange.init(root);
    if (window.WireframeDateTimeField) window.WireframeDateTimeField.init(root);
    if (window.WireframeDropdown) window.WireframeDropdown.init(root);
    if (window.WireframeDetailPanel) window.WireframeDetailPanel.init(root);
    if (window.WireframeDiagramCanvas) window.WireframeDiagramCanvas.init(root);
    if (window.WireframeFileExplorer) window.WireframeFileExplorer.init(root);
    if (window.WireframeFormBuilder) window.WireframeFormBuilder.init(root);
    if (window.WireframeImportMapper) window.WireframeImportMapper.init(root);
    if (window.WireframeMindMap) window.WireframeMindMap.init(root);
    if (window.WireframeMobileShell) window.WireframeMobileShell.init(root);
    if (window.WireframeNotifier) window.WireframeNotifier.init(root);
    if (window.WireframePanelLayout) window.WireframePanelLayout.init(root);
    if (window.WireframePanelDetailStack) window.WireframePanelDetailStack.init(root);
    if (window.WireframePasswordField) window.WireframePasswordField.init(root);
    if (window.WireframeRange) window.WireframeRange.init(root);
    if (window.WireframeRating) window.WireframeRating.init(root);
    if (window.WireframeSectionedForm) window.WireframeSectionedForm.init(root);
    if (window.WireframeScheduler) window.WireframeScheduler.init(root);
    if (window.WireframeTagsInput) window.WireframeTagsInput.init(root);
    if (window.WireframeTabs) window.WireframeTabs.init(root);
    if (window.WireframeTree) window.WireframeTree.init(root);
    if (window.WireframeTooltip) window.WireframeTooltip.init(root);
    if (window.WireframeWysiwyg) window.WireframeWysiwyg.init(root);
    if (window.WireframeWorkflow) window.WireframeWorkflow.init(root);
  }

  window.WireframeInteractions = { init: init };
  document.addEventListener('DOMContentLoaded', function () { init(document); });
})();
