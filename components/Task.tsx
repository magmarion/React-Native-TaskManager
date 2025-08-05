import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface TaskProps {
    text: string;
}

const Task: React.FC<TaskProps> = (props: TaskProps) => {

    return (
        <View style={styles.task}>
            <Text style={styles.taskText}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    task: {

    },
    taskText: {

    },
});

export default Task;