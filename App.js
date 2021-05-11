import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator, FlatList, Text, View, StatusBar, Button, Alert } from 'react-native';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [jokeType, setJokeType] = useState("");

 
 // console.log(data) // uncomment for testing purposes

  // Fetching data (JSON) from designated api address
  useEffect(() => {
    fetch('https://v2.jokeapi.dev/joke/' + jokeType)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [jokeType]);

 

  return (
    <SafeAreaView style={{ flex: 1 }}>
      
      <View style={styles.container}>
      
        <StatusBar barStyle="dark-content" />
        
        <Text style={{ paddingTop: 10, paddingBottom: 10, textAlign: 'center', fontSize: 25 }}>Jokes for you:</Text>
      
        <View>
        
  {/* Noticable button to pop up warning message about contents of some jokes */}
        <Button 
        title="Press me first!"
        color="red"
       onPress={ () => Alert.alert(
        "Warning",
        "Some jokes contains nsfw, racist, sexist and other improper content. Viewer discretion is advised.",
        [
         
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      )}
        />
         {/* Here are the buttons to use modified api address */}
        </View>
        <View style={styles.separator} />
        <View style={styles.space} />
        <Text style={{ paddingTop: 10, paddingBottom: 10, textAlign: 'center', fontSize: 25 }}>Choose your category:</Text>
        
        
        {/* Buttons are added here*/}
        <View style={styles.fixToText}>
        <Button style={styles.button}
          onPress={() => setJokeType("Programming")}
          title="Programming"
        />
        <Button style={styles.button}
          onPress={() => setJokeType("Miscellaneous")}
          title="Miscellaneous"
        />
        </View>

        <View style={styles.space} />

        <View style={styles.fixToText}>
        <Button style={styles.button}
          onPress={() => setJokeType("Dark")}
          title="Dark"
        />
        <Button style={styles.button}
          onPress={() => setJokeType("Pun")}
          title="Pun"
        />
        </View>
        

        <View style={styles.separator} />

       { /* ActivityIndicator is showing when loading. 
            Flatlist is used to pick up data by keys from the fetched data
            and using item."key" to print it*/ }

        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={[data]}
            keyExtractor={({ id }, index) => index.toString()}
            renderItem={({ item }) => (

              <View>
                <Text style={{ marginLeft: 5 }}>Category: {item.category} </Text>
                <Text>  </Text>
                <Text style={{ marginLeft: 5 }}>{item.joke}</Text>
                <Text style={{ marginLeft: 5 }}>{item.setup}</Text>
                <Text style={{ marginLeft: 5 }}>{item.delivery}</Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );

}




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
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  space: {
    width: 20,
    height: 20,
  },
  separator: {
    marginVertical: 10,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
