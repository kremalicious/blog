export interface MenuItem {
  title: string
  link: string
}

export interface Author {
  name: string
  email: string
  uri: string
  twitter: string
  github: string
  bitcoin: string
  ether: string
}

export interface Site {
  siteTitle: string
  siteTitleShort: string
  siteDescription: string
  siteUrl: string
  author: Author
  menu: MenuItem[]
  rss: string
  jsonfeed: string
  itemsPerPage: number
  repoContentPath: string
  darkModeConfig: {
    classNameDark: string
    classNameLight: string
  }
}
