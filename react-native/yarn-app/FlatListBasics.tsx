import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

const FlatListBasics = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={[
                    // data props에 리스트 아이템을 array 형태로 입력
                    { key: "Devin" }, // 각 아이템은 object 형태
                    { key: "Dan" },
                    { key: "Dominic" },
                    { key: "Jackson" },
                    { key: "James" },
                    { key: "Joel" },
                    { key: "John" },
                    { key: "Jillian" },
                    { key: "Jimmy" },
                    { key: "Julie" },
                ]}
                renderItem={({ item }) => (
                    // 각 아이템을 어떻게 랜더링할지는 여기서 구현
                    <Text style={styles.item}>{item.key}</Text>
                )}
            />
        </View>
    );
};

export default FlatListBasics;
