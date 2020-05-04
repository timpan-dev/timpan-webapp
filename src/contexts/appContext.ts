import React, { useContext } from "react"
import { IAppContext } from "~/types"

const AppContext = React.createContext<IAppContext>(null)
export const useAppContext = () => useContext(AppContext)

export default AppContext
