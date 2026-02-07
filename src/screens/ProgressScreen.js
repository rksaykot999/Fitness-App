import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getData } from '../utils/storage';

const ProgressScreen = () => {
    const [stats, setStats] = useState({});
    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        const workouts = await getData('workouts') || [];
        const totalWorkouts = workouts.length;
        const totalWeight = workouts.reduce((sum, w) => sum + w.weight, 0);
        const avgWeight = totalWorkouts > 0 ? (totalWeight / totalWorkouts).toFixed(2) : 0;
        setStats({ totalWorkouts, totalWeight, avgWeight });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Progress Tracking</Text>
            <View style={styles.statCard}>
                <Text style={styles.label}>Total Workouts</Text>
                <Text style={styles.value}>{stats.totalWorkouts}</Text>
            </View>
            <View style={styles.statCard}>
                <Text style={styles.label}>Total Weight Lifted (kg)</Text>
                <Text style={styles.value}>{stats.totalWeight}</Text>
            </View>
            <View style={styles.statCard}>
                <Text style={styles.label}>Average Weight (kg)</Text>
                <Text style={styles.value}>{stats.avgWeight}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, },
    statCard: { padding: 20, marginBottom: 15, backgroundColor: '#e3f2fd', borderRadius: 10, alignItems: 'center', },
    label: { fontSize: 14, color: '#666', marginBottom: 5, },
    value: { fontSize: 28, fontWeight: 'bold', color: '#1976d2', },
});

export default ProgressScreen;