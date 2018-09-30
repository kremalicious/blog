const path = require('path')

module.exports = {
  siteTitle: 'kremalicious',
  siteTitleShort: 'krlc',
  siteDescription: 'Blog of designer & developer Matthias Kretschmann.',
  siteUrl: 'https://kremalicious.com',
  themeColor: '#88bec8',
  backgroundColor: '#e7eef4',
  pathPrefix: null,
  logo: path.resolve(__dirname, 'src/images/avatar.jpg'),
  author: {
    name: 'Matthias Kretschmann',
    email: 'm@kretschmann.io',
    uri: 'https://matthiaskretschmann.com',
    avatar: './src/images/avatar.jpg',
    twitter: 'https://twitter.com/kremalicious',
    github: 'https://github.com/kremalicious',
    facebook: 'https://facebook.com/matthiaskretschmann',
    bitcoin: '171qDmKEXm9YBgBLXyGjjPvopP5o9htQ1V',
    ether: '0x339dbC44d39bf1961E385ed0Ae88FC6069b87Ea1'
  },
  rss: '/feed.xml',
  jsonfeed: '/feed.json',
  typekitID: 'msu4qap',
  itemsPerPage: 20,
  menu: [
    {
      title: 'Photos',
      link: '/photos'
    },
    {
      title: 'Goodies',
      link: '/goodies'
    }
  ]
}
