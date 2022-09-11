// bind to events
let recording = false;
let recordedEvents = {};

const truncateString = (string) => {
  if (string.length > 24) {
    return string.substring(0, 24); // start, length
  }

  return string;
}

// nasty loop but will be under 10 generally
const elementInRecordedSet = (elemId, recordedSet) => {
  for (let i = 0; i < recordedSet.length; i++) {
    const recordedElement = recordedSet[i];

    if (elemId === recordedElement.elemId) {
      return true;
    }
  }

  return false;
}

window.addEventListener('click', (e) => {
  console.log('click', recording, e);

  if (recording) {
    if (!Object.keys(recordedEvents).length) {
      recordedEvents = {
        name: document.title,
        accountType: "credit|asset", // manually determined
        siteUrl: window.location.href,
        interactionSteps: [],
        interactionValues: {}, // .env keys
        twoFactor: false,
        twoFactorInteractionSteps: [],
        valuesToGet: [],
        spreadsheetColumn: "A" // would add row on automated run
      };

      console.log(recordedEvents);
    }

    console.log(e);

    const { id, classList, placeholder, nodeName, parentNode, childNodes } = e.target;
    let altId = "";
    let altClassList = [];

    console.log(nodeName);

    // basic target check in case of element wrapper
    if (nodeName !== "BUTTON" || nodeName !== "INPUT") {
      // try parent node
      if (parentNode.nodeName === "BUTTON" || parentNode.nodeName === "INPUT") {
        altId = parentNode.id;
        altClassList = parentNode.classList;
      }
      // try children node
    }

    recordedEvents.interactionSteps.push({
      elemId: altId
        ? `${truncateString(altId + "_" + Array.from(altClassList).join('_'))}`
        : `${truncateString(id + "_" + Array.from(classList).join('_'))}`, // kind of ugly
      placeholder,
      id: altId || id,
      classList: altClassList || classList,
      submitType: false // manually corrected
    });

    console.log(recordedEvents);
  }
});

window.addEventListener('keyup', (e) => {
  console.log(e, recording);

  if (recording) {
    const { id, classList, placeholder } = e.target;
    const elemId = `${truncateString(id + "_" + Array.from(classList).join('_'))}`;

    console.log('check', elementInRecordedSet(elemId, recordedEvents.interactionSteps));

    if (!elementInRecordedSet(elemId, recordedEvents.interactionSteps)) {
      recordedEvents.interactionSteps.push({
        elemId: `${truncateString(id + "_" + Array.from(classList).join('_'))}`, // kind of ugly
        placeholder,
        id,
        classList,
        submitType: false, // manually corrected
        inputType: true // kind of odd with submitType
      });
    }

    console.log(recordedEvents);
  }
});

// send data up to background.js continuously
setInterval(() => {
  sendMessageToExtension({recordedEvent: recordedEvents});
}, 250); // faster for submit events

// expects object
const sendMessageToExtension = (msg) => {
  chrome.runtime.sendMessage(msg);
}

// receive messages from chrome extension icon
// primary to hide/show the injected UI
chrome.runtime.onMessage.addListener((request, sender, callback) => {
  const msg = request;

  console.log(msg);

  if (msg?.cmd) {
    if (msg.cmd === 'start recording') {
      recording = true;
    }

    if (msg.cmd === 'save') {
      recording = false;

      // send up
      sendMessageToExtension({
        recordedEvent: recordedEvents // hmm
      });
    }
  }

  // have to call this to avoid error
  callback('ui ack');
});