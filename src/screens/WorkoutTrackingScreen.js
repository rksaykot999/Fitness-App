import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { getData, storeData } from '../utils/storage';

const WorkoutTrackingScreen = () => {
    const [workouts, setWorkouts] = useState([]);
    const [exercise, setExercise] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');

    useEffect(() => {
        loadWorkouts();
    }, []);

    const loadWorkouts = async () => {
        const data = await getData('workouts') || [];
        setWorkouts(data);
    };

    const addWorkout = async () => {
        if (!exercise || !sets || !reps || !weight) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const newWorkout = {
            id: Date.now(),
            exercise,
            sets: parseInt(sets),
            reps: parseInt(reps),
            weight: parseFloat(weight),
            date: new Date().toISOString(),
        };

        const updatedWorkouts = [...workouts, newWorkout];
        setWorkouts(updatedWorkouts);
        await storeData('workouts', updatedWorkouts);
        setExercise('');
        setSets('');
        setReps('');
        setWeight('');
        Alert.alert('Success', 'Workout logged successfully');
    };

    const deleteWorkout = async (id) => {
        const updatedWorkouts = workouts.filter(w => w.id !== id);
        setWorkouts(updatedWorkouts);
        await storeData('workouts', updatedWorkouts);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Workout Tracking</Text>
            <TextInput style={styles.input} placeholder="Exercise" value={exercise} onChangeText={setExercise} />
            <TextInput style={styles.input} placeholder="Sets" keyboardType="numeric" value={sets} onChangeText={setSets} />
            <TextInput style={styles.input} placeholder="Reps" keyboardType="numeric" value={reps} onChangeText={setReps} />
            <TextInput style={styles.input} placeholder="Weight (kg)" keyboardType="decimal-pad" value={weight} onChangeText={setWeight} />
            <Button title="Log Workout" onPress={addWorkout} />
            <FlatList data={workouts} keyExtractor={item => item.id.toString()} renderItem={({ item }) => (
                <View style={styles.workoutItem}>
                    <Text>{item.exercise} - {item.sets}x{item.reps} @ {item.weight}kg</Text>
                    <Button title="Delete" onPress={() => deleteWorkout(item.id)} />
                </View>
            )} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    workoutItem: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
});

export default WorkoutTrackingScreen;