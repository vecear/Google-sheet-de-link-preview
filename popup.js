document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('toggleExtension');
    const languageSelector = document.getElementById('languageSelector');
    const extensionTitle = document.getElementById('extensionTitle');
    const enableLabel = document.getElementById('enableLabel');
    const usageNote = document.getElementById('usageNote');

    // Translations
    const translations = {
        'zh-TW': {
            title: '關掉Google表單連結預覽',
            enable: '啟用擴充功能',
            note: '💡 按住 <b>Ctrl</b> 鍵並將滑鼠移至連結上方，可暫時顯示預覽視窗。'
        },
        'zh-CN': {
            title: '关闭Google表格链接预览',
            enable: '启用扩展功能',
            note: '💡 按住 <b>Ctrl</b> 键并将鼠标移至链接上方，可暂时显示预览窗口。'
        },
        'en': {
            title: 'Disable Google Sheets Link Preview',
            enable: 'Enable Extension',
            note: '💡 Hold <b>Ctrl</b> and hover over a link to temporarily show the preview.'
        },
        'ja': {
            title: 'Googleスプレッドシートのリンクプレビューを無効化',
            enable: '拡張機能を有効にする',
            note: '💡 <b>Ctrl</b> キーを押しながらリンクにカーソルを合わせると、プレビューが一時的に表示されます。'
        },
        'ko': {
            title: 'Google 스프레드시트 링크 미리보기 비활성화',
            enable: '확장 프로그램 사용',
            note: '💡 <b>Ctrl</b> 키를 누른 채 링크 위로 마우스를 가져가면 미리보기 창이 일시적으로 표시됩니다.'
        },
        'es': {
            title: 'Desactivar vista previa de enlaces',
            enable: 'Habilitar extensión',
            note: '💡 Mantén presionado <b>Ctrl</b> y pasa el mouse sobre un enlace para mostrar temporalmente la vista previa.'
        },
        'de': {
            title: 'Link-Vorschau deaktivieren',
            enable: 'Erweiterung aktivieren',
            note: '💡 Halten Sie <b>Ctrl</b> gedrückt und bewegen Sie die Maus über einen Link, um die Vorschau vorübergehend anzuzeigen.'
        },
        'fr': {
            title: 'Désactiver l\'aperçu des liens',
            enable: 'Activer l\'extension',
            note: '💡 Maintenez <b>Ctrl</b> et survolez un lien pour afficher temporairement l\'aperçu.'
        },
        'pt': {
            title: 'Desativar visualização de links',
            enable: 'Ativar extensão',
            note: '💡 Segure <b>Ctrl</b> e passe o mouse sobre um link para mostrar temporariamente a visualização.'
        },
        'vi': {
            title: 'Tắt xem trước liên kết',
            enable: 'Bật tiện ích mở rộng',
            note: '💡 Giữ phím <b>Ctrl</b> và di chuột qua liên kết để tạm thời hiện cửa sổ xem trước.'
        }
    };

    function updateLanguage(lang) {
        const t = translations[lang] || translations['zh-TW'];
        extensionTitle.innerText = t.title;
        enableLabel.innerText = t.enable;
        usageNote.innerHTML = t.note;
        languageSelector.value = lang;
    }

    // Load saved state (default to true if not set)
    chrome.storage.local.get(['extensionEnabled', 'language'], function (result) {
        toggle.checked = result.extensionEnabled !== false; // Default true
        const savedLang = result.language || 'zh-TW';
        updateLanguage(savedLang);
    });

    // Save state on change
    toggle.addEventListener('change', function () {
        const isEnabled = toggle.checked;
        chrome.storage.local.set({ extensionEnabled: isEnabled }, function () {
            console.log('Extension enabled state saved:', isEnabled);
        });
    });

    // Handle language change
    languageSelector.addEventListener('change', function () {
        const selectedLang = languageSelector.value;
        updateLanguage(selectedLang);
        chrome.storage.local.set({ language: selectedLang }, function () {
            console.log('Language saved:', selectedLang);
        });
    });
});
