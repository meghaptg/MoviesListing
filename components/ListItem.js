import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    marginTop: 10,
  },
});

const ListItem = (props) => {
  const { title, release_date, poster_path, overview } = props.item;
  return (
    <View style={styles.container}>
      {poster_path ? (
        <Image
          style={styles.image}
          source={{ uri: `https://image.tmdb.org/t/p/w200${poster_path}` }}
        />
      ) : null}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{`release date: ${release_date}`}</Text>
      <Text style={styles.text}>{overview}</Text>
    </View>
  );
};

export default ListItem;
