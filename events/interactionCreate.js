module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		console.log(`${interaction.user.tag}(이)가 #${interaction.channel.name}에 명령어를 사용하였어요.`);
	},
};