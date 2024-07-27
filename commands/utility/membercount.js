import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('membercount')
        .setDescription('Displays the current member count of the server'),
    async execute(interaction) {
        const guild = interaction.guild;

        if (!guild) {
            await interaction.reply({ content: 'This command can only be used in a server.', ephemeral: true });
            return;
        }

        const memberCount = guild.memberCount;

        const embed = {
            title: 'Members',
            description: `${memberCount}`,
            color: 0x2B2D31,
        };

        await interaction.reply({ embeds: [embed] });
    },
};
