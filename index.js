require("dotenv").config()
const fs = require('node:fs');
const { Client, Collection, Intents, Permissions } = require('discord.js');
const { quote } = require('@discordjs/builders');

const client = new Client({intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MEMBERS"], partials: ["CHANNEL"]})

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.once('ready', () => {
    console.log(`Success! logged in as ${client.user.tag}. \nPress Ctrl + C to terminate`);
});

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('messageCreate', (message) => {
    if (message.content.match(/among us|amogus|\bsus\b|sussy|suspicious|amongus|amogus|imposter|crewmate|vent/i)) {
        if (message.author.bot) return;
        message.reply({
            content: "SHUT UP!"
        })
    };
});

client.login(process.env.TOKEN);