const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('디스코드 서버와 클라이언트 간의 API 왕복 시간을 측정합니다.'),
	async execute(interaction) {
		const sent = await interaction.reply({ content: '측정중..', fetchReply: true, ephemeral: true });
		interaction.editReply({ content: `API 왕복 시간은 ${sent.createdTimestamp - interaction.createdTimestamp}ms 입니다.`, ephemeral: true });
	},
};