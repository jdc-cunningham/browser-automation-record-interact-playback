09/11/2022

9:00 AM

moment of silence for today

So first thing I have to figure out is the recorded interaction structure

I should note that most of this project I have already built in the past so this is kind of an improvement/rehash.

Maybe the code is written better idk, need external stimuli for change I think or get hit by a stray cosmic particle.

- an element has an identifier/target eg. class, id
- click it to focus/write into it
- do this again eg. user/pass
- click login button
- then click on text field to target
  - how to specify get? highlight?
  - button in popup UI (sucks)
  - modify right click behavior?
  - draggable UI thing injected into website for buttons
    - this would be interesting

I'll just go with a button for now that says "select value to get"

I had this thought of being able to play back interaction in the extension but not sure if you're allowed to will see. If you could, then you wouldn't need the server stuff, 2FA would still suck but you could follow along as it opened different sites and help as needed.

So the JSON structure might be something like this:

```
{
  name: "name",
  siteUrl: "",
  interactionSteps: [
    {
      target: "",
      action: "",
      value: "" // if applicable
    }
  ],
  interactionValues: {
    ... these would be .env var names
    ... this JSON blob will be stored as plaintext
  },
  spreadsheetLocation: "" // because ran async, random order of completion
}
```

Other notes before writing code:
- use a `try catch` for steps in case of changed CSS selectors/fails for some reason
- as mentioned above run in parallel to speed up (promises)

9:17 AM

Let's get to work... (playlist on)

