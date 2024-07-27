import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('startup')
        .setDescription('Sends a startup embed')
        .addIntegerOption(option =>
            option.setName('reactions')
                .setDescription('Amount of reactions for the session to occur')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers), // Add this line to restrict access
    async execute(interaction) {
        const reactions = interaction.options.getInteger('reactions');
        const user = interaction.user;

        const embed = new EmbedBuilder()
            .setTitle('RCRR | Session Startup')
            .setDescription(`Welcome, ${user}! Ready to begin the session? Be sure to check out <#1232649682166222858> for important details before joining.

To register a vehicle, please use the command /register. For unregistering, utilize /unregister. These commands can be executed in <#1262429535677190164>.

The session will commence upon receiving **__${reactions}+__** reactions.`)
            .setColor(`#7bd1f1`)
            .setFooter({
                text: 'Renneslaer County Roleplay Regal',
                iconURL: 'https://cdn.discordapp.com/attachments/1252567008873283585/1266770394438959217/R-2.png?ex=66a65b5d&is=66a509dd&hm=19864f600989685772cf68424332f0b41cb6650d56d0fb40d880568ca8bea870&'
            });

        // Send the embed message to the channel
        const message = await interaction.channel.send({ content: '@everyone', embeds: [embed] });

                   // Create and send the new embed to the specified channel
                   const newEmbed = new EmbedBuilder()
                   .setTitle('Session Startup')
                   .setDescription(`<@${interaction.user.id}> has started up a session. The reaction is set to ${reactions}.`)
                   .setColor('#7bd1f1'); // Or any color you prefer

                   const targetChannel = await interaction.client.channels.fetch('1266774937465786380');
                   await targetChannel.send({ embeds: [newEmbed] });

        // Add reaction to the embed message
        await message.react('✅'); 

        // Send an ephemeral confirmation message
        await interaction.reply({ content: 'Command Sent Below.', ephemeral: true });

    },
};
