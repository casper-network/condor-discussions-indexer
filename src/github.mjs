import { graphql } from "@octokit/graphql";
import dotenv from "dotenv";

dotenv.config();

const GITHUB_TOKEN = process.env.GITHUB_PAT;

if (!GITHUB_TOKEN) {
	throw new Error("GitHub token is not defined in the environment variables.");
}

const graphqlWithAuth = graphql.defaults({
	headers: {
		authorization: `token ${GITHUB_TOKEN}`
	}
});

export class GitHubService {
	async getDiscussionEvents(owner, repo, discussionNumber) {
		const query = `
      		query ($owner: String!, $repo: String!, $discussionNumber: Int!) {
        		repository(owner: $owner, name: $repo) {
          			discussion(number: $discussionNumber) {
            			id
            			title
						bodyText
            			comments(first: 100) {
              				nodes {
                				id
                				bodyText
                				author {
                  					login
                				}
                				createdAt
								isAnswer
            				}
          				}
        			}
      			}
			}
    	`;

		try {
			const response = await graphqlWithAuth(query, {
				owner,
				repo,
				discussionNumber
			});
			return response.repository.discussion;
		} catch (error) {
			console.error("Error fetching discussion events:", error);
			throw error;
		}
	}
}
