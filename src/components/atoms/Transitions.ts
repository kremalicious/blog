export const fadeIn = {
  enter: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
}

const transition = { type: 'spring' }

const enter = {
  y: 0,
  ...transition
}

export const moveInTop = {
  ...enter,
  exit: {
    y: '-2rem',
    ...transition
  }
}

export const moveInBottom = {
  ...enter,
  exit: {
    y: '2rem',
    ...transition
  }
}
