const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('exit')
		.setDescription('클라이언트를 종료합니다.'),
	async execute() {
		process.exit();
	},
};