const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('콘플러스의 정보를 확인합니다.'),
	async execute(interaction) {
		const infoEmbed = new MessageEmbed()
			.setColor('#f7df1e')
			.setTitle('KonPlus')
			.setURL('https://github.com/HanSatCode/KonPlus')
			.setDescription('Make useful discord experiences.')
			.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png')
			.addFields(
				{ name: 'Build', value: 'RTS-Alpha', inline: true },
				{ name: 'Status', value: '22122516', inline: true },
				{ name: 'Devel-Lang', value: 'JS, Node.JS', inline: true },
			);
		await interaction.reply({ embeds: [infoEmbed], ephemeral: true });
	},
};