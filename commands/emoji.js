const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gifoji')
		.setDescription('GIF 확장자의 이모지를 출력합니다.'),
	async execute(interaction) {
		await interaction.reply('fix');
	},
};