import * as React from 'react'
import Constants from 'expo-constants'
import { StyleSheet, View, StatusBar, Alert } from 'react-native';

import TextAnimator from './components/TextAnimator';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden/>
      <TextAnimator
        textStyle={styles.textStyle}
        content="If you want the rainbow, you gotta put up with the rain 🌈"
        duration={1000}
        onFinish={_onFinish}
      />
    </View>
  );
}

const _onFinish = () => {
  // return Alert.alert('Animation', "It's Done!");
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    paddingTop: Constants.statusBarHeight
  },
  textStyle: {
    fontSize: 28,
    fontWeight: 'bold',
  }
});
