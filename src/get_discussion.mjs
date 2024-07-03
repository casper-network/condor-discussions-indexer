import { GitHubService } from "./github.mjs";

const OWNER = "casper-network";
const REPO = "condor-info";

const args = process.argv.slice(2);
const DISCUSSION_NUMBER = parseInt(args[0], 10);

if (isNaN(DISCUSSION_NUMBER)) {
	console.error("Please provide a valid discussion number.");
	process.exit(1);
}

const githubService = new GitHubService();

async function fetchAndIndexEvents() {
	try {
		const discussion = await githubService.getDiscussionEvents(
			OWNER,
			REPO,
			DISCUSSION_NUMBER
		);
		console.log("Original Question:", {
			title: discussion.title,
			body: discussion.bodyText
		});
		console.log("Comments:", discussion.comments.nodes);
	} catch (error) {
		console.error("Error fetching events:", error);
	}
}

fetchAndIndexEvents();
