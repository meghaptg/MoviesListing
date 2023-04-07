import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { searchMovies, getPopularMovies } from "../reducers/moviesSlice";
import { useDispatch } from "react-redux";

let timeoutId;

const SearchBar = ({ page, resetPage }) => {
  const dispatch = useDispatch();
  const [searchPhrase, setSearchPhrase] = useState("");

  const debounce = (func, delay) => {
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };
  const debounceSearch = debounce((query) => {
    // make API call with the search term
    dispatch(searchMovies(query, page));
  }, 500);

  useEffect(() => {
    if (searchPhrase && searchPhrase.length) {
      debounceSearch(searchPhrase);
    } else {
      dispatch(getPopularMovies());
    }
  }, [page]);

  const updateSearchPhrase = (text) => {
    if (text !== searchPhrase) {
      resetPage();
    }
    setSearchPhrase(text);

    if (text && text.length) {
      debounceSearch(text);
    } else {
      dispatch(getPopularMovies());
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} />

        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={updateSearchPhrase}
        />
        {searchPhrase && searchPhrase.length ? (
          <Ionicons
            name="close"
            size={20}
            color="black"
            onPress={() => {
              updateSearchPhrase("");
            }}
          />
        ) : null}
      </View>
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },

  searchBar: {
    padding: 10,
    height: 50,
    flexDirection: "row",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "80%",
  },
});
