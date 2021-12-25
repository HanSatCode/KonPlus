const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');

const emojiFiles = fs.readdirSync('./src/emoji');
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

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kon')
		.setDescription('움직이는 이모지를 출력합니다.')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('출력할 이모지 이름을 입력해주세요.')
				.setRequired(true)),
	async execute(interaction) {
		if (emojiFiles.includes(`${interaction.options.getString('name')}`)) {
			const emojiFile = new MessageAttachment(`./src/emoji/${interaction.options.getString('name')}.gif`);
			const emojifEmbed = new MessageEmbed()
				.setAuthor(`${interaction.user.username}`, `${interaction.user.avatarURL()}`)
				.setImage(`attachment://${interaction.options.getString('name')}.gif`);
			await interaction.reply({ embeds: [emojifEmbed], files: [emojiFile] });
		}
		else {
			const emojifEmbed = new MessageEmbed()
				.setColor('#ffcccc')
				.setTitle(`'${interaction.options.getString('name')}'(을)를 찾을 수 없음`)
				.setDescription(`이모지가 존재하지 않습니다. (대·소문자 구별 필수)\n사용 가능한 이모지는 다음과 같습니다.\n${emojiFilesName}`);
			await interaction.reply({ embeds: [emojifEmbed], ephemeral: true });
		}
	},
};