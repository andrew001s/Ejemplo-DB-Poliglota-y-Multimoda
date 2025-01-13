import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import People from './components/People';

export default function App() {
  const [id, setId] = useState('');
  const [intereses, setIntereses] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (intereses) { 
      
      fetch(`http://localhost:3000/users/?id=${id}&category=${intereses.toLowerCase()}`)
      //fetch(`http://localhost:3000/users//multimodal/?id=${id}&category=${intereses.toLowerCase()}`)
        .then((response) => response.json())
        .then((data) => setUsers(data))
        .catch((error) => console.error('Error fetching users:', error));
    }
    else{
      fetch(`http://localhost:3000/users/?id=${id}`)
      //fetch(`http://localhost:3000/users/multimodal/?id=${id}&category=${intereses.toLowerCase()}`)
        .then((response) => response.json())
        .then((data) => setUsers(data))
        .catch((error) => console.error('Error fetching users:', error));
    }
  }, [id, intereses]); 

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sugerencias De Amistad</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Id"
          style={styles.input}
          value={id}
          onChangeText={setId}
        />
        <TextInput
          placeholder="Intereses"
          style={styles.input}
          value={intereses}
          onChangeText={setIntereses}
        />
      </View>
        <People users={users} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 50,
    backgroundColor: '#1f1f1f',
    alignItems: 'left',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#1f1f1f',
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    padding: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: 160, 
  },
  form: {
    paddingLeft: 20,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#1f1f1f',
    color: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: 200, 
  },
});
