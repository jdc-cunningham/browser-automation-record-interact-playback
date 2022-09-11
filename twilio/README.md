### About

If a website requires 2FA your mobile phone will get pinged. Twilio serves as a way to programmatically bridge into that, although it is a manual process.

In this context you would be renting a Twilio phone number which this app will inform you that a 2FA message is coming to you. Once you receive the 2FA message on your mobile phone number, you would send that code into this Twilio number with a prefix like `bofa: 643434` to specify what it is for.

The web server will then receive it and use it to continue the recorded process.
