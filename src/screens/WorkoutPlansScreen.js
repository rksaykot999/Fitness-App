import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { getData, storeData } from '../utils/storage';

const WorkoutPlansScreen = () => {
    const [plans, setPlans] = useState([]);
    const [planName, setPlanName] = useState('');
    const [planDescription, setPlanDescription] = useState('');

    useEffect(() => {
        loadPlans();
    }, []);

    const loadPlans = async () => {
        const data = await getData('workoutPlans') || [];
        setPlans(data);
    };

    const addPlan = async () => {
        if (!planName || !planDescription) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        const newPlan = {
            id: Date.now(),
            name: planName,
            description: planDescription,
            createdAt: new Date().toISOString(),
        };
        const updatedPlans = [...plans, newPlan];
        setPlans(updatedPlans);
        await storeData('workoutPlans', updatedPlans);
        setPlanName('');
        setPlanDescription('');
        Alert.alert('Success', 'Workout plan created');
    };

    const deletePlan = async (id) => {
        const updatedPlans = plans.filter(p => p.id !== id);
        setPlans(updatedPlans);
        await storeData('workoutPlans', updatedPlans);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Workout Plans</Text>
            <TextInput style={styles.input} placeholder="Plan Name" value={planName} onChangeText={setPlanName} />
            <TextInput style={styles.input} placeholder="Description" value={planDescription} onChangeText={setPlanDescription} />
            <Button title="Create Plan" onPress={addPlan} />
            <FlatList 
                data={plans}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.planItem}>
                        <Text style={styles.planName}>{item.name}</Text>
                        <Text>{item.description}</Text>
                        <Button title="Delete" onPress={() => deletePlan(item.id)} />
                    </View>
                )} 
            />
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
    planItem: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    planName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default WorkoutPlansScreen;