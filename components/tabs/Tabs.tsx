import cn from 'classnames'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Tab from './tab/Tab'

interface IProps {
  initialActiveTab: string
  onChange: (tab: string) => void
  items: { label: string; name: string }[]
  align?: 'center' | 'left' | 'right'
}

export default function Tabs({
  items,
  onChange,
  initialActiveTab,
  align = 'left',
}: IProps) {
  const [activeTab, setActiveTab] = useState(initialActiveTab)
  const [slider, setSlider] = useState({
    left: '0',
    width: '0',
  })

  const tabRefs = useRef<{ [key: string]: HTMLElement }>({})
  const rootElRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    const activeTabEl = tabRefs.current[activeTab]

    if (activeTabEl) {
      const clientRect = activeTabEl.getBoundingClientRect()

      const width = clientRect.width
      const left = activeTabEl.offsetLeft + clientRect.width / 2 - width / 2

      setSlider({ left: `${left}px`, width: `${width}px` })
    }
  }, [activeTab])

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
    onChange(tabName)
  }

  return (
    <div
      role='tabs'
      ref={rootElRef}
      className={cn('flex relative gap-4 border-b border-b-gray-200', {
        'justify-start': align === 'left',
        'justify-center': align === 'center',
        'justify-end': align === 'right',
      })}
    >
      {items.map((item) => (
        <Tab
          {...item}
          key={item.name}
          isActive={activeTab === item.name}
          onClick={handleTabClick}
          ref={(el) => (tabRefs.current[item.name] = el)}
        />
      ))}
      <div
        style={{ ...slider }}
        className='h-[2px] bg-blue-700 bottom-0 absolute transition-all'
      />
    </div>
  )
}
