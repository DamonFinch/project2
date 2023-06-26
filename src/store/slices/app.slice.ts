import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Language = { code: string; loading: boolean }

type AppState = {
  sessionExpired: boolean
  language: Language
  isSearchFocused: boolean
  isShareModalVisible: boolean
}

const initialState: AppState = {
  sessionExpired: false,
  language: { code: 'en', loading: false },
  isSearchFocused: false,
  isShareModalVisible: false
}

export const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSessionExpired: (state, action: PayloadAction<boolean>) => {
      state.sessionExpired = action.payload
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload
    },
    changeIsSearchInputFocused: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isSearchFocused = action.payload
    },
    setIsShareModalVisible: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isShareModalVisible = action.payload
    }
  }
})

// actions
export const {
  setSessionExpired,
  setLanguage,
  changeIsSearchInputFocused,
  setIsShareModalVisible
} = app.actions

export default app.reducer
