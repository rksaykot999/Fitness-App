import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { getData, storeData } from '../utils/storage';

const NutritionScreen = () => {  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');

  useEffect(() => {
    loadMeals();
  }, []);

  const loadMeals = async () => {
    const data = await getData('meals') || [];
    setMeals(data);
  };

  const addMeal = async () => {
    if (!mealName || !calories || !protein || !carbs) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newMeal = {
      id: Date.now(),
      name: mealName,
      calories: parseInt(calories),
      protein: parseInt(protein),
      carbs: parseInt(carbs),
      date: new Date().toISOString(),
    };

    const updatedMeals = [...meals, newMeal];
    setMeals(updatedMeals);
    await storeData('meals', updatedMeals);
    setMealName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    Alert.alert('Success', 'Meal logged');
  };

  const deleteMeal = async (id) => {
    const updatedMeals = meals.filter(m => m.id !== id);
    setMeals(updatedMeals);
    await storeData('meals', updatedMeals);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nutrition Tracking</Text>
      <TextInput style={styles.input} placeholder="Meal Name" value={mealName} onChangeText={setMealName} />
      <TextInput style={styles.input} placeholder="Calories" keyboardType="numeric" value={calories} onChangeText={setCalories} />
      <TextInput style={styles.input} placeholder="Protein (g)" keyboardType="numeric" value={protein} onChangeText={setProtein} />
      <TextInput style={styles.input} placeholder="Carbs (g)" keyboardType="numeric" value={carbs} onChangeText={setCarbs} />
      <Button title="Log Meal" onPress={addMeal} />
      <FlatList data={meals} keyExtractor={item => item.id.toString()} renderItem={({ item }) => (
        <View style={styles.mealItem}>
          <Text>{item.name} - {item.calories} cal</Text>
          <Text>Protein: {item.protein}g, Carbs: {item.carbs}g</Text>
          <Button title="Delete" onPress={() => deleteMeal(item.id)} />
        </View>
      )} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5, },
  mealItem: { padding: 10, marginBottom: 10, backgroundColor: '#f0f0f0', borderRadius: 5, },
});

export default NutritionScreen;
