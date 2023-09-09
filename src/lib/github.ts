export async function getRepo(name: string) {
  // name comes in as user/repo
  const user = name.split('/')[0]
  const repo = name.split('/')[1]

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.GITHUB_TOKEN}`
    },
    body: JSON.stringify({
      query: CHANGELOG_QUERY,
      variables: { user, repo }
    })
  })

  const json = await response.json()

  if (json.errors) {
    console.error(json.errors)
  }

  const repoInfo = json?.data?.user?.repository
  return repoInfo
}

export const CHANGELOG_QUERY = /* GraphQL */ `
  query GitHubRepo($user: String!, $repo: String!) {
    user(login: $user) {
      repository(name: $repo) {
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
