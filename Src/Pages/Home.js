import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Geolocation from '@react-native-community/geolocation';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import Carousel from 'react-native-snap-carousel';
import {Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveCheck} from '../Api';
import {useFocusEffect} from '@react-navigation/native';

const fetchLocation1 = () => {
  Geolocation.getCurrentPosition(position => {
    return position;
  });
};

const Home = ({navigation}) => {
  const [location, setLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);

  const fetchLocation = () => {
    Geolocation.getCurrentPosition(position => {
      setLocation(position);
    });
  };

  useEffect(() => {
    fetchLocation();
    startTracking();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchLocation();
    }, []),
  );

  const startTracking = () => {
    ReactNativeForegroundService.add_task(
      () => {
        fetchLocation();
      },
      {
        delay: 1000,
        onLoop: true,
        taskId: 'taskid',
      },
    );
    ReactNativeForegroundService.start({
      id: 1244,
      title: 'Employee Tracker',
      message: 'Location Tracking',
      icon: 'ic_launcher',
      button: true,
      button2: true,
      buttonText: 'Stop Tracking',
      buttonOnPress: stopTracking,
      setOnlyAlertOnce: true,
      color: '#000000',
    });
    AddCheckLocation();
    setIsTracking(true);
  };

  const stopTracking = () => {
    ReactNativeForegroundService.stopAll();
    setIsTracking(false);
    setLocation(null);
  };

  // Example carousel data
  const carouselData = [
    {image: require('../../Images/slide1.jpg')},
    {image: require('../../Images/slide2.jpg')},
    {image: require('../../Images/slide3.jpg')},
  ];

  const renderCarouselItem = ({item}) => (
    <View style={styles.carouselItem}>
      <Image
        style={{
          height: '100%',
          width: '100%',
          borderRadius: 8,
        }}
        source={item.image}></Image>
    </View>
  );

  const AddCheckLocation = async () => {
    Geolocation.getCurrentPosition(async loc => {
      let id = await AsyncStorage.getItem('id');
      saveCheck({
        Lat: loc ? loc.coords.latitude.toFixed(6) : null,
        Lon: loc ? loc.coords.longitude.toFixed(6) : null,
        UserId: id,
      }).then(res => {
        console.log(res);
      });
    });
  };

  const logout = async () => {
    await AsyncStorage.clear();
    Alert.alert('Logout Successfully');
    navigation.navigate('Login');
    stopTracking();
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ecf0f1',
        padding: 20,
      }}>
      <View style={styles.carouselContainer}>
        <Carousel
          data={carouselData}
          renderItem={renderCarouselItem}
          sliderWidth={400}
          itemWidth={300}
          layout="default"
          loop={true}
          autoplay={true}
        />
      </View>

      <View style={styles.trackingContainer}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            {backgroundColor: isTracking ? '#e74c3c' : '#3498db'},
          ]}
          onPress={isTracking ? stopTracking : startTracking}>
          <Text style={styles.buttonText}>
            {isTracking ? 'Stop Tracking' : 'Start Tracking'}
          </Text>
        </TouchableOpacity>

        <View style={styles.locationContainer}>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>Latitude:</Text>
            <Slider
              style={styles.slider}
              minimumValue={-90}
              maximumValue={90}
              value={location ? location.coords.latitude : 0}
              minimumTrackTintColor="#3498db"
              maximumTrackTintColor="#bdc3c7"
              thumbTintColor="#3498db"
              disabled={true}
            />
            <Text style={styles.sliderValue}>
              {location ? location.coords.latitude.toFixed(6) : 'N/A'}
            </Text>
          </View>

          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>Longitude:</Text>
            <Slider
              style={styles.slider}
              minimumValue={-180}
              maximumValue={180}
              value={location ? location.coords.longitude : 0}
              minimumTrackTintColor="#e74c3c"
              maximumTrackTintColor="#bdc3c7"
              thumbTintColor="#e74c3c"
              disabled={true}
            />
            <Text style={styles.sliderValue}>
              {location ? location.coords.longitude.toFixed(6) : 'N/A'}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ecf0f1',
    padding: 20,
  },
  carouselContainer: {
    height: 200,
    marginBottom: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackingContainer: {
    marginTop: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  actionButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  locationContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  sliderLabel: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 5,
  },
  slider: {
    width: '80%',
    height: 40,
  },
  sliderValue: {
    fontSize: 18,
    color: '#2c3e50',
    marginTop: 5,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 30,
    width: '90%',
    alignSelf: 'center',
    height: 50,
    borderRadius: 8,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  carouselItem: {
    height: 150,
    backgroundColor: '#3498db',
    borderRadius: 10,
    width: 300,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  carouselDescription: {
    fontSize: 14,
    color: '#fff',
    marginTop: 10,
  },
});

export default Home;
