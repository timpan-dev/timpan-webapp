import React, { createContext, useState, useEffect, useContext } from "react"
import { BehaviorSubject, Subject, fromEvent, Subscription } from "rxjs"
import { map, withLatestFrom, filter } from "rxjs/operators"
import { IAction, ITrack, IPlaylistState, IPlaylistActions } from "~/types"
import PlaylistContext from '~/contexts/playlistContext'

export interface ISetPlaylistAction extends IAction {
  playlist: ITrack[]
}

export interface ISetCurrentTrackAction extends IAction {
  index: number
}

export type AnyAction = IAction | ISetPlaylistAction | ISetCurrentTrackAction

export const usePlaylistReducer = (playlist: ITrack[]): [IPlaylistState, IPlaylistActions] => {
  const [state, setState] = useState<IPlaylistState>(
    PlaylistReducer.initialState
  )
  const [actions, setActions] = useState<IPlaylistActions>(null)

  useEffect(() => {
    const reducer = new PlaylistReducer(playlist)
    reducer.subscribe(newState => setState(newState))
    const { dispatch } = reducer

    setActions({
      setPlaylist: playlist => dispatch({ type: "SET_PLAYLIST", playlist }),
      setCurrentTrack: index => dispatch({ type: "SET_CURRENT_TRACK", index }),
      setNextTrack: () => dispatch({ type: "SET_NEXT_TRACK" }),
      setPrevTrack: () => dispatch({ type: "SET_PREV_TRACK" })
    })

    return () => {
      reducer.destroy()
    }
  }, [playlist])

  return [state, actions]
}

export class PlaylistReducer {
  public state: IPlaylistState
  protected state$: BehaviorSubject<IPlaylistState>
  protected actions$ = new Subject<AnyAction>()
  protected subscription = new Subscription()

  static initialState: IPlaylistState = {
    playlist: [],
    currentTrackIndex: null,
    currentTrack: null
  }

  static initialActions: IPlaylistActions = {
    setPlaylist: playlist => {},
    setCurrentTrack: index => {},
    setNextTrack: () => {},
    setPrevTrack: () => {}
  }

  constructor(playlist: ITrack[]) {
    this.state =
      playlist && playlist.length > 0
        ? {
            playlist,
            currentTrack: playlist[0],
            currentTrackIndex: 0
          }
        : PlaylistReducer.initialState
    this.state$ = new BehaviorSubject<IPlaylistState>(this.state)

    const self = this
    const { actions$, state$ } = self

    this.subscription.add(
      this.actions$
        .pipe(
          withLatestFrom(state$),
          map(([action, state]) => self.reducer(state, action)),
          filter(state => state !== null)
        )
        .subscribe(state$)
    )

    this.dispatch = this.dispatch.bind(this)
    this.subscribe = this.subscribe.bind(this)
    this.subscription.add(this.state$.subscribe(state => (self.state = state)))
  }

  public destroy() {
    this.subscription.unsubscribe()
  }

  protected reducer(state: IPlaylistState, action: AnyAction) {
    const self = this

    const { actions$ } = self
    switch (action.type) {
      case "SET_PLAYLIST": {
        const { playlist } = action as ISetPlaylistAction
        if (!playlist || playlist.length === 0) break
        return {
          playlist,
          currentTrack: playlist[0],
          currentTrackIndex: 0
        }
      }
      case "SET_CURRENT_TRACK": {
        const { index } = action as ISetCurrentTrackAction
        if (index < 0 || index > state.playlist.length - 1) break
        return {
          ...state,
          currentTrackIndex: index,
          currentTrack: state.playlist[index]
        }
      }
      case "SET_NEXT_TRACK": {
        const { playlist, currentTrackIndex } = state
        if (currentTrackIndex === null || !playlist || playlist.length === 0)
          break
        const newIndex = currentTrackIndex + 1
        if (newIndex > playlist.length - 1) break
        actions$.next({ type: "SET_CURRENT_TRACK", index: newIndex })
        break
      }
      case "SET_PREV_TRACK": {
        const { playlist, currentTrackIndex } = state
        if (currentTrackIndex === null || !playlist || playlist.length === 0)
          break
        const newIndex = currentTrackIndex - 1
        if (newIndex < 0) break
        actions$.next({ type: "SET_CURRENT_TRACK", index: newIndex })
        break
      }
      default:
        return null
    }
    return null
  }

