const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('디스코드 서버와 클라이언트 간의 반응 속도를 테스트합니다.'),
	async execute(interaction) {
		await interaction.reply({ content: `레이턴시: ${Date.now() - interaction.createdTimestamp}ms` });
	},
};