import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getData, storeData } from '../utils/storage';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [goal, setGoal] = useState('');

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        const profile = await getData('userProfile') || {};
        setName(profile.name || '');
        setAge(profile.age || '');
        setGoal(profile.goal || '');
    };

    const saveProfile = async () => {
        const profile = { name, age: parseInt(age), goal };
        await storeData('userProfile', profile);
        Alert.alert('Success', 'Profile updated successfully');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Profile</Text>
            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Age" keyboardType="numeric" value={age} onChangeText={setAge} />
            <TextInput style={styles.input} placeholder="Fitness Goal" value={goal} onChangeText={setGoal} />
            <Button title="Save Profile" onPress={saveProfile} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
});

export default ProfileScreen;