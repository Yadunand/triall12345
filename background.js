chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
	  
    // This tab has loaded, pass message on to content script.
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {action: "tabLoad"}, function(response) {});  
    });
	
  }
});