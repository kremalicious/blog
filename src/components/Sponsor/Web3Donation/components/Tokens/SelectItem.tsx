import { forwardRef, type HTMLAttributes } from 'react'
import * as Select from '@radix-ui/react-select'
import classnames from 'classnames'
import './SelectItem.css'
import { Check } from '@images/components/react'

interface SelectItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string
  icon: string
}

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, value, icon, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classnames('SelectItem', className)}
        {...props}
        value={value}
        ref={forwardedRef}
      >
        <div className="Token">
          <Select.ItemText>
            <img src={icon} width="32" height="32" />
          </Select.ItemText>
          <span>{children}</span>
        </div>
        <Select.ItemIndicator className="SelectItemIndicator">
          <Check />
        </Select.ItemIndicator>
      </Select.Item>
    )
  }
)
