import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';

const exerciseDatabase = [
    { id: 1, name: 'Bench Press', category: 'Chest' },
    { id: 2, name: 'Squats', category: 'Legs' },
    { id: 3, name: 'Deadlifts', category: 'Back' },
    { id: 4, name: 'Pull-ups', category: 'Back' },
    { id: 5, name: 'Shoulder Press', category: 'Shoulders' },
    { id: 6, name: 'Bicep Curls', category: 'Arms' },
];

const ExerciseLibraryScreen = () => {
    const [search, setSearch] = useState('');
    const [exercises, setExercises] = useState(exerciseDatabase);

    const handleSearch = (text) => {
        setSearch(text);
        const filtered = exerciseDatabase.filter(ex => ex.name.toLowerCase().includes(text.toLowerCase()) );
        setExercises(filtered);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Exercise Library</Text>
            <TextInput style={styles.input} placeholder="Search exercises..." value={search} onChangeText={handleSearch} />
            <FlatList data={exercises} keyExtractor={item => item.id.toString()} renderItem={({ item }) => (
                <View style={styles.exerciseItem}>
                    <Text style={styles.exerciseName}>{item.name}</Text>
                    <Text style={styles.category}>{item.category}</Text>
                </View>
            )} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5, },
    exerciseItem: { padding: 15, marginBottom: 10, backgroundColor: '#f0f0f0', borderRadius: 5, },
    exerciseName: { fontSize: 16, fontWeight: 'bold', },
    category: { fontSize: 12, color: '#666', marginTop: 5, },
});

export default ExerciseLibraryScreen;