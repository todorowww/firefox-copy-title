browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
        id: "copy-page-title",
        title: "Copy Page Title",
        contexts: ["tab"],
        icons: {
            "16": "icons/title-16.png"
        }
    });

    browser.contextMenus.create({
        id: "copy-page-url",
        title: "Copy Page URL",
        contexts: ["tab"],
        icons: {
            "16": "icons/url-16.png"
        }
    });
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "copy-page-title") {
        browser.tabs.executeScript(tab.id, { code: "navigator.clipboard.writeText(document.title);" })
            .catch(err => console.error("Failed to copy title: ", err));
    } else if (info.menuItemId === "copy-page-url") {
        browser.tabs.executeScript(tab.id, { code: "navigator.clipboard.writeText(window.location.href);" })
            .catch(err => console.error("Failed to copy URL: ", err));
    }
});
