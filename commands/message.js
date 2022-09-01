const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('message')
        .setDescription('Sends an anonymous message as SmoshBot')
        .addStringOption(option => option
            .setName('content')
            .setDescription('The Message to be sent by SmoshBot')
            .setRequired(true)),

    async execute(interaction) {
        const content = interaction.options.getString('content')

        interaction.reply({
            content: `message \"${content}\" sent succesfully`,
            ephemeral: true
        })
        interaction.channel.send(content);
        if(interaction.channel.type === 'DM'){
        console.log(`command /message issued by user \"${interaction.user.username}#${interaction.user.discriminator}\" with Message: "${content}\" in DM of ${interaction.channel.recipient.username}#${interaction.channel.recipient.id}`)
        } else {
        console.log(`command /message issued by user \"${interaction.user.username}#${interaction.user.discriminator}\" with Message: "${content}\" in server \"${interaction.guild.name}\" and channel #${interaction.channel.name}`)
        }
    },
};