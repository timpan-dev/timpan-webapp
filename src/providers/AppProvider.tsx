import React, { useReducer, useEffect } from "react"
import {
  IAppState,
  AllAppActions,
  IPlayerUnregAction,
  IPlayerRegAction,
  IPlayerStartAction,
  PlayerDesc,
  IResizeAction
} from "~/types"
import AppContext from "~/contexts/appContext"
import { contentWidth } from "~/utils/styling"

const initialState: IAppState = {
  drawer: false,
  pageWidth: 0,
  lastVisit: 1576357200000
}

var g_players: PlayerDesc[] = []

const appReducer = (state: IAppState, action: AllAppActions) => {
  switch (action.type) {
    case "TOGGLE_DRAWER":
      return {
        ...state,
        drawer: !state.drawer
      }
    case "RESIZE": {
      const { width } = action as IResizeAction
      return {
        ...state,
        pageWidth: width
      }
    }
    case "PLAYER_REG": {
      const { player } = action as IPlayerRegAction
      g_players = g_players.concat([player])

      break
    }
    case "PLAYER_UNREG": {
      const { playerId } = action as IPlayerUnregAction
      g_players = g_players.filter(it => it.playerId !== playerId)

      break
    }
    case "PLAYER_START": {
      const { playerId } = action as IPlayerStartAction
      g_players.forEach(it => {
        if (it.playerId !== playerId) {
          it.stop()
        }
      })
      break
    }
    case "INITIAL_BROWSER_RENDER": {
      return {
        ...state,
        pageWidth: window.innerWidth,
      }
    }
    default:
      return state
  }

  return state
}

function init(initialState: IAppState) {
  return {
    ...initialState,
    pageWidth: typeof window !== `undefined` ? window.innerWidth : contentWidth,
  }
}

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState, init)

  useEffect(() => {
    if (typeof window !== `undefined`) {
      dispatch({ type: "INITIAL_BROWSER_RENDER" })
    }
  }, [])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
