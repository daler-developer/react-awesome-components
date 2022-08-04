import cn from 'classnames'
import { ReactElement } from 'react'
import CollapseItem from './collapse-item/CollapseItem'

interface IProps {
  children: ReactElement[] | ReactElement
}

export default function Collapse({ children }: IProps) {
  return <div className={cn('')}>{children}</div>
}

Collapse.Item = CollapseItem
