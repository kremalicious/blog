export async function getRepo(name: string) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.GITHUB_TOKEN}`
    },
    body: JSON.stringify({
      query: CHANGELOG_QUERY,
      variables: { name }
    })
  })

  const json = await response.json()

  if (json.errors) {
    console.error(json.errors)
  }

  const repoInfo = json?.data?.viewer?.repository
  return repoInfo
}

export const CHANGELOG_QUERY = /* GraphQL */ `
  query GitHubRepo($name: String!) {
    viewer {
      repository(name: $name) {
        name
        description
        forkCount
        stargazerCount
        url
        owner {
          login
        }
        object(expression: "main:CHANGELOG.md") {
          id
          ... on Blob {
            text
          }
        }
      }
    }
  }
`
