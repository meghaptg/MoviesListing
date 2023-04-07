import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import SearchBar from "../components/SearchBar";
import {
  moviesList,
  listLoading,
  getPopularMovies,
} from "../reducers/moviesSlice";
import { useSelector } from "react-redux";
import ListItem from "../components/ListItem";
import { useDispatch } from "react-redux";

const Home = () => {
  const movies = useSelector(moviesList);
  const loading = useSelector(listLoading);
  const dispatch = useDispatch();
  const flatListRef = useRef(null);

  const [page, setPage] = useState(1);
  const [scrollStarted, setScrollStarted] = useState(false);
  const [moviesListState, setMoviesListState] = useState(movies);

  useEffect(() => {
    dispatch(getPopularMovies(1));
  }, []);

  useEffect(() => {
    setMoviesListState(movies);
  }, [movies]);

  const renderItem = ({ item }) => {
    return <ListItem item={item} />;
  };

  const handleLoadMore = () => {
    if (scrollStarted) {
      setPage(page + 1);
    }
  };
  const resetPage = () => {
    if (page > 1) {
      setPage(1);
      setScrollStarted(false);
    }
  };
  const scrollingStarted = () => {
    if (!scrollStarted) {
      setScrollStarted(true);
    }
  };

  useEffect(() => {
    if (flatListRef.current && flatListRef.current.index) {
      const index = flatListRef.current.index;
    //   flatListRef.current.scrollToIndex({ index, offset });
    }
  }, [moviesListState]);

  const getMoviesList = () => {
    return (
      <FlatList
        ref={flatListRef}
        data={moviesListState}
        renderItem={renderItem}
        initialNumToRender={10}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={(e) => scrollingStarted()}
        ListFooterComponent={<></>}
        ListFooterComponentStyle={{ padding: 50 }}
        ListEmptyComponent={<Text>No movies for this criteria</Text>}
      />
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <SearchBar page={page} resetPage={resetPage} />
      {loading ? <ActivityIndicator /> : getMoviesList()}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  }
});
