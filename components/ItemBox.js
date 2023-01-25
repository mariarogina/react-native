import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('window').width;

//component for a shopping list item
const ItemBox = ({item, handleProductUpdate, deleteProductFromDb}) => {
  //here swipe behavior is defined
  const rightSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      //touchable area for swipe confirmation button
      <TouchableOpacity onPress={deleteProductFromDb}>
        <View style={styles.deleteBox}>
          <Animated.Text style={{transform: [{scale: scale}]}}>
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <GestureHandlerRootView>
      {/* touchable area for short press (update) and swipe (delete)*/}
      <TouchableOpacity onPress={handleProductUpdate}>
        <Swipeable renderRightActions={rightSwipe}>
          <View style={styles.container}>
            <Text style={styles.listitemstyle}>
              {item.id}. {item.type}, {item.pcs} pcs
            </Text>
          </View>
        </Swipeable>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

export default ItemBox;

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: SCREEN_WIDTH,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 16,
  },
  deleteBox: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 80,
  },
  listitemstyle: {
    width: '90%',
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
});
