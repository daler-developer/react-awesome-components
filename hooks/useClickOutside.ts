import { Ref, RefObject, useEffect } from "react"

export default (callback: Function, ref: RefObject<any>) => {
  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (ref.current) {
        const isClickedOutside = !ref.current.contains(e.target)
  
        if (isClickedOutside) {
          callback()
        }
      }
    })
  }, [])
}
