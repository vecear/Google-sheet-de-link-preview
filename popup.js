document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('toggleExtension');

    // Load saved state (default to true if not set)
    chrome.storage.local.get(['extensionEnabled'], function (result) {
        toggle.checked = result.extensionEnabled !== false; // Default true
    });

    // Save state on change
    toggle.addEventListener('change', function () {
        const isEnabled = toggle.checked;
        chrome.storage.local.set({ extensionEnabled: isEnabled }, function () {
            console.log('Extension enabled state saved:', isEnabled);
        });
    });
});
