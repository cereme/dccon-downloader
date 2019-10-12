chrome.runtime.onMessage.addListener(
  (arg, sender, sendResponse) => {
    chrome.downloads.download({
     url: arg.zipUrl,
     filename: arg.title + '.zip',
     saveAs: false
    });
   }
);
