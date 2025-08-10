import React, { useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

import Task from "../components/Task";

export default function App() {
    const [task, setTask] = useState<string>("");
    const [taskItems, setTaskItems] = useState<string[]>([]);

    const handleAddTask = () => {
        if (task.trim()) {
            setTaskItems([...taskItems, task]);
            setTask("");
            Keyboard.dismiss();
        }
    };

    const completeTask = (index: number) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={80}
        >
            {Platform.OS === "web" ? (
                <View style={styles.inner}>
                    {/* web task section */}
                    <View style={styles.taskWrapper}>

                        <Text style={styles.sectionTitle}>Today&apos;s Tasks</Text>

                        <ScrollView contentContainerStyle={styles.items}>

                            {taskItems.map((item, index) => (
                                <Task key={index} text={item} onPress={() => completeTask(index)} />
                            ))}

                        </ScrollView>
                    </View>

                    {/* web input section */}
                    <View style={styles.writeTaskWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Write a task"
                            placeholderTextColor="#888"
                            value={task}
                            onChangeText={setTask}
                        />
                        <TouchableOpacity onPress={handleAddTask}>
                            <View style={styles.addWrapper}>
                                <Text style={styles.addText}>+</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.inner}>
                        {/* mobile task section */}
                        <View style={styles.taskWrapper}>

                            <Text style={styles.sectionTitle}>Today&apos;s Tasks</Text>

                            <ScrollView contentContainerStyle={styles.items}>

                                {taskItems.map((item, index) => (
                                    <Task key={index} text={item} onPress={() => completeTask(index)} />
                                ))}

                            </ScrollView>
                        </View>

                        {/* mobile input section */}
                        <View style={styles.writeTaskWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Write a task"
                                placeholderTextColor="#888"
                                value={task}
                                onChangeText={setTask}
                            />
                            <TouchableOpacity onPress={handleAddTask}>
                                <View style={styles.addWrapper}>
                                    <Text style={styles.addText}>+</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8EAED",
        alignItems: "center",
    },
    inner: {
        flex: 1,
        justifyContent: "space-between",
        width: "100%",
        maxWidth: 600, // keeps it centered and nice on web
    },
    taskWrapper: {
        paddingTop: Platform.select({ web: 40, default: 80 }),
        paddingHorizontal: 20,
        flex: 1,
        width: "100%",
    },
    sectionTitle: {
        fontSize: Platform.select({ web: 28, default: 24 }),
        fontWeight: "bold",
        textAlign: "center",
    },
    items: {
        paddingTop: 30,
        paddingBottom: 20,
    },
    writeTaskWrapper: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: Platform.select({ web: 20, default: 35 }),
        backgroundColor: "#E8EAED",
        width: "100%",
    },
    input: {
        flex: 1,
        minWidth: 150,
        maxWidth: 400,
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: "#FFF",
        borderRadius: 60,
        borderColor: "#C0C0C0",
        borderWidth: 1,
        fontSize: Platform.select({ web: 16, default: 14 }),
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: "#55BCF6",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#C0C0C0",
        borderWidth: 1,
        marginLeft: 10,
    },
    addText: {
        color: "#FFF",
        fontSize: 34,
        lineHeight: 38,
    },
});
