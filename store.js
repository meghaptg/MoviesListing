import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './reducers/moviesSlice'

export default configureStore({
  reducer: {
    movies: moviesReducer
  },
})