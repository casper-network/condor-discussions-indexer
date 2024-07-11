import { GitHubService } from "./github.mjs";
import fs from "fs";
import { writeCSV } from "./write_csv.mjs";

const OWNER = "casper-network";
const REPO = "condor-info";

const args = process.argv.slice(2);
const DISCUSSION_NUMBER = parseInt(args[0], 10);
const USERNAMES_FILE = "./usernames.txt";

if (isNaN(DISCUSSION_NUMBER)) {
	console.error("Please provide a valid discussion number.");
	process.exit(1);
}

const githubService = new GitHubService();

async function execute() {
	const usernames = getUsernames();
	const [discussion, comments] = await fetchAndIndexEvents(usernames);
	await writeCSV(comments, DISCUSSION_NUMBER);
}

function getUsernames() {
	return fs
		.readFileSync(USERNAMES_FILE, "utf-8")
		.split("\n")
		.map(username => username.trim())
		.filter(Boolean);
}

async function fetchAndIndexEvents(usernames) {
	try {
		const discussion = await githubService.getDiscussionEvents(
			OWNER,
			REPO,
			DISCUSSION_NUMBER
		);
		const filteredComments = discussion.comments.nodes.filter(comment =>
			usernames.includes(comment.author.login)
		);

		return [discussion, filteredComments];
	} catch (error) {
		console.error("Error fetching events:", error);
	}
}

execute();
