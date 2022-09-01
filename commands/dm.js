const {Client} = require('discord.js');
const {SlashCommandBuilder } = require('@discordjs/builders');
const client = new Client({intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MEMBERS"], partials: ["CHANNEL"]})

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dm')
        .setDescription('Sends an anonymous dm as SmoshBot')
        .addUserOption(option => option
            .setName('user')
            .setDescription('Who to send the message to')
            .setRequired(true))
        .addStringOption(option => option
            .setName('content')
            .setDescription('The Message to be sent by SmoshBot')
            .setRequired(true)),

    async execute(interaction) {
        const content = interaction.options.getString('content')
        const user = interaction.options.getUser('user')

        user.send(content)

        interaction.reply({
            content: `DM \"${content}\" sent succesfully to <@${user.id}>, unless they don't share a server with the bot or have DMs from servers turned off.`,
            ephemeral: true
        })
        console.log(`command /dm issued by user \"${interaction.user.username}#${interaction.user.discriminator}\" with Message: \"${content}\" to @${user.username}#${user.discriminator}`)
    },
};