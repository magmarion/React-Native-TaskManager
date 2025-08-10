import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TaskProps {
    text: string;
    onPress: () => void;
}

const Task = ({ text, onPress }: TaskProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.item}>
                <View style={styles.itemLeft}>
                    <View style={styles.square}></View>
                    <Text style={styles.itemText}>{text}</Text>
                </View>
                <View style={styles.circular}></View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        width: "100%",
    },
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        flex: 1,
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: "#55BCF6",
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        flexShrink: 1,
        fontSize: Platform.select({ web: 18, default: 16 }),
        color: "#333",
    },
    circular: {
        width: 14,
        height: 14,
        borderColor: "#55BCF6",
        borderWidth: 2,
        borderRadius: 7,
        opacity: 0.5,
    },
});


export default Task;