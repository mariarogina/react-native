import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {init, addBoot, updateBoot, deleteBoot, fetchAllBoots} from './db/db';
import ItemBox from './components/ItemBox';

init()
  .then(() => {
    console.log('Database creation succeeded!');
  })
  .catch(err => {
    console.log('Database IS NOT initialized! ' + err);
  });

const App = () => {
  const [bootList, setBootList] = useState([]);
  const [saveupdate, setSaveUpdate] = useState('Save');
  const [updateIndex, setUpdateIndex] = useState(-1);
  const [type, setType] = useState('');
  const [size, setSize] = useState('');

  const handleType = text => {
    setType(text);
  };
  const handleSize = text => {
    setSize(text);
  };

  async function saveBoot() {
    if (updateIndex >= 0) {
      updateBootInDb();
    } else {
      try {
        const dbResult = await addBoot(type, size);
        console.log('dbResult: ' + dbResult); //For debugging purposes to see the data in the console screen
        await readAllBoots();
      } catch (err) {
        console.log(err);
      } finally {
        setType('');
        setSize('');
      }
    }
  }

  const saveBootNotEmpty = (type, size) => {
    if (type !== '' && size !== '') {
      saveBoot();
    } else {
      alert('Please enter type and size');
    }
  };
  const handleBootUpdate = index => {
    setUpdateIndex(index);
    setType(bootList[index].type);
    setSize('' + bootList[index].size); //Must be changed to string, because used in value property of TextInput
    setSaveUpdate('Update');
  };
  async function deleteBootFromDb(id) {
    try {
      const dbResult = await deleteBoot(id);
      await readAllBoots();
    } catch (err) {
      console.log(err);
    } finally {
      //No need to do anything
    }
  }
  async function updateBootInDb() {
    try {
      const dbResult = await updateBoot(bootList[updateIndex].id, type, size);
      await readAllBoots();
    } catch (err) {
      console.log(err);
    } finally {
      setUpdateIndex(-1);
      setSaveUpdate('Save');
      setType('');
      setSize('');
    }
  }
  async function readAllBoots() {
    try {
      const dbResult = await fetchAllBoots();
      console.log('dbResult readAllFish in App.js');
      console.log(dbResult);
      setBootList(dbResult);
    } catch (err) {
      console.log('Error: ' + err);
    } finally {
      console.log('All Boots are read!');
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        value={type}
        onChangeText={handleType}
        style={styles.inputstyle}
      />
      <TextInput
        value={size}
        onChangeText={handleSize}
        style={styles.inputstyle}
      />
      <View style={styles.button}>
        <Button
          title={saveupdate}
          color={saveupdate === 'Update' ? '#3498DB' : 'green'}
          onPress={() => saveBootNotEmpty(type, size)}
        />
        <View style={styles.seperatorLine}></View>
        <Button title="Read" color="#F39C12" onPress={() => readAllBoots()} />
      </View>
      <Text style={styles.title}>The Boots</Text>
      <FlatList
        data={bootList}
        renderItem={({item, index}) => {
          return (
            <View style={styles.itembox}>
              <ItemBox
                item={item}
                handleBootUpdate={() => handleBootUpdate(index)}
                deleteBootFromDb={() => deleteBootFromDb(item.id)}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputstyle: {
    borderColor: 'black',
    borderWidth: 2,
    padding: 5,
    width: '90%',
    margin: 5,
  },

  container: {flex: 1, alignItems: 'center', display: 'flex', width: '100%'},

  seperatorLine: {
    height: 1,
  },

  button: {
    width: '90%',
    margin: 5,
  },

  itembox: {
    width: '100%',
    margin: 7,
  },

  title: {
    fontWeight: '500',
    fontSize: 18,
  },
});

export default App;
