import { Icon as LoaderIcon } from '@images/components/react/Loader'
import styles from './Loader.module.css'

export function Loader() {
  // TODO: fix React props for generated SVG components for class/className
  //@ts-expect-error-next-line
  return <LoaderIcon className={styles.loader} />
}
