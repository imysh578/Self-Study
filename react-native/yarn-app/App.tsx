import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import PizzaTranslator from "./PizzaTranslator";
import ScrollViewExample from "./ScrollViewExample";
import FlatListBasics from "./FlatListBasics";
import SectionListBasics from "./SectionListBasics";

export default function App() {
    return (
        <>
            {/* <PizzaTranslator /> */}
            {/* <ScrollViewExample /> */}
            {/* {<FlatListBasics />} */}
            {<SectionListBasics />}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
