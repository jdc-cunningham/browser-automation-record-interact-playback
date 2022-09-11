const helperText = document.getElementById('helper-text');
const recordBtn = document.getElementById('record');
const saveBtn = document.getElementById('save');
const display = document.getElementById('container__display');
const recordStatus = document.getElementById('record-status');
const initialHelperText = 'Result will be displayed as JSON. Add user credentials if needed. Click record then start interacting with a website.';

// check recording state
let storage = localStorage.getItem('barip');

storage = storage ? JSON.parse(storage) : {}; // this is only used to store recording state

recordStatus.classList = 'hidden';

if (storage.recording) {
  recordBtn.innerText = 'Recording...';
}

const updateStorage = () => {
  localStorage.setItem('barip', JSON.stringify(storage));
}

const sendMessageToInjectedScript = (msg) => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, msg, (response) => {
      // not doing anything with response yet
    });  
  });
}

recordBtn.addEventListener('click', () => {
  recordBtn.innerText = 'Recording...';
  helperText.innerText = 'When finished, hit save and view result output.';

  // send message down to injected script to start recording interactions on site
  sendMessageToInjectedScript({cmd: 'start recording'});
  storage.recording = true;
  updateStorage();

  saveBtn.addEventListener('click', () => {
    
  });
});

// receive recorded events
chrome.runtime.onMessage.addListener((request, sender, callback) => {
  const msg = request;
  
  if (msg?.recordedEvent) {
    // validate what it is and clean, also do it on server side

  }
});