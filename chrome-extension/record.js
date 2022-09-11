// bind to events
let recording = false;
let recordedEvents = {};

const truncateString = (string) => {
  if (string.length > 12) {
    return string.substring(0, 12); // start, length
  }

  return string;
}

// nasty loop but will be under 10 generally
const elementInRecordedSet = (elemId, recordedSet) => {
  for (let i = 0; i < recordedSet.length; i++) {
    const recordedElement = recordedSet[i];

    if (elemId in recordedElement) {
      return true;
    }
  }

  return false;
}

window.addEventListener('click', (e) => {
  if (recording) {
    if (!Object.keys(recordedEvents).length) {
      recordedEvents = {
        name: document.title,
        accountType: "credit|asset", // manually determined
        siteUrl: window.location.href,
        twoFactor: false,
        interactionSteps: [],
        interactionValues: {}, // .env keys
        spreadsheetColumn: "A" // would add row on automated run
      };

      console.log(recordedEvents);
    }

    console.log(e);

    const { id, classList, placeholder } = e.target;

    recordedEvents.interactionSteps.push({
      elemId: `${truncateString(id + " " + classList.join(' '))}`, // kind of ugly
      placeholder,
      id,
      classList,
      submitType: false // manually corrected
    });
  }
});

window.addEventListener('keyup', (e) => {
  console.log(e);

  if (recording) {
    const elemId = `${truncateString(id + " " + classList.join(' '))}`;
    const { id, classList, placeholder } = e.target;

    if (!elementInRecordedSet(elemId, recordedEvents.interactionSteps)) {
      recordedEvents.interactionSteps.push({
        elemId: `${truncateString(id + " " + classList.join(' '))}`, // kind of ugly
        placeholder,
        id,
        classList,
        submitType: false, // manually corrected
        inputType: true // kind of odd with submitType
      });
    }
  }
});

const sendMessageToExtension = (msg) => {

}

// receive messages from chrome extension icon
// primary to hide/show the injected UI
chrome.runtime.onMessage.addListener((request, sender, callback) => {
  const msg = request;

  if (msg?.cmd) {
    if (msg.cmd === 'start recording') {
      recording = true;
    }

    if (msg.cmd === 'stop recording') {
      recording = false;

      // send up
      window.postMessage({
        recordedEvent: recordedEvents // hmm
      });
    }
  }

  // have to call this to avoid error
  callback('ui ack');
});