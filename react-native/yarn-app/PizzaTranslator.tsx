import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

const PizzaTranslator = () => {
    const [text, setText] = useState("");
    return (
        <View style={{ padding: 100 }}>
            <TextInput
                style={{ height: 40 }}
                placeholder="Type here to translate!"
                onChangeText={(newText) => setText(newText)}
                defaultValue={text}
            />
            <Text style={{ padding: 10, fontSize: 42 }}>
                {text
                    .split(" ")
                    .map((word) => word && "🍕")
                    .join(" ")}
            </Text>
        </View>
    );
};

export default PizzaTranslator;
