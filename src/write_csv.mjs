import { createObjectCsvWriter } from "csv-writer";

export async function writeCSV(filteredComments, DISCUSSION_NUMBER) {
	const records = filteredComments.map(comment => ({
		id: comment.id,
		bodyText: comment.bodyText,
		author: comment.author.login,
		createdAt: comment.createdAt,
		isAnswer: comment.isAnswer
	}));

	// Write data to CSV
	const csvWriter = createObjectCsvWriter({
		path: `discussion_${DISCUSSION_NUMBER}.csv`,
		header: [
			{ id: "id", title: "ID" },
			{ id: "bodyText", title: "Body Text" },
			{ id: "author", title: "Author" },
			{ id: "createdAt", title: "Created At" },
			{ id: "isAnswer", title: "Is Answer" }
		]
	});

	await csvWriter.writeRecords(records);
	console.log(`Data has been written to discussion_${DISCUSSION_NUMBER}.csv`);
}
