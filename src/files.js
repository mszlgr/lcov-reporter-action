const perPage = 100

export async function changedFiles(github, repo, pr, count) {
	const files = []

	for (let page = 0; page * perPage < count; page++) {
		const response = await github.pulls.listFiles({
			...repo,
			pull_number: pr,
			page,
			per_page: perPage,
		})

		if (!response || !response.data) {
			return
		}

		for (const file of response.data) {
			if (file.status === "added" || file.status === "modified" || file.status === "renamed") {
				files.push(file.filename)
			}
		}
	}

	return files
}
