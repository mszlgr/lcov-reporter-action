export async function changedFiles(github, repo, commits) {
	const files = []

	await Promise.all(
		commits.map(async function(commit) {
			if (!commit.distinct) {
				return
			}

			const result = await github.repos.getCommit({
				...repo,
				ref: commit.id,
			})

			if (!result || !result.data) {
				return
			}

			for (const file of result.data.files) {
				if (file.status === "added" || file.status === "modified") {
					files.push(file.filename)
				}
			}
		}),
	)

	return files
}
