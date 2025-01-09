import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const People = ({ users }: { users: any[] }) => {
  return (
    <View style={styles.container}>
      {users.map((user: any, index: number) => (
        <View key={`${user.id}-${index}`} style={styles.card}>
          <Image 
            style={styles.image} 
            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKAxB01R_0RSWA6Mo7WZFauEU-LX0oeFokLg&s" }} 
          />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.interests}>
            {user.interests && user.interests.length > 0 
              ? `${user.interests[0]} - ${user.interests[1] || ''}` 
              : 'No interests available'}
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.likeButton}>
              <Text style={styles.likeText}>❤️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dislikeButton}>
              <Text style={styles.dislikeText}>❌</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  interests: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  likeButton: {
    backgroundColor: '#ff6b81',
    padding: 12,
    borderRadius: 50,
    width: 60,
    alignItems: 'center',
  },
  dislikeButton: {
    backgroundColor: '#cccccc',
    padding: 12,
    borderRadius: 50,
    width: 60,
    alignItems: 'center',
  },
  likeText: {
    fontSize: 18,
    color: '#fff',
  },
  dislikeText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default People;
