import { createContext, Dispatch, SetStateAction, useContext } from 'react'

export type PlayerState = {
  currentIndex: number | null
  current: TEpisode | null
  playlist: TEpisode[]
  loading: boolean
  isPlaying: boolean
  duration: number
}

type PlayerContextProps = PlayerState & {
  setCurrentIndex: (index: PlayerState['currentIndex']) => void
  setPlaylist: (playlist: PlayerState['playlist']) => void
  setLoading: (loading: PlayerState['loading']) => void
  setIsPlaying: (isPlaying: PlayerState['isPlaying']) => void
  setDuration: (duration: PlayerState['duration']) => void
  audioRef: HTMLAudioElement
  setAudioRef: Dispatch<SetStateAction<HTMLAudioElement>>
}

export const PlayerContext = createContext<PlayerContextProps | null>(null)

export const usePlayer = (): PlayerContextProps => {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider')
  }
  return context
}

/* Controls Context */
type PlayerContextControlsProps = {
  nextEpisode: () => void
  prevEpisode: () => void
  toggleAudio: () => void
  play: (track: TEpisode) => void
  seekForward: (time: number) => void
  replay: (time: number) => void
  updateTime: (time: number) => void
}

export const PlayerControlsContext = createContext<PlayerContextControlsProps | null>(
  null
)

export const usePlayerControls = (): PlayerContextControlsProps => {
  const context = useContext(PlayerControlsContext)
  if (!context) {
    throw new Error(
      'usePlayerControls must be used within a PlayerControlsProvider'
    )
  }
  return context
}

/* Controls Context */
type PlayerCurrentTimeContext = {
  currentTime: number
  setCurrentTime: Dispatch<SetStateAction<number>>
}

export const PlayerCurrentTimeContext = createContext<PlayerCurrentTimeContext | null>(
  null
)

export const usePlayerCurrentTime = (): PlayerCurrentTimeContext => {
  const context = useContext(PlayerCurrentTimeContext)
  if (!context) {
    throw new Error(
      'usePlayerCurrentTime must be used within a PlayerCurrentTimeProvider'
    )
  }
  return context
}

export type PlayerActions =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_CURRENT_INDEX'; payload: number }
  | { type: 'SET_PLAYLIST'; payload: TEpisode[] }
  | { type: 'SET_IS_PLAYING'; payload: boolean }

export const PlayerReducer = (
  state: PlayerState,
  action: PlayerActions
): PlayerState => {
  switch (action.type) {
    case 'SET_CURRENT_INDEX':
      return {
        ...state,
        currentIndex: action.payload,
        current: state.playlist[action.payload],
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      }
    case 'SET_PLAYLIST':
      return {
        ...state,
        playlist: action.payload,
      }
    case 'SET_IS_PLAYING':
      return {
        ...state,
        isPlaying: action.payload,
      }
    case 'SET_DURATION':
      return {
        ...state,
        duration: action.payload,
      }
    default:
      return state
  }
}
