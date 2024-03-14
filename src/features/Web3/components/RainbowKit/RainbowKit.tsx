import { ConnectButton } from '@rainbow-me/rainbowkit'
import styles from './RainbowKit.module.css'

export function RainbowKit() {
  return (
    <div className={styles.rainbowkit}>
      <ConnectButton chainStatus="none" showBalance={false} />
    </div>
  )
}
