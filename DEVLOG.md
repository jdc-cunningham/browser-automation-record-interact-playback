09/11/2022

9:00 AM

moment of silence for today

### Record browser events

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
  twoFactorPrefix: "", eg. bofa this is arbitrary based on account name, sms response template
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

11:18 AM

I am losing direction, need to refocus

I'm still working on the event recording right now

Taking a quick break

11:54 AM

back on, have about 7 hours to finish this, need to do it faster than that but will make a video too

So at this point I still don't have the event recording down, need to get that into a form that I can feed into Puppeteer directly

Hmm... 2FA is interesting to handle with the event recording

I think for now I will just do a manual separate recording event through the popup ui

12:18 PM

mmm yeah Mammoth Epiphany

*Ja...cob tries... so hard...* to build the same thing over and over again

12:34 PM

WTF... I can't detect when this page is changing urls

Must be a SPA

12:40 PM

Oh... my injected script doesn't persist so it gets erased, it also can't detect the unload

I'll just emit upwards at an interval so popui has the current data

12:56 PM

Well I was using the wrong messaging layer eg. `window.postMessage` vs. `chrome.runtime.sendMessage`

But aside from that, still a weird problem of the thing being sent is the original object, even after modifications odd

Ahh destruct order issue okay back on schedule

1:21 PM

Alright got it... moving forward

I think for the scraping part, I'll toggle a "get item" thing, when you mouse over stuff, it'll add a border highlight around it, and when you click down, that'll save the element.

The actual scraper will use `innerText` to get the value.

Ahh dang the JSON formatter will need work

Also still have to specify the target for 2FA

Ahh man the 2FA stuff is hard to do in a pretty way

Especially depending on how many steps there are to click through on a site

An ideal interface would be a plus button you click on per section to add things.

If you need another step for 2FA in this particular website just add it.

With ability to remove (x on right)

But... since I have so much work to do still and have to wire up 14 different sites... yeah I need to get going.

1:59 PM

I will have to pick the submit button too... since it seems to fail in saving that button before the page is destroyed

I will make the element not clickable in that case/reject the event so that it can still be clicked to get info but not trigger submit.

I want to get a fully functional thing done today even if it's ugly.

Most of the rest of this work I've done before, just need to plug in.

2:10 PM

You know... I'm not liking it

It's not intuitive, ugly UI

I'm also losing steam/interest to do this

Oh yeah I can see a better way to do stuff too, like when you pick something, a UI pops up with identifiers, asks what it's for with some assumptions eg. input, say input.

Numbered steps

Ehh... lost it the ambition is gone dear chap

### Saving recorded event into DB

### Puppeteer read and run events

### 2FA integration

### Check whole thing works

### Video

show scratch demo site for event/element grabbing

show entire screen, phone offscreen but console logs show sms sent/received

