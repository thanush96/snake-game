import { makeAutoObservable } from 'mobx'
import { create, persist } from 'mobx-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import c, { BoardSizes, ColorThemes, Difficulties } from '@constants'

type Settings = {
  boardSize: BoardSizes
  score: number
  difficulty: Difficulties
  theme: ColorThemes
  useTeleport: boolean
}

class SettingsStore {
  static defaultSettings = {
    boardSize: BoardSizes['15x20'],
    score: 0,
    difficulty: Difficulties.low,
    theme: ColorThemes.yellow,
    useSwipes: false,
    useTeleport: false,
  }

  constructor() {
    makeAutoObservable(this)
  }

  // FIXME: get rid of decorator
  @persist('object') private _settings: Settings = SettingsStore.defaultSettings

  get settings() {
    return this._settings
  }

  private _loading = false

  get loading() {
    return this._loading
  }

  init = async () => {
    try {
      this.setLoading(true)

      await this.hydrate('settings', this)
      // Imitation of long loading
      // to show fancy loading screen
      await new Promise<void>(res =>
        setTimeout(() => {
          res()
        }, c.LOADING_DURATION)
      )

      this.setLoading(false)
    } catch (exception) {
      console.warn('SettingsStore error!', exception)

      this.setLoading(false)

      return Promise.reject(exception)
    }
  }

  private hydrate = create({ storage: AsyncStorage, jsonify: true })

  private setLoading = (value: boolean) => {
    this._loading = value
  }

  updateScore = (score: number) => {
    // console.log('Score', score)
    this._settings.score = score
  }

  updateBoardSize = (boardSize: BoardSizes) => {
    this._settings.boardSize = boardSize
  }

  updateDifficulty = (difficulty: Difficulties) => {
    this._settings.difficulty = difficulty
  }

  updateTheme = (theme: ColorThemes) => {
    this._settings.theme = theme
  }

  updateTeleport = (useTeleport: boolean) => {
    this._settings.useTeleport = useTeleport
  }
}

export default new SettingsStore()
