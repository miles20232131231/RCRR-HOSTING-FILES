import { SlashCommandBuilder } from '@discordjs/builders';
import { EmbedBuilder, PermissionsBitField } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('over')
        .setDescription('Purges messages from today between specified start and end times.')
        .addStringOption(option =>
            option.setName('start-time')
                .setDescription('Start time in HH:MM format')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('end-time')
                .setDescription('End time in HH:MM format')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers), // Restrict access using MuteMembers permission
    async execute(interaction) {
        const startTime = interaction.options.getString('start-time');
        const endTime = interaction.options.getString('end-time');
        
        // Get today's date and set the time for start and end
        const now = new Date();
        const start = new Date(now);
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        start.setHours(startHours, startMinutes, 0, 0);
        
        const end = new Date(now);
        const [endHours, endMinutes] = endTime.split(':').map(Number);
        end.setHours(endHours, endMinutes, 0, 0);

        // Fetch messages from the channel
        const messages = await interaction.channel.messages.fetch({ limit: 100 });

        // Filter messages from today between the specified times
        const messagesToDelete = messages.filter(msg => {
            const msgDate = new Date(msg.createdTimestamp);
            return msgDate >= start && msgDate <= end;
        });

        // Delete the filtered messages
        await interaction.channel.bulkDelete(messagesToDelete);

        // Create an embed with the details
        const embed = new EmbedBuilder()
            .setTitle('RCRR | Session Concluded')
            .setDescription(`Thank you for joining the RCRR session hosted by <@${interaction.user.id}>. Your participation is valued, and we're excited to have you with us. We hope you had an enjoyable experience throughout the event.

__**Session Details:**__

Host: <@${interaction.user.id}>
Start Time: ${startTime}
End Time: ${endTime}

Your presence contributes to making this session a success. Let's make it a memorable event together! `)
            .setColor(`#7bd1f1`)
            .setFooter({
                text: 'Renneslaer County Roleplay Regal',
                iconURL: 'https://cdn.discordapp.com/attachments/1252567008873283585/1266770394438959217/R-2.png?ex=66a65b5d&is=66a509dd&hm=19864f600989685772cf68424332f0b41cb6650d56d0fb40d880568ca8bea870&'
            });

            // Create and send the new embed to the specified channel
        const newEmbed = new EmbedBuilder()
        .setTitle('Session Over')
        .setDescription(`<@${interaction.user.id}> has ended their session
            
            **Session Information**
            StartTime:${startTime}
            EndTime:${endTime}`)
        .setColor('#7bd1f1'); // Or any color you prefer

        const targetChannel = await interaction.client.channels.fetch('1266774937465786380');
        await targetChannel.send({ embeds: [newEmbed] });

        // Send the embed to the channel
        await interaction.channel.send({ embeds: [embed] });

        // Send an ephemeral confirmation message
        await interaction.reply({ content: 'Command sent below.', ephemeral: true });
    },
};
