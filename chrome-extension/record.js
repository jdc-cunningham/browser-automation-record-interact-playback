// bind to events
let recording = false;
let recordedEvents = {};
let landingPageUrl = window.location.href;
let pageNavigationDetected = false; // for not calling it twice

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
  console.log('click', recording);
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

    console.log(recordedEvents);
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

    console.log(recordedEvents);
  }
});

// https://stackoverflow.com/a/32158577/2710227
// just going to use a timer for the case of a SPA deal
setInterval(() => {
  if (window.location.href !== landingPageUrl) {
    pageNavigated('timer');
  }
}, 500);

// detect when page changes like logging in
// if the page does not refresh/change url, can just hit save in the extension popup
// https://gomakethings.com/how-to-detect-when-the-browser-url-changes-with-vanilla-js/
// does not work on some sites
window.addEventListener('popstate', () => {
  console.log('pop');
  pageNavigated('pop');
});

// unload eg. refresh
// https://stackoverflow.com/a/7256224/2710227
window.addEventListener("beforeunload", function (e) {
  console.log('unload');
  pageNavigated('unload');

  (e || window.event).returnValue = null;
  return null;
});

const pageNavigated = (navigationType) => {
  alert('page navigate', navigationType);
  if (recording && !pageNavigationDetected) {
    pageNavigated = true;

    sendMessageToExtension({
      recordedEvent: recordedEvents, // hmm
      stopRecording: true
    });

    alert('changing page');
  }
}

// expects object
const sendMessageToExtension = (msg) => {
  window.postMessage(msg);
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

      alert(recordedEvents);

      // send up
      sendMessageToExtension({
        recordedEvent: recordedEvents // hmm
      });
    }
  }

  // have to call this to avoid error
  callback('ui ack');
});