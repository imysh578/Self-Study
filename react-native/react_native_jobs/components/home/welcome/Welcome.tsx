import React from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    FlatList,
} from "react-native";

import styles from "./welcome.style";
import { icons } from "../../../constants";

const jobTypes = ["Full-time", "Part-time", "Contractor"];

const Welcome = () => {
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.userName}>Hello Adrian</Text>
                <Text style={styles.welcomeMessage}>Find your perfect job</Text>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        value=""
                        onChange={() => {}}
                        placeholder="What are you looking for?"
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
                <Image
                    source={icons.search}
                    resizeMode="contain"
                    style={styles.searchBtnImage}
                />
            </TouchableOpacity>

            <View style={styles.container}>
                <FlatList
                    data={jobTypes}
                    renderItem={(item) => (
                        <TouchableOpacity key={item}>
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
};

export default Welcome;
