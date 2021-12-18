const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');

const emojiFiles = fs.readdirSync('./src/img/emoji');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kongif')
		.setDescription('동적인 이모지를 출력합니다.')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('이모지의 이름을 입력해주세요.')
				.setRequired(true)),
	async execute(interaction) {
		if (emojiFiles.includes(`${interaction.options.getString('name')}.gif`)) {
			const emojiFile = new MessageAttachment(`./src/img/emoji/${interaction.options.getString('name')}.gif`);
			const emojifEmbed = new MessageEmbed()
				.setTitle(`${interaction.user.tag}`)
				.setImage(`attachment://${interaction.options.getString('name')}.gif`);
			await interaction.reply({ embeds: [emojifEmbed], files: [emojiFile] });
		}
		else {
			const emojifEmbed = new MessageEmbed()
				.setColor('#ffcccc')
				.setTitle('찾을 수 없음')
				.setDescription(`'${interaction.options.getString('name')}'(이)라는 이모지가 존재하지 않습니다.\n조회가능한 이모지는 다음과 같습니다 : \n${emojiFiles}`);
			await interaction.reply({ embeds: [emojifEmbed], ephemeral: true });
		}
	},
};