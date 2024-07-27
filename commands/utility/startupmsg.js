import { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('startup-msg')
        .setDescription('Gives Startup msg')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator), // Add this line to restrict access
    async execute(interaction) {
        // Define the main embed
        const embed1 = new EmbedBuilder()
            .setTitle('RCRR | Roleplay Session Startup')
            .setDescription(`Welcome to the RCRR startup channel, this is where you would get all the information needed before a session starts. If caught not following these would result in a server ban.
                If you have any issues feel free to open a ticket and tell our HR team.
                
                        <:chevron:1266191424169316382> **Rule 1**: Follow all roleplay rules provided by the host.
                        <:chevron:1266191424169316382> **Rule 2**: Caught doing any illegal roleplays like drug roleplays would result in a punishment.
                        <:chevron:1266191424169316382> **Rule 3**: Cop baiting is prohibited in RCRR, and violations will be punished accordingly.
                        <:chevron:1266191424169316382> **Rule 4**: Vehicle colors must be realistic, and 'Neon' colors are not permitted; only factory colors are allowed.
                        <:chevron:1266191424169316382> **Rule 5**: When encountering Law Enforcement Officer (LEO) scenes, accident scenes, or staff scenes, slow down and switch lanes if possible.
                        <:chevron:1266191424169316382> **Rule 6**: Combat logging during sessions is strictly prohibited and may result in a ban.
                        <:chevron:1266191424169316382> **Rule 7**: Membership in the 'Criminal' team requires permission from the server host and priority status.
                        <:chevron:1266191424169316382> **Rule 8**: If experiencing lag, pull off the road until the issue is resolved; driving while experiencing lag is prohibited.
                        <:chevron:1266191424169316382> **Rule 9**: In case of a vehicular accident or collision with an object, exchanging information is mandatory.
                        <:chevron:1266191424169316382> **Rule 10**: Avatars must be realistically designed; wearing Korblox, headless, fur, or regular costumes is prohibited.
                        <:chevron:1266191424169316382> **Rule 11**: Only the session host has the authority to void scenes; permission must be obtained before voiding a scene.
                        <:chevron:1266191424169316382> **Rule 12**: Do not disrupt Staff or P/S scenes, whether in-session or on Discord. Participants may not leave a Staff Scene unless released by staff.`)
            .setThumbnail('https://cdn.discordapp.com/icons/1232394318086541353/569b53d6e055bab1b8433906145363c2.png?size=4096')
            .setColor(`#7bd1f1`)
            .setFooter({
                text: 'Renneslaer County Roleplay Regal',
                iconURL: 'https://cdn.discordapp.com/attachments/1252567008873283585/1266770394438959217/R-2.png?ex=66a65b5d&is=66a509dd&hm=19864f600989685772cf68424332f0b41cb6650d56d0fb40d880568ca8bea870&'
            });

        try {
            // Fetch the channel by ID
            const channel = await interaction.client.channels.fetch('1262427401648869427');

            // Send the embed message to the specified channel
            await channel.send({
                embeds: [embed1]
            });

            // Send an ephemeral confirmation message only if the first response has not been sent yet
            if (!interaction.replied) {
                await interaction.reply({
                    content: 'The startup message has been sent to the specified channel.',
                    ephemeral: true
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);

            // Send an error message to the interaction if something goes wrong
            if (!interaction.replied) {
                await interaction.reply({
                    content: 'There was an error sending the message.',
                    ephemeral: true
                });
            }
        }
    },
};
