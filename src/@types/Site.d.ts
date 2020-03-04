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
  facebook: string
  bitcoin: string
  ether: string
}

export interface Site {
  siteTitle: string
  siteTitleShort: string
  siteDescription: string
  siteUrl: string
  author: Author
  typekitID: string
  menu: MenuItem[]
  rss: string
  jsonfeed: string
  itemsPerPage: number
  repoContentPath: string
  darkModeConfig: {
    classNameDark: string
    classNameLight: string
  }
  ad: {
    title: string
    link: string
  }
}
