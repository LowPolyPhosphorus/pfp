# Profile Picture... thing

forked from whatbeato's/headpatsyou's pfp repo to rotate my slack pfps ever once in a while https://pfp.lowpolyphosphor.us

> The previous version of this, made by [sampoder](https://github.com/sampoder) used a S1 DB, which I now made to use Redis, so I could selfhost this easier. I also added some more silly features (including a privacy policy and a country indicator!)
-@whatbeato

Just set a SLACK_TOKEN and a REDIS_URL to your .env, upload some images, and you should be good to go! For the automatic pfp changing, you should setup a service like Uptime.com to ping /api/set-profile every 5-10 minutes. 

um

thats it! hopefully soon i'll make it cycle my pfp on more platforms but most other platforms dont have bots that have a PFP changing scope.