  public dispatch(action: AnyAction) {
    this.actions$.next(action)
  }
  public subscribe(fn: (state: IPlaylistState) => void) {
    const sub = this.state$.subscribe(fn)
    this.subscription.add(sub)
    return sub
  }
}

interface IPlaylistProvider {
  tracks: ITrack[]
}

// const PlaylistProvider: React.FC<IPlaylistProvider> = ({ tracks, children }) => {
//   const reducer = new PlaylistReducer(tracks)
//   const { dispatch } = reducer
//   const [state, setState] = useState<IPlaylistState>(reducer.state)
//   reducer.subscribe(newState => setState(newState))
//   const actions: IPlaylistActions = {
//     setPlaylist: playlist => dispatch({ type: "SET_PLAYLIST", playlist }),
//     setCurrentTrack: index => dispatch({ type: "SET_CURRENT_TRACK", index }),
//     setNextTrack: () => dispatch({ type: "SET_NEXT_TRACK" }),
//     setPrevTrack: () => dispatch({ type: "SET_PREV_TRACK" })
//   }

//   useEffect(() => {
    
    
    

//     setActions()

//     return () => {
//       reducer.destroy()
//     }
//   }, [tracks])


//   return (
//     <PlaylistContext.Provider value={{ state, actions }}>
//       {children}
//     </PlaylistContext.Provider>
//   )
// }

const PlaylistProvider: React.FC<IPlaylistProvider> = ({ tracks, children }) => {
  const [state, setState] = useState<IPlaylistState>(PlaylistReducer.initialState)
  const [actions, setActions] = useState<IPlaylistActions>(PlaylistReducer.initialActions)

  useEffect(() => {
    const reducer = new PlaylistReducer(tracks)
    reducer.subscribe(newState => setState(newState))
    const { dispatch } = reducer

    setActions({
      setPlaylist: playlist => dispatch({ type: "SET_PLAYLIST", playlist }),
      setCurrentTrack: index => dispatch({ type: "SET_CURRENT_TRACK", index }),
      setNextTrack: () => dispatch({ type: "SET_NEXT_TRACK" }),
      setPrevTrack: () => dispatch({ type: "SET_PREV_TRACK" })
    })

    return () => {
      reducer.destroy()
    }
  }, [tracks])

  return (
    <PlaylistContext.Provider value={{ state, actions }}>
      {children}
    </PlaylistContext.Provider>
  )
}

export default PlaylistProvider


// const PlaylistProvider: React.FC<IPlaylistProvider> = ({
//   tracks,
//   children
// }) => {
//   const [state, setState] = useState<IPlaylistState>(
//     PlaylistReducer.initialState
//   )
//   const [actions, setActions] = useState<IPlaylistActions>(null)

//   useEffect(() => {
//     const reducer = new PlaylistReducer(tracks)
//     reducer.subscribe(newState => setState(newState))
//     const { dispatch } = reducer

//     setActions({
//       setPlaylist: playlist => dispatch({ type: "SET_PLAYLIST", playlist }),
//       setCurrentTrack: index => dispatch({ type: "SET_CURRENT_TRACK", index }),
//       setNextTrack: () => dispatch({ type: "SET_NEXT_TRACK" }),
//       setPrevTrack: () => dispatch({ type: "SET_PREV_TRACK" })
//     })

//     return () => {
//       reducer.destroy()
//     }
//   }, [tracks])

//   return (
//     <PlaylistContext.Provider value={{ state, actions }}>
//       {children}
//     </PlaylistContext.Provider>
//   )
// }