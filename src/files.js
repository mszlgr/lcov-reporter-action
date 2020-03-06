const perPage = 100

export async function changedFiles(github, repo, pr, count) {
	const files = []

	for (const page = 0; page * perPage < count; page++) {
		await Promise.all(
			commits.map(async function(commit) {
				if (!commit.distinct) {
					return
				}

				const response = await github.pulls.listFiles({
					...repo,
					pull_number: pr,
					page,
					per_page: perPage,
				})

				if (!response || !response.data) {
					return
				}

				for (const file of result.data) {
					if (file.status === "added" || file.status === "modified") {
						files.push(file.filename)
					}
				}
			}),
		)
	}

	return files
}
