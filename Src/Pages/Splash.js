import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const Splash = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image resizeMode="cover" source={require('../../Images/Splash.png')} />
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{
          position: 'absolute',
          bottom: '10%',
          width: 300,
          backgroundColor: 'rgba(255, 118, 34, 1)',
          alignSelf: 'center',
          padding: 5,
          borderRadius: 8,
        }}>
        <Text style={styles.title}>Location Tracking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: '500',
    textAlign: 'center',
    color: '#fff',
  },
});

export default Splash;
