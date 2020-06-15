import { useState, useEffect } from 'react'
import { BehaviorSubject, Subject, fromEvent, Subscription } from 'rxjs'
import { mapTo, pluck, map, withLatestFrom, auditTime, filter, tap } from 'rxjs/operators'
import { IAudioState, IAudioActions } from './types'

interface IAction {
  type: string
}

interface ISetPositionAction extends IAction {
  position: number
}

interface IProgressAction extends IAction {
  buffered: [number, number][]
}

function timeRangesToArray(bufIn: TimeRanges) {
  const bufOut = []
  for (let i = 0; i < bufIn.length; i++) {
    bufOut.push([bufIn.start(i), bufIn.end(i)])
  }
  return bufOut
}

type AnyAction = IAction | ISetPositionAction | IProgressAction

export const useAudioReducer = (src: string, filesize?: number): [IAudioState, IAudioActions] => {
  const [state, setState] = useState<IAudioState>(AudioReducer.initialState)
  const [actions, setActions] = useState<IAudioActions>(null)

  useEffect(() => {

    const reducer = new AudioReducer(src, filesize)
    const sub = reducer.subscribe(newState => setState(newState))
    const { dispatch } = reducer

    setActions({
      play: () => dispatch({ type: 'PLAY' }),
      pause: () => dispatch({ type: 'PAUSE' }),
      toggle: () => dispatch({ type: 'TOGGLE' }),
      setPosition: (position: number) => dispatch({ type: 'SET_POSITION', position } as IAction)
    })

    return () => {
      if (sub) sub?.unsubscribe()
      reducer.destroy()
    }
  }, [src])

  return [state, actions]
}

export default class AudioReducer {
  protected src: string
  protected size: number
  protected player: AudioWrapper
  protected state = AudioReducer.initialState
  protected state$ = new BehaviorSubject<IAudioState>(AudioReducer.initialState)
  protected actions$ = new Subject<AnyAction>()
  protected subscription = new Subscription()

  static initialState: IAudioState = {
    initialized: false,
    playing: false,
    duration: 0,
    position: 0,
    buffered: [],
    canPlay: false,
    canPlayThrough: false,
    downloadUrl: null,
    filesize: undefined,
    ended: false
  }

  static initialActions: IAudioActions = {
    play: () => {},
    pause: () => {},
    toggle: () => {},
    setPosition: (pos: number) => {}
  }

  constructor(src: string, filesize?: number) {
    this.src = src
    this.size = filesize
    const self = this
    const { actions$, state$ } = self
    this.player = new AudioWrapper(src)

    this.subscription.add(this.actions$
      .pipe(
        withLatestFrom(state$),
        map(([action, state]) => self.reducer(state, action)),
        filter(state => state !== null)
      )
      .subscribe(state$)
    )
    
    this.subscription.add(this.player.subscribe((action) => actions$.next(action)))
    this.dispatch = this.dispatch.bind(this)
    this.subscribe = this.subscribe.bind(this)
    this.subscription.add(
      this.state$.subscribe(state => self.state = state)
    )

    this.dispatch({ type: 'INIT' })
  }

  public destroy() {
    this.subscription.unsubscribe()
    this.player.destroy()
    delete this.player
  }

  protected reducer(state: IAudioState, action: AnyAction) {
    const self = this

    const { player, actions$ } = self
    switch (action.type) {
      case 'INIT':
        return { ...state, downloadUrl: self.src, filesize: self.size, initialized: true, ended: false}
      case 'PLAY':
        player.play()
        break
      case 'PAUSE':
        player.pause()
        break
      case 'TOGGLE':
        state.playing
          ? actions$.next({ type: 'PAUSE' })
          : actions$.next({ type: 'PLAY' })
        break
      case 'E_LOADED_METADATA':
        return {
          ...state,
          playing: false,
          duration: player.duration
        }
      case 'E_CAN_PLAY':
        return {
          ...state,
          canPlay: true
        }
      case 'E_CAN_PLAY_THROUGH':
        return {
          ...state,
          canPlayThrough: true
        }
      case 'E_PROGRESS':
        const buffered = this.player.buffered

        return { ...state, buffered }
      case 'E_PLAY':
        return { ...state, playing: true }
      case 'E_PAUSE':
        return { ...state, playing: false }
      case 'E_TIME_UPDATE':
        return { ...state, position: player.position }
      case 'E_ENDED':
        return { ...state, ended: true }
      case 'SET_POSITION':
        const { position } = action as ISetPositionAction
        this.player.setPosition(position)
        return state
      default:
        return null
    }
    return null
  }

