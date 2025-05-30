/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { EVENTS } from '../consts.js'

export function navigate (href) {
  window.history.pushState({}, '', href)
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}

export function Link ({ target, to, ...props }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === 0
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
    const isManageableEvent = target === undefined || target === '_self'

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault()
      navigate(to)  // navegacion con SPA
      window.scrollTo(0, 0)
    }
  }

  return <a onClick={handleClick} href={to} target={target} {...props} />
}
