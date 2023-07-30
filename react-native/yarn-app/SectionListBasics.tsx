import React from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    SectionList,
    StatusBar,
} from "react-native";

const DATA = [
    // FlatList의 props들을 정의한 데이터들을 입력
    {
        title: "Main dishes", // 필드명은 아무거나 해도 상관 없음 (e.g., title, label, ...)
        data: ["Pizza", "Burger", "Risotto"], // data 필드는 필수!, Flat List의 데이터 필드와 동일한 역할
    },
    {
        title: "Sides",
        data: ["French Fries", "Onion Rings", "Fried Shrimps"],
    },
    {
        title: "Drinks",
        data: ["Water", "Coke", "Beer"],
    },
    {
        title: "Desserts",
        data: ["Cheese Cake", "Ice Cream"],
    },
];

const SectionListBasics = () => (
    <SafeAreaView style={styles.container}>
        <SectionList
            sections={DATA} // 위에서 정의한 세션 데이터를 넣음
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
                // 출력할 아이템들을 여기서 구현 (item: DATA의 요소 중 data 필드의 하나하나의 값)
                <View style={styles.item}>
                    <Text style={styles.title}>{item}</Text>
                </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
            )}
        />
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16,
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8,
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
    },
});

export default SectionListBasics;