  public dispatch(action: AnyAction) {
    this.actions$.next(action)
  }
  public subscribe(fn: (state: IAudioState) => void) {
    const sub = this.state$.subscribe(fn)
    this.subscription.add(sub)
    return sub
  }
}

class AudioWrapper {
  protected audio: HTMLAudioElement
  protected actions$ = new Subject<AnyAction>()
  protected subscription = new Subscription()

  constructor(src: string) {
    const self = this
    const { actions$ } = self
    const audio = new Audio()
    audio.preload = 'metadata'
    if (src) {
      audio.src = src
    }

    this.subscription.add(
      fromEvent(audio, 'load')
        .pipe(mapTo({ type: 'E_LOAD' }))
        .subscribe(actions$)
    )

    this.subscription.add(
      fromEvent(audio, 'loadeddata')
        .pipe(mapTo({ type: 'E_LOADED_DATA' }))
        .subscribe(actions$)
    )

    this.subscription.add(
      fromEvent(audio, 'loadedmetadata')
        .pipe(mapTo({ type: 'E_LOADED_METADATA' }))
        .subscribe(actions$)
    )

    this.subscription.add(
      fromEvent(audio, 'loadstart')
        .pipe(mapTo({ type: 'E_LOAD_START' }))
        .subscribe(actions$)
    )
    
    this.subscription.add(
      fromEvent(audio, 'loadend')
        .pipe(mapTo({ type: 'E_LOAD_END' }))
        .subscribe(actions$)
    )

    this.subscription.add(
      fromEvent(audio, 'canplay')
        .pipe(mapTo({ type: 'E_CAN_PLAY' }))
        .subscribe(actions$)
    )

    this.subscription.add(
      fromEvent(audio, 'canplaythrough')
        .pipe(mapTo({ type: 'E_CAN_PLAY_THROUGH' }))
        .subscribe(actions$)
    )

    this.subscription.add(
      fromEvent(audio, 'play')
        .pipe(mapTo({ type: 'E_PLAY' }))
        .subscribe(actions$)
    )

    this.subscription.add(
      fromEvent(audio, 'pause')
        .pipe(mapTo({ type: 'E_PAUSE' }))
        .subscribe(actions$)
    )

    this.subscription.add(
      fromEvent(audio, 'playing')
        .pipe(mapTo({ type: 'E_PLAYING' }))
        .subscribe(actions$)
    )

    this.subscription.add(
      fromEvent(audio, 'waiting')
        .pipe(mapTo({ type: 'E_WAITING' }))
        .subscribe(actions$)
    )

    this.subscription.add(
      fromEvent(audio, 'suspend')
        .pipe(mapTo({ type: 'E_SUSPEND' }))
        .subscribe(actions$)
    )

    this.subscription.add(
      fromEvent(audio, 'stalled')
        .pipe(mapTo({ type: 'E_STALLED' }))
        .subscribe(actions$)
    )

    this.subscription.add(
      fromEvent(audio, 'timeupdate')
        .pipe(
          auditTime(300),
          mapTo({ type: 'E_TIME_UPDATE' }),
        )
        .subscribe(actions$)
    )

    this.subscription.add(
      fromEvent(audio, 'progress')
        .pipe(mapTo({ type: 'E_PROGRESS' }))
        .subscribe(actions$)
    )

    this.subscription.add(
      fromEvent(audio, 'ended')
        .pipe(mapTo({ type: 'E_ENDED' }))
        .subscribe(actions$)
    )

    this.audio = audio
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.setPosition = this.setPosition.bind(this)
    this.subscribe = this.subscribe.bind(this)
  }

  public destroy() {
    this.subscription.unsubscribe()
    this.audio.pause()
    this.audio.currentTime = 0
    delete this.audio
  }

  public play() { this.audio.play() }
  public pause() { this.audio.pause() }
  public setPosition(position: number) { this.audio.currentTime = position }

  public get duration() { return this.audio.duration }
  public get position() { return this.audio.currentTime }
  public get buffered() { return timeRangesToArray(this.audio.buffered) }
  public get played() { return timeRangesToArray(this.audio.played) }
  public get paused() { return this.audio.paused }

  public subscribe(next: (value: AnyAction) => void) {
    return this.actions$.subscribe(next)
  }
}