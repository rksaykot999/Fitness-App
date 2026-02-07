import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { getData, storeData } from '../utils/storage';

const SocialScreen = () => {
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        loadSocial();
    }, []);

    const loadSocial = async () => {
        const followingData = await getData('following') || [];
        const followersData = await getData('followers') || [];
        setFollowing(followingData);
        setFollowers(followersData);
    };

    const addFollowing = async () => {
        const newUser = { id: Date.now(), name: 'User ' + Date.now() };
        const updated = [...following, newUser];
        setFollowing(updated);
        await storeData('following', updated);
        Alert.alert('Success', 'User followed');
    };

    const removeFollowing = async (id) => {
        const updated = following.filter(f => f.id !== id);
        setFollowing(updated);
        await storeData('following', updated);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Social</Text>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Following ({following.length})</Text>
                <Button title="Follow Someone" onPress={addFollowing} />
                <FlatList
                    data={following}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.userItem}>
                            <Text>{item.name}</Text>
                            <Button title="Unfollow" onPress={() => removeFollowing(item.id)} />
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, },
    section: { marginBottom: 20, },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, },
    userItem: { padding: 10, marginBottom: 10, backgroundColor: '#f0f0f0', borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
});

export default SocialScreen;