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

    const handleKeyPress = (e: any) => {
        if (e.nativeEvent.key === 'Enter' && Platform.OS === 'web') {
            handleAddTask();
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
                            onKeyPress={handleKeyPress}
                            returnKeyType="done"
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
        backgroundColor: "#F4F6F8",
    },
    inner: {
        flex: 1,
        justifyContent: "space-between",
    },
    taskWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
        flex: 1,
        maxWidth: 800,
        alignSelf: "center",
        width: "100%",
    },
    sectionTitle: {
        fontSize: 28,
        fontWeight: "700",
        color: "#333",
    },
    items: {
        paddingTop: 20,
        paddingBottom: 30,
    },
    writeTaskWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#E0E0E0",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    input: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "#FFF",
        borderRadius: 50,
        borderColor: "#DDD",
        borderWidth: 1,
        marginRight: 10,
        fontSize: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        minWidth: 200,
        maxWidth: 400,
    },
    addWrapper: {
        width: 55,
        height: 55,
        backgroundColor: "#55BCF6",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    addText: {
        color: "#FFF",
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 2,
    },
});

