# Datalix Sale Dedicated Server Checker

This tool sends a notification via a Discord webhook when a new sale dedicated server is available from the hosting provider Datalix. If there are no offers, no message is sent; if there are, the tool sends a message. If a message has already been sent for this offer, no new message is sent.

It checks every five minutes to see if there is anything new. The cron job can be customized in the code.

# Installation Guide

1. Pull or Download Github Repo
2. Run `npm install`
3. Create `.env` file with your Discord Webhook URL `DISCORD_WEBHOOK_URL=YOUR_WEBHOOK_URL`
4. Run `npm run start`
