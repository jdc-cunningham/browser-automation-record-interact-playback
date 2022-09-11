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
  accountType: "", // debt, asset
  siteUrl: "",
  twoFactor: bool,
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

9:33 AM

You could say it is a waste of time on my part to rebuild this again from scratch, why not extend the other one... well it was not really designed to do this process/scale. It is based on scripts that you could just add more of.

Granted I am going to copy old code too so that will speed it up.

9:45 AM

Ooh I'm digging this icon I came up with ha, just means record/code

9:52 AM

yuck fingers feel nasty on keyboard

making progress though

10:00 AM

Put some Korn on

Ahh crap just realized you do need to inject JS to watch the page (to record)

10:25 AM

Oh yeah, you'd also want to be able to clean out bad events

Which you could do with a nice UI (rows with minus to remove) but raw JSON is fine for now

The input stuff, it'll check if the field you're typing into is recorded yet or not, if not save the field input info

What sucks is the 2FA specification

I think you'll know if you reach 2FA or not by more steps after first "submission" which how do you know...

- url changes

Need to know a submit button/event

I'll capture both id and css in case one fails

Worst case capture exact node position (not coordinates but DOM node nesting)

Okay so some sites use cookies (can't purge state by local/session storage)

This is with regard to making the UI render with no user info/blank slate eg. incognito

[Me having a stroke](https://youtu.be/TcePkwagNFA?t=2) then (twist)

Mini dillema, how to detect refresh

Think I'll just rely on the extension eg. click stop to stop

[Órale cabron](https://youtu.be/edCQxYzQqhU?t=1) hehe saw this in C&C movie long time ago


