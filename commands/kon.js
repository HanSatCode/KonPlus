const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kon')
		.setDescription('움직이는 이모지를 출력합니다.')
		.addStringOption(option =>
			option.setName('theme')
				.setDescription('이모지 주제')
				.setRequired(true)
				.addChoice('원신', 'gen')
				.addChoice('땃쥐', 'rat'))
		.addStringOption(option =>
			option.setName('name')
				.setDescription('이모지 이름')
				.setRequired(true)),
	async execute(interaction) {
		const emojiFiles = fs.readdirSync(`./src/emoji/${interaction.options.getString('theme')}`);
		for (let i = 0; i < emojiFiles.length; i++) {
			emojiFiles[i] = emojiFiles[i].slice(0, -4);
		}
		let emojiFilesName = new String('');
		for (let i = 0; i < emojiFiles.length; i++) {
			if (i === emojiFiles.length - 1) {
				emojiFilesName = emojiFilesName + emojiFiles[i];
				break;
			}
			else {
				emojiFilesName = emojiFilesName + emojiFiles[i] + ' | ';
			}
		}
		if (emojiFiles.includes(`${interaction.options.getString('name')}`)) {
			const emojiFile = new MessageAttachment(`./src/emoji/${interaction.options.getString('theme')}/${interaction.options.getString('name')}.gif`);
			await interaction.reply({ files: [emojiFile] });
		}
		else {
			const emojifEmbed = new MessageEmbed()
				.setColor('#ff8080')
				.setTitle(`'${interaction.options.getString('name')}'(이)가 등록되어 있지 않음`)
				.setDescription(`사용 가능한 이모지는 다음 목록과 같습니다.\n\n${emojiFilesName}`);
			await interaction.reply({ embeds: [emojifEmbed], ephemeral: true });
		}
	},
};