# 254 Tech Events Bot

A Discord bot that aggregates and announces upcoming tech meetups, workshops, and hackathons within the East African region (Kenya, Uganda, Tanzania, Rwanda, etc.).

## Features
- `/events` Slash Command: Instantly view a list of upcoming tech events.
- Daily Announcements: Automatically posts event updates to a designated channel every morning at 9:00 AM.
- Region Focused: Specifically curated for the East African tech ecosystem.

## Setup
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Create a New Application and a Bot.
3. Enable `Guilds` intents.
4. Create a `.env` file in the root directory:
   ```
   DISCORD_TOKEN=your_bot_token
   CLIENT_ID=your_application_id
   CHANNEL_ID=your_announcement_channel_id
   ```
5. Install dependencies:
   ```bash
   npm install
   ```
6. Run the bot:
   ```bash
   npm start
   ```

## Dependencies
- `discord.js`: To interact with the Discord API.
- `node-cron`: To handle scheduled daily updates.
- `dotenv`: To manage environment variables safely.