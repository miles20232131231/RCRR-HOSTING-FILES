import { SlashCommandBuilder } from '@discordjs/builders';
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, ComponentType, PermissionsBitField } from 'discord.js';
import { link } from 'fs';

export default {
    data: new SlashCommandBuilder()
        .setName('release')
        .setDescription('Releases the session for everyone to join.')
        .addStringOption(option =>
            option.setName('session-link')
                .setDescription('Link for the session so that civilians may join.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('peacetime-status')
                .setDescription('Current peacetime status.')
                .addChoices(
                    { name: 'Peacetime On', value: 'On' },
                    { name: 'Peacetime Normal', value: 'Normal' },
                    { name: 'Peacetime Off', value: 'Off' }
                )
                .setRequired(true))
        .addStringOption(option =>
            option.setName('frp-speed')
                .setDescription('FRP speeds.')
                .addChoices(
                    { name: '75', value: '75' },
                    { name: '80', value: '80' },
                    { name: '85 (should not be used frequently)', value: '85' }
                )
                .setRequired(true))
        .addStringOption(option =>
            option.setName('drifting-status')
                .setDescription('Current drifting status.')
                .addChoices(
                    { name: 'On', value: 'On' },
                    { name: 'Corners Only', value: 'Corners Only' },
                    { name: 'Off', value: 'Off' }
                )
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers), // Restrict access using MuteMembers permission

    async execute(interaction) {
        // Ensure the command is only executed once
        if (interaction.replied || interaction.deferred) return;

        try {
            const sessionLink = interaction.options.getString('session-link');
            const peacetimeStatus = interaction.options.getString('peacetime-status');
            const frpSpeed = interaction.options.getString('frp-speed');
            const driftingStatus = interaction.options.getString('drifting-status');

            // Create and send the embed message with button to the current channel
            const embed = new EmbedBuilder()
                .setTitle('RCRR | Session Release')
                .setDescription(`The session host has distributed the link to all participants. Click the button below to view and join the session. Should you encounter any issues or have questions, our support team is available to assist you promptly.

**__Session Information:__**

Session Host: <@${interaction.user.id}>
Peacetime Status: ${peacetimeStatus}
FRP Speeds: ${frpSpeed} MPH
Drifting Status: ${driftingStatus}

Your participation is valued, and we wish you a smooth and enjoyable experience during the session.`)
                .setColor('#7bd1f1')
                .setFooter({
                    text: 'Renneslaer County Roleplay Regal',
                    iconURL: 'https://cdn.discordapp.com/attachments/1252567008873283585/1266770394438959217/R-2.png?ex=66a65b5d&is=66a509dd&hm=19864f600989685772cf68424332f0b41cb6650d56d0fb40d880568ca8bea870&'
                });

            const button = new ButtonBuilder()
                .setLabel('Session Link')
                .setStyle(ButtonStyle.Primary)
                .setCustomId('ls');

            const row = new ActionRowBuilder()
                .addComponents(button);

            // Send the embed message with button to the current channel
            await interaction.channel.send({ content: '@everyone', embeds: [embed], components: [row] });

            // Create and send the new embed to the specified channel
            const newEmbed = new EmbedBuilder()
                .setTitle(`<@${interaction.user.id}> has released the session, the information is provided below.
                    **Session information**
                    PT:${peacetimeStatus}
                    FRP:${frpSpeed}
                    Drift:${driftingStatus}
                    Link:${sessionLink}`)
                .setDescription('$}')
                .setColor('#7bd1f1'); // Or any color you prefer

            const targetChannel = await interaction.client.channels.fetch('1266774937465786380');
            await targetChannel.send({ embeds: [newEmbed] });

            // Send an ephemeral confirmation message
            await interaction.reply({ content: 'Command Sent Below.', ephemeral: true });

            // Create a collector to handle the button interaction
            const filter = i => i.customId === 'ls';
            const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.BUTTON, time: 9999999 });

            collector.on('collect', async i => {
                try {
                    await i.deferUpdate(); // Defer the button update

                    await i.followUp({ content: `**Link:** ${sessionLink}`, ephemeral: true });
                } catch (error) {
                    console.error('Error responding to interaction:', error);
                }
            });

            collector.on('end', collected => {
                console.log(`Collected ${collected.size} interactions.`);
            });

        } catch (error) {
            console.error('Error executing command:', error);
            // Ensure to reply if not already replied
            if (!interaction.replied) {
                await interaction.reply({ content: 'There was an error while executing this command.', ephemeral: true });
            }
        }
    },
};
