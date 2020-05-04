import React, { useEffect } from 'react'
import { Subject } from 'rxjs'
import { auditTime, map, distinctUntilChanged } from 'rxjs/operators'
import { useAppContext } from '~/contexts/appContext'

const AppResize = () => {
  const { dispatch } = useAppContext()
  function onResize(width: number) {
    dispatch({ type: 'RESIZE', width })
  }

  useEffect(() => {
    const resizeIn$ = new Subject<UIEvent>()

    const resize$ = resizeIn$.pipe(
      auditTime(200),
      map(ev => (ev.target as Window).innerWidth),
      distinctUntilChanged()
    )

    const fn = (ev: UIEvent) => resizeIn$.next(ev)

    window.addEventListener('resize', fn)
    const sup = resize$.subscribe(onResize)
    return () => {
      window.removeEventListener('resize', fn)
      sup?.unsubscribe()
    }
  }, [])
  
  return <></>
}

export default AppResize
