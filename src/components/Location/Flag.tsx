import styles from './index.module.css'

type Props = {
  country: {
    name: string
    code: string
  }
}

export function Flag({ country }: Props) {
  // offset between uppercase ascii and regional indicator symbols
  const OFFSET = 127397

  const emoji = country?.code.replace(/./g, (char) =>
    String.fromCodePoint(char.charCodeAt(0) + OFFSET)
  )

  return (
    <span role="img" aria-label={country?.name} className={styles.emoji}>
      {emoji}
    </span>
  )
}
