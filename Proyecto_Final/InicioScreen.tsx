import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { SvgXml } from 'react-native-svg';

const InicioScreen: React.FC = () => {
  const navigation = useNavigation();
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const snapshot = await firestore().collection('Anime').get();
        const fetchedAnimes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAnimes(fetchedAnimes);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener animes:', error);
        setLoading(false);
      }
    };

    fetchAnimes();
  }, []);

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const svgIcon = `
    <svg width="181px" height="181px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ededed" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)">
      <g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0.7200000000000006,0.7200000000000006), scale(0.94)">
        <rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="14.4" fill="#949494" strokewidth="0"/>
      </g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.048"/>
      <g id="SVGRepo_iconCarrier">
        <path d="M3 11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11 3H13C16.7712 3 18.6569 3 19.8284 4.17157C21 5.34315 21 7.22876 21 11V13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V11Z" stroke="#33363F" stroke-width="2"/>
        <path d="M12 8L12 16" stroke="#33363F" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
        <path d="M16 12L8 12" stroke="#33363F" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
      </g>
    </svg>
  `;

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={animes}
          renderItem={({ item }) => (
            <View style={styles.animeCard}>
              <Image source={{ uri: item.ImagenURL }} style={styles.image} />
              <Text style={styles.title}>{item.Nombre}</Text>
              <Text style={styles.info}>Episodios: {item.Episodios}</Text>
              <Text style={styles.info}>Fecha de emisión: {item.FechaEmision}</Text>
              <Text style={styles.info}>Descripción: {item.Descripcion}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      <TouchableOpacity style={styles.addButton} onPress={navigateToLogin}>
        <SvgXml xml={svgIcon} width="48" height="48" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animeCard: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 70,
    right: 25,
    width: 50,
    height: 50,
  },
});

export default InicioScreen;
