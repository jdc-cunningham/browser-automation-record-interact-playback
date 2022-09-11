### About

This is a tool to record browser interaction, store it and then play it again in the future.

My specific use case is finance-related, login to accounts and get balances then update a Google Spreadsheet.

**Why?**

Ultimately to save time, I have to login to several accounts/update a spreadsheet and this process takes at least 7 minutes in my case and I do it several times a month for my own sanity.

### Disclaimers
Note that the workflow expected in this code is primarily for logins, maybe with 2FA. So you are on a page, type in credentials, hit login, either you're done, ready to get info or you need to use 2fA. Eitherway after you get to your intended location, there's no more automation taking place. You'd have to record more events after that, to continue doing things. But this code is not configured to do that.

### Components
- **Chrome Extension**
  - to do the DOM interaction recording and save as JSON
- **Web server**
  - specifically to interact with a DB
  - more importantly to do the headless browser interaction
- **Twilio**
  - 2FA (human intervention)
- **Google Spreadsheet**
  - access and write into one

### Process
[insert demo gif]

- use Chrome Extension popup UI to start recording
- do browser interaction (username/passwords not stored, added later in JSON)
- then playback the interaction(s) manually or a schedule eg. CRON

### Tech stack
- JavaScript/NodeJS, HTML, CSS
- Puppeteer

### Bad design/user flow
- it does suck you have to update a .env separately
  - that's my paranoia about storing user creds in plaintext, hashing means gotta enter them as plaintext somewhere
- you could potentially do all of this without a backend if you wanted to watch it do the steps in the browser

### Misc notes

[Previous related project](https://github.com/jdc-cunningham/puppeteer-finance-balance-automation) (manually created interaction scripts)