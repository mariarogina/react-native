import React, {useState, useEffect} from 'react';
import {Text, Modal, View, TextInput, Button, StyleSheet} from 'react-native';

const UpdateBoot = props => {
  const [size, setSize] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    setSize(props.bootToUpdate == undefined ? '' : props.bootToUpdate.size);
    setType(props.bootToUpdate == undefined ? '' : props.bootToUpdate.type);
  }, [props.bootToUpdate]);

  const sizeInputHandler = par => {
    setId(par);
  };
  const typeInputHandler = par => {
    setType(par);
  };
  return (
    <Modal visible={props.visibility}>
      <View style={styles.inputstyle}>
        <TextInput
          style={styles.sizeinput}
          value={size}
          onChangeText={sizeInputHandler}
          placeholder="Boot size...."
        />
        <TextInput
          style={styles.typeinput}
          value={type}
          onChangeText={typeInputHandler}
          placeholder="Boot type...."
        />
      </View>
      <View style={styles.inputstyle}>
        <View style={styles.buttonstyle}>
          <Button title="Cancel" onPress={() => props.hideUpdateModal()} />
        </View>
        <View style={styles.buttonstyle}>
          <Button
            title="OK"
            onPress={() => props.bootUpdateHandler(id, type)}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  sizeinput: {
    backgroundColor: 'lightblue',
    width: '20%',
    borderColor: 'black',
    borderWidth: 2,
  },
  typeinput: {
    backgroundColor: 'lightblue',
    width: '70%',
    borderColor: 'black',
    borderWidth: 2,
  },
  inputstyle: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonstyle: {
    width: '30%',
  },
  listitemstyle: {
    backgroundColor: 'lightgreen',
    width: '90%',
    borderColor: 'red',
    borderWidth: 2,
    margin: 5,
  },
});

export default UpdateBoot;
