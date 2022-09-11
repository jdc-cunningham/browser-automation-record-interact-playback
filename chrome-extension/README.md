### About

This is a basic interface to record browser interaction and specify what value to grab.

Also allows you to modify the JSON output and enter your credentials before it is saved.

### Security

Other than this manifest being old eg. not using v3. Supposedly the context is the same security level as Chrome's [password storage](https://stackoverflow.com/questions/17287553/chrome-extension-storing-variables-in-background-page-is-secure/17293075#17293075).

This uses `window.postMessage` to interact with the DOM and send the info back into the Chrome Extension. This part is not secure, the website can intercept `window.postMessage` but it's okay because all you're capturing are the elements/actions.
