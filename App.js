import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator, FlatList, Text, View } from 'react-native';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data)
  

  useEffect(() => {
    fetch('https://v2.jokeapi.dev/joke/Any?format=json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {isLoading ? <ActivityIndicator /> : (
            <FlatList
              data={[data]}
              keyExtractor={({ id }, index) => id.toString()}
              renderItem={({ item }) => (
                <Text>
                  {item.category},
                  {item.type},
                  {item.setup}
                  {item.delivery}
                  {item.joke}
                </Text>

              )}
            />
          )}
        </View>
      </SafeAreaView>
    );
  };





const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 30,
  },
  item: {
    padding: 10,
    fontSize: 18,
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
});
