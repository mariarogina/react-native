import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, FlatList} from 'react-native';
import {init, addBoot, updateBoot, deleteBoot, fetchAllBoot} from './db/db';

init()
  .then(() => {
    console.log('Database creation succeeded!');
  })
  .catch(err => {
    console.log('Database IS NOT initialized! ' + err);
  });

const App = () => {
  const [isInserted, setIsInserted] = useState(false);
  const [bootList, setBootList] = useState([]);
  async function saveFish() {
    try {
      const dbResult = await addBoot('33', 'booty boot');
      console.log('dbResult: ' + dbResult); //For debugging purposes to see the data in the console screen
    } catch (err) {
      console.log(err);
    } finally {
      //No need to do anything
    }
  }
  async function deleteBootFromDb() {
    try {
      const dbResult = await deleteBoot(2);
    } catch (err) {
      console.log(err);
    } finally {
      //No need to do anything
    }
  }
  async function updateBootInDb() {
    try {
      const dbResult = await updateBoot(3, '44', 'tiny boot');
    } catch (err) {
      console.log(err);
    } finally {
      //No need to do anything
    }
  }
  async function readAllBoot() {
    // await fetchAllFish()
    // .then((res)=>{//The parametr res has the value which is returned from the fetchAllFish function in db.js
    //   console.log(res);//For debugging purposes to see the data in the console screen
    //   setFishList(res);
    // })
    // .catch((err)=>{console.log(err)})
    // .finally(()=>{console.log("All fish are read")});//For debugging purposes to see the routine has ended

    //The above commented can be used as well as the code below

    try {
      const dbResult = await fetchAllBoot();
      console.log('dbResult readAllBoot in App.js');
      console.log(dbResult);
      setBootList(dbResult);
    } catch (err) {
      console.log('Error: ' + err);
    } finally {
      console.log('All boot are red - really?');
    }
  }
  return (
    <View>
      <Text>The fishlist</Text>
      <Button title="Save" onPress={() => saveBoot()} />
      <Button title="Read" onPress={() => readAllBoot()} />
      <Button title="Delete" onPress={() => deleteBootFromDb()} />
      <Button title="Update" onPress={() => updateBootInDb()} />
      <FlatList
        data={bootList}
        renderItem={item => (
          <View>
            <Text>
              {item.item.id} {item.item.size} {item.item.type}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default App;
