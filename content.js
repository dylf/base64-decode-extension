/**
 * Send a message 'updateContextMenu' when a selection changes.
 */
document.addEventListener('selectionchange', () => {
    var selected = window.getSelection().toString().trim();
    chrome.runtime.sendMessage({
        request: 'updateContextMenu',
        selection: selected
    });
});
