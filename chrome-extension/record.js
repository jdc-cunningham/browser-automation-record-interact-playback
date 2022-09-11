// bind to events
let recording = false;

window.addEventListener('click', (e) => {
  if (recording) {

  }
});

const sendMessageToExtension = (msg) => {

}

// receive messages from chrome extension icon
// primary to hide/show the injected UI
chrome.runtime.onMessage.addListener((request, sender, callback) => {
  const msg = request;

  

  // have to call this to avoid error
  callback('ui ack');
});