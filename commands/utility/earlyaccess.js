import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, PermissionFlagsBits, PermissionsBitField } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('ea')
        .setDescription('Sends the early access embed.')
        .addStringOption(option =>
            option.setName('session-link')
                .setDescription('Link for the session so that EA people can join.')
                .setRequired(true))
                .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers), // Add this line to restrict access
    async execute(interaction) {
        const sessionLink = interaction.options.getString('session-link');

        const embed = new EmbedBuilder()
            .setTitle('RCRR | Early Access')
            .setDescription(`Early Access is now Released! Nitro Boosters, members of the Emergency Services, and Content Creators can join the session by clicking the button below.\n\nPlease remember, sharing the session link with others is strictly prohibited and may lead to penalties. We appreciate your cooperation in keeping our community secure and fair for everyone.\n`)
            .setColor(`#7bd1f1`)
            .setFooter({
                text: 'Renneslaer County Roleplay Regal',
                iconURL: 'https://cdn.discordapp.com/attachments/1252567008873283585/1266770394438959217/R-2.png?ex=66a65b5d&is=66a509dd&hm=19864f600989685772cf68424332f0b41cb6650d56d0fb40d880568ca8bea870&'
            });

        const button = new ButtonBuilder()
            .setLabel('Early Access')
            .setStyle(ButtonStyle.Secondary)
            .setCustomId('ea');

        const row = new ActionRowBuilder()
            .addComponents(button);

            // Send the embed message to the channel
        const message = await interaction.channel.send({ content: '@everyone', embeds: [embed] });

        // Create and send the new embed to the specified channel
        const newEmbed = new EmbedBuilder()
        .setTitle('Early access')
        .setDescription(`<@${interaction.user.id}> released early access. The link is set to `)
        .setColor('#7bd1f1'); // Or any color you prefer

        const targetChannel = await interaction.client.channels.fetch('1266774937465786380');
        await targetChannel.send({ embeds: [newEmbed] });

        // Send the embed message with the button to the channel
        await interaction.channel.send({ content: '<@&1262841087551340565>, <@&1262442799710736467>', embeds: [embed], components: [row] });

        // Send an ephemeral confirmation message
        await interaction.reply({ content: 'Command Sent Below.', ephemeral: true });

        // Create a collector to handle the button interaction
        const filter = i => i.customId === 'ea';
        const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.BUTTON, time: 9999999 });

        collector.on('collect', async i => {
            try {
                if (i.member.roles.cache.has('1262841087551340565') || i.member.roles.cache.has('1262172643885318296') || i.member.roles.cache.has('1262442799710736467')) {
                    await i.reply({ content: `**Link:** ${sessionLink}`, ephemeral: true });
                } else {
                    await i.reply({ content: `You dont have the right role for this button.`, ephemeral: true });
                }
            } catch (error) {
                console.error('Error responding to interaction:', error);
            }
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} interactions.`);
        });
    },
};
