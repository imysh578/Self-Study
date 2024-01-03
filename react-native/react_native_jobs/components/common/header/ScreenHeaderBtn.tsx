import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./screenheader.style";

interface ScreenHeaderBtnProps {
    iconUrl?: any;
    dimension?: string;
    handlePress?: VoidFunction;
}

const ScreenHeaderBtn = (props: ScreenHeaderBtnProps) => {
    return (
        <TouchableOpacity
            style={styles.btnContainer}
            onPress={props.handlePress}
        >
            <Image
                source={props.iconUrl}
                resizeMode="cover"
                style={styles.btnImg(props.dimension)}
            />
        </TouchableOpacity>
    );
};

export default ScreenHeaderBtn;
