import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('cohost')
        .setDescription('Sends a startup embed')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers), // Add this line to restrict access
    async execute(interaction) {
        const user = interaction.user;

        const embed = new EmbedBuilder()
            .setTitle('Cohost')
            .setDescription(`${user} is cohosting the session being hosted.`)
            .setColor(`#7bd1f1`)
            .setFooter({
                text: 'Renneslaer County Roleplay Regal',
                iconURL: 'https://cdn.discordapp.com/attachments/1252567008873283585/1266770394438959217/R-2.png?ex=66a65b5d&is=66a509dd&hm=19864f600989685772cf68424332f0b41cb6650d56d0fb40d880568ca8bea870&'
            });

            // Create and send the new embed to the specified channel
        const newEmbed = new EmbedBuilder()
        .setTitle('Early access')
        .setDescription(`<@${interaction.user.id}> is cohosting the session. `)
        .setColor('#7bd1f1'); // Or any color you prefer

        const targetChannel = await interaction.client.channels.fetch('1266774937465786380');
        await targetChannel.send({ embeds: [newEmbed] });

        // Send the embed message to the channel
        const message = await interaction.channel.send({ content: '', embeds: [embed] });

        // Send an ephemeral confirmation message
        await interaction.reply({ content: 'Command Sent Below.', ephemeral: true });

    },
};
