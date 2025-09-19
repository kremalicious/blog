import {
  CameraIcon,
  FeatherIcon,
  LaptopIcon,
  LollipopIcon,
  TagIcon
} from '@lucide/astro'

export const menu = [
  {
    title: 'Articles',
    link: '/archive/',
    icon: FeatherIcon
  },
  {
    title: 'Photos',
    link: '/photos/',
    icon: CameraIcon
  },
  {
    title: 'Goodies',
    link: '/tags/goodies/',
    icon: LollipopIcon
  },
  {
    title: 'Tags',
    link: '/tags/',
    icon: TagIcon
  },
  {
    title: '/Uses',
    link: '/uses/',
    icon: LaptopIcon
  }
]
