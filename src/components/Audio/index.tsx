import React from 'react'
import { useAudioReducer } from './AudioReducer'
import AudioPlayer from './AudioPlayer'
import { useAppContext } from '~/contexts/appContext'


interface IAudio {
  title?: string
  src: string,
  filesize?: number
}

const Audio: React.FC<IAudio> = ({ title, src, filesize, ...props }) => {
  const [state, actions] = useAudioReducer(src, filesize)

  return (
    <AudioPlayer
      {...props}
      title={title}
      state={state}
      actions={actions}
    ></AudioPlayer>
  )
}

export default React.memo(Audio)