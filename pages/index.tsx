import { useState } from "react"
import Checkbox from "../components/ui/checkbox/Checkbox"
import Switch from "../components/ui/switch/Switch"

export default () => {
  const [checked, setChecked] = useState(false)

  return (
    <div className="m-4">
      <Switch checked={checked} onChange={(to) => setChecked(to)} />
      {/* <Checkbox checked={checked} onChange={(to) => setChecked(to)} /> */}
    </div>
  )
}
