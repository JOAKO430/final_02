import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const PresentacionScreen: React.FC = () => {
  const navigation = useNavigation();

  const navigateToInicio = () => {
    navigation.navigate('Inicio');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToInicio}>
        <Image source={require('./imagenes/anime-logo-square.png')} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  image: {
    width: 350,
    height: 200,
  },
});

export default PresentacionScreen;
