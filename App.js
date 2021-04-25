import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator, FlatList, Text, View, StatusBar } from 'react-native';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data)


  useEffect(() => {
    fetch('https://v2.jokeapi.dev/joke/Any')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);


  return (
     <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={{ width: '100%', paddingTop: 10, paddingBottom: 10, textAlign: 'center', fontSize: 15 }}>Joke:</Text>
      {isLoading ? <ActivityIndicator /> : (
        <FlatList
          data={[data]}
          keyExtractor={({ id }, index) => id.toString()}
          renderItem={({ item }) => (
            <View>
              
              <Text style={{marginLeft:5}}>Category: {item.category} </Text>
              <Text style={{marginLeft:5}}>{item.joke}</Text>
              <Text style={{marginLeft:5}}>{item.setup}</Text>
              <Text style={{marginLeft:5}}>{item.delivery}</Text>
            </View>
          )}
        />
      )}
    </View>
      </SafeAreaView>
  );
};





const styles = StyleSheet.create({
  container: {
    backgroundColor: "#77868d",
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 30,
  },
  item: {
    padding: 10,
    fontSize: 10,
    height: 44,
    marginHorizontal: 10,
    marginTop: 20,
  },
  category: {
    padding: 10,
    fontSize: 18,
    height: 44,
    marginHorizontal: 10,
    marginTop: 20,
  },
  row: {
    flex: 1,
    padding: 4,

  }
});
