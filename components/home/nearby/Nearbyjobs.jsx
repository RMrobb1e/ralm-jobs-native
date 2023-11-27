import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

import styles from "./nearbyjobs.style";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import { ActivityIndicator } from "react-native-web";
import { COLORS, SIZES } from "../../../constants";
import { useFetch } from "../../../hook";

const Nearbyjobs = () => {
  const { response, isLoading, error } = useFetch("search", {
    query: "React developer",
    num_pages: 1
  });

  const renderList = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" colors={COLORS.primary} />;
    }

    if (error) {
      return <Text>Something went wrong</Text>;
    }

    return response.data?.map((job) => (
      <NearbyJobCard
        job={job}
        key={job.job_id}
        handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>{renderList()}</View>
    </View>
  );
};

export default Nearbyjobs;
