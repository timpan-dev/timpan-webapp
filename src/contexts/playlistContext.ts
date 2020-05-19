import { createContext, useContext } from "react"
import { IPlaylistState, IPlaylistActions } from "~/types"

const PlaylistContext = createContext<{state: IPlaylistState, actions: IPlaylistActions}>(null)
export const usePlaylistContext = () => useContext(PlaylistContext)
export default PlaylistContext