const { Client, GatewayIntentBits, EmbedBuilder, REST, Routes } = require('discord.js');
const cron = require('node-cron');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const MOCK_EVENTS = [
    { name: 'Nairobi JS Meetup', date: '2024-07-10', location: 'Nairobi, KE', link: 'https://meetup.com', type: 'Meetup' },
    { name: 'Kampala DevFest', date: '2024-07-15', location: 'Kampala, UG', link: 'https://gdg.community.dev', type: 'Conference' },
    { name: 'Dar Open Source Summit', date: '2024-08-05', location: 'Dar es Salaam, TZ', link: 'https://eventbrite.com', type: 'Hackathon' },
    { name: 'Kigali AI Workshop', date: '2024-08-12', location: 'Kigali, RW', link: 'https://kigalitech.rw', type: 'Workshop' }
];

const commands = [{
    name: 'events',
    description: 'List upcoming tech events in East Africa'
}];

async function registerCommands() {
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    try {
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
        console.log('Slash commands registered.');
    } catch (error) {
        console.error('Error registering commands:', error);
    }
}

function createEventEmbed() {
    const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Upcoming Tech Events: East Africa')
        .setDescription('Here are the latest tech meetups and hackathons in the 254 and beyond.')
        .setTimestamp();

    MOCK_EVENTS.forEach(event => {
        embed.addFields({
            name: `• ${event.name}`,
            value: `📅 ${event.date} | 📍 ${event.location}\n🔗 [Register Here](${event.link})`,
            inline: false
        });
    });

    return embed;
}

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    await registerCommands();

    // Schedule daily announcement at 09:00 AM
    cron.schedule('0 9 * * *', async () => {
        const channel = await client.channels.fetch(process.env.CHANNEL_ID);
        if (channel) {
            channel.send({ embeds: [createEventEmbed()] });
            console.log('Daily update sent.');
        }
    });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'events') {
        await interaction.reply({ embeds: [createEventEmbed()] });
    }
});

client.login(process.env.DISCORD_TOKEN);