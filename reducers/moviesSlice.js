import { createSlice } from "@reduxjs/toolkit";

const initState = {
  list: [],
  loading: false,
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState: initState,
  reducers: {
    updateMovies: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    appendMovies: (state, action) => {
      state.list = [...state.list, ...action.payload];
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearMovies: (state) => {
      state = initState;
    },
  },
});

export const { updateMovies, clearMovies, setLoading, appendMovies } =
  moviesSlice.actions;

export const searchMovies = (query, page) => async (dispatch) => {
  dispatch(setLoading(true));
  const apiResponse = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=9c593067b19933d5c7604bec9dda316d&language=en-US&page=${page}&include_adult=false&query=${query}`
  );
  const data = await apiResponse.json();

  let finalData = [...data?.results];
  if (page > 1) { // TODO need to check max pages condition as well
    dispatch(appendMovies(finalData));
  } else {
    dispatch(updateMovies(finalData));
  }
};
export const getPopularMovies = () => async (dispatch) => {
  //default listing
  dispatch(setLoading(true));
  const apiResponse = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=9c593067b19933d5c7604bec9dda316d&language=en-US&page=1`
  );
  const data = await apiResponse.json();
  dispatch(updateMovies(data?.results));
};

export const moviesList = (state) => state.movies.list;
export const listLoading = (state) => state.movies.loading;

export default moviesSlice.reducer;
