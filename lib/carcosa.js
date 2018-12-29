const exec = require('child_process').execFile;

class Carcosa {
	list(reply) {
		execute(['-L', '-c'], (stdout) => {
			var items = stdout.split("\n").filter((item) => {
				return item != "";
			});

			reply(items)
		})
	}

	get(key, reply) {
		execute(['-G', '-c', key], (stdout) => {
			reply(stdout);
		})
	}
}

function execute(args, callback) {
	exec('carcosa', args, (error, stdout, stderr) => {
		callback(stdout);
	});
};

module.exports = new Carcosa();
