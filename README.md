# Datalix Sale Dedicated Server Checker

This tool sends a notification via a Discord webhook when a new sale dedicated server is available from the hosting provider Datalix. If there are no offers, no message is sent; if there are, the tool sends a message. If a message has already been sent for this offer, no new message is sent.

It checks every five minutes to see if there is anything new. The cron job can be customized in the code.

https://datalix.de/sale-dedicated-server-mieten

# Screenshoots
## When found new offers
<img src="https://i.kacper-mra.de/sEFO0/xocASoGU47.png/raw" />
<img src="https://i.kacper-mra.de/sEFO0/fuQoxIXE30.png/raw" />

## When found no offers
<img src="https://i.kacper-mra.de/sEFO0/paSOGoFo06.png/raw" />

On Discord there is then no new message.

# Installation Guide

1. Pull or Download Github Repo
2. Run `npm install`
3. Create `.env` file with your Discord Webhook URL `DISCORD_WEBHOOK_URL=YOUR_WEBHOOK_URL`
4. Run `npm run start`
