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
import {
  init,
  addProduct,
  updateProduct,
  deleteProduct,
  fetchAllProducts,
} from './db/db';
import ItemBox from './components/ItemBox';

init()
  .then(() => {
    console.log('Database creation succeeded!');
  })
  .catch(err => {
    console.log('Database IS NOT initialized! ' + err);
  });

const App = () => {
  const [productList, setProductList] = useState([]);
  const [saveupdate, setSaveUpdate] = useState('Save');
  const [updateIndex, setUpdateIndex] = useState(-1);
  const [type, setType] = useState('');
  const [pcs, setPcs] = useState('');

  const handleType = text => {
    setType(text);
  };
  const handlePcs = text => {
    setPcs(text);
  };

  async function saveProduct() {
    if (updateIndex >= 0) {
      updateProductInDb();
    } else {
      try {
        const dbResult = await addProduct(type, pcs);
        console.log('dbResult: ' + dbResult); //For debugging purposes to see the data in the console screen
        await readAllProducts();
      } catch (err) {
        console.log(err);
      } finally {
        setType('');
        setPcs('');
      }
    }
  }

  const saveProductNotEmpty = (type, pcs) => {
    if (type !== '' && pcs !== '') {
      saveProduct();
    } else {
      alert('Please enter type and pcs');
    }
  };
  const handleProductUpdate = index => {
    setUpdateIndex(index);
    setType(productList[index].type);
    setPcs('' + productList[index].pcs); //Must be changed to string, because used in value property of TextInput
    setSaveUpdate('Update');
  };
  async function deleteProductFromDb(id) {
    try {
      const dbResult = await deleteProduct(id);
      await readAllProducts();
    } catch (err) {
      console.log(err);
    } finally {
      //No need to do anything
    }
  }
  async function updateProductInDb() {
    try {
      const dbResult = await updateProduct(
        productList[updateIndex].id,
        type,
        pcs,
      );
      await readAllProducts();
    } catch (err) {
      console.log(err);
    } finally {
      setUpdateIndex(-1);
      setSaveUpdate('Save');
      setType('');
      setPcs('');
    }
  }
  async function readAllProducts() {
    try {
      const dbResult = await fetchAllProducts();
      console.log('dbResult readAllFish in App.js');
      console.log(dbResult);
      setProductList(dbResult);
    } catch (err) {
      console.log('Error: ' + err);
    } finally {
      console.log('All Products are read!');
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        value={type}
        placeholder={'type'}
        onChangeText={handleType}
        style={styles.inputstyle}
      />
      <TextInput
        value={pcs}
        placeholder={'pcs'}
        onChangeText={handlePcs}
        style={styles.inputstyle}
      />
      <View style={styles.button}>
        <Button
          title={saveupdate}
          color={saveupdate === 'Update' ? '#3498DB' : 'green'}
          onPress={() => saveProductNotEmpty(type, pcs)}
        />
        <View style={styles.seperatorLine}></View>
        <Button
          title="Read"
          color="#F39C12"
          onPress={() => readAllProducts()}
        />
      </View>
      <Text style={styles.title}>The Products</Text>
      <FlatList
        data={productList}
        renderItem={({item, index}) => {
          return (
            <View style={styles.itembox}>
              <ItemBox
                item={item}
                handleProductUpdate={() => handleProductUpdate(index)}
                deleteProductFromDb={() => deleteProductFromDb(item.id)}
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
