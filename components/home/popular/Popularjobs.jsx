import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

import styles from "./popularjobs.style";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import { ActivityIndicator } from "react-native-web";
import { COLORS, SIZES } from "../../../constants";
import { useFetch } from "../../../hook";

const Popularjobs = () => {
  const { data, isLoading, error } = useFetch("search", {
    query: "React developer",
    num_pages: 1,
  });

  const renderList = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" colors={COLORS.primary} />;
    }

    if (error) {
      return <Text>Something went wrong</Text>;
    }

    return (
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <PopularJobCard
            // selectedJob={selectedJob}
            // handleCardPress={handleCardPress}
            item={item}
            key={item.job_id}
          />
        )}
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{ columnGap: SIZES.medium }}
        horizontal
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>{renderList()}</View>
    </View>
  );
};

export default Popularjobs;
