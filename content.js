// content.js
console.log("Google Sheets Link Preview Disabler: v1.4 Active");

const SHOW_PREVIEWS_CLASS = 'show-link-previews';
const DETECTED_POPUP_CLASS = 'detected-link-popup';
const EXTENSION_DISABLED_CLASS = 'extension-disabled';

// --- State Management ---
function updateState(isEnabled) {
    if (isEnabled) {
        console.log("Extension Enabled");
        document.body.classList.remove(EXTENSION_DISABLED_CLASS);
    } else {
        console.log("Extension Disabled");
        document.body.classList.add(EXTENSION_DISABLED_CLASS);
    }
}

// Initial Load
chrome.storage.local.get(['extensionEnabled'], function (result) {
    // Default to true if undefined
    updateState(result.extensionEnabled !== false);
});

// Listen for changes
chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (namespace === 'local' && changes.extensionEnabled) {
        updateState(changes.extensionEnabled.newValue);
    }
});


// --- Ctrl Key Logic ---
function handleKeyChange(e) {
    if (e.repeat) return;
    if (e.key === 'Control') {
        if (e.type === 'keydown') {
            document.body.classList.add(SHOW_PREVIEWS_CLASS);
        } else if (e.type === 'keyup') {
            document.body.classList.remove(SHOW_PREVIEWS_CLASS);
        }
    }
}
document.addEventListener('keydown', handleKeyChange, true);
document.addEventListener('keyup', handleKeyChange, true);


// --- Mutation Observer (Always runs to tag elements, CSS handles visibility) ---
function isLinkPreview(node) {
    if (!node || node.nodeType !== 1) return false;
    const className = typeof node.className === 'string' ? node.className : (node.className.baseVal || '');
    const id = node.id || '';

    if (className.includes('waffle-multilink-tooltip') ||
        id === 'docs-link-bubble' ||
        className.includes('docs-link-bubble-card') ||
        className.includes('docs-smart-chip-hover-bubble') ||
        className.includes('appsElementsLinkPreview')) {
        return true;
    }
    if (node.querySelector && (
        node.querySelector('.waffle-multilink-tooltip') ||
        node.querySelector('.appsElementsLinkPreviewBaseRoot')
    )) {
        return true;
    }
    return false;
}

const observer = new MutationObserver((mutations) => {
    requestAnimationFrame(() => {
        for (const mutation of mutations) {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach((node) => {
                    if (isLinkPreview(node)) {
                        node.classList.add(DETECTED_POPUP_CLASS);
                    } else if (node.nodeType === 1) {
                        const invalidChild = node.querySelector('.waffle-multilink-tooltip, #docs-link-bubble, .appsElementsLinkPreviewBaseRoot');
                        if (invalidChild) {
                            const container = invalidChild.closest('.goog-hovercard') || invalidChild.closest('div[style*="position: absolute"]') || invalidChild;
                            container.classList.add(DETECTED_POPUP_CLASS);
                        }
                    }
                });
            }
        }
    });
});
observer.observe(document.body, { childList: true, subtree: true });

// Initial Tagging
const existing = document.querySelectorAll('.waffle-multilink-tooltip, #docs-link-bubble');
existing.forEach(node => node.classList.add(DETECTED_POPUP_CLASS));
