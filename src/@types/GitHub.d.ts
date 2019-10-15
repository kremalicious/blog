export interface GitHubRepo {
  name: string
  url: string
  owner: {
    login: string
  }
  object: {
    id: string
    text: string
  }
}

export interface GitHub {
  github: {
    viewer: {
      repositories: {
        edges: [
          {
            node: GitHubRepo
          }
        ]
      }
    }
  }
}
