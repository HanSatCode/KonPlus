module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`준비되었어요! ${client.user.tag}(으)로 로그인했어요.`);
	},
};