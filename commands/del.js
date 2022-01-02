const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('del')
		.setDescription('메시지를 강제로 삭제합니다.')
		.addIntegerOption(option =>
			option.setName('int')
				.setDescription('삭제할 메시지의 개수')),
	async execute(interaction) {
		if (interaction.options.getInteger('int') >= 101) {
			await interaction.reply({ content: '한 번에 100개가 넘는 메시지는 삭제할 수 없습니다.', ephemeral: true });
		}
		else if (interaction.options.getInteger('int') === 0) {
			await interaction.reply({ content: '0개의 메시지는 삭제할 수 없습니다.', ephemeral: true });
		}
		else if (interaction.options.getInteger('int') > 0) {
			const messages = await interaction.channel.messages.fetch({ limit: interaction.options.getInteger('int') });
			interaction.channel.bulkDelete(messages);
			await interaction.reply({ content: `최근 ${interaction.options.getInteger('int')}개의 메시지를 삭제하였습니다.`, ephemeral: true });
		}
		else {
			const messages = await interaction.channel.messages.fetch({ limit: 5 });
			interaction.channel.bulkDelete(messages);
			await interaction.reply({ content: '최근 5개의 메시지를 삭제하였습니다.', ephemeral: true });
		}
	},
};