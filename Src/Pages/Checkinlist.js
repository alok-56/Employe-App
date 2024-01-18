import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {GetAllCheck} from '../Api';
import {useFocusEffect} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import TimeAgo from 'react-native-timeago';

const CheckIn = () => {
  const [checkInData, setCheckInData] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    GetCheckin;
  }, []);

  useFocusEffect(
    useCallback(() => {
      GetCheckin();
    }, []),
  );

  const GetCheckin = async () => {
    setLoader(true);
    GetAllCheck().then(res => {
      console.log(res.data);
      setCheckInData(res.data.reverse());
      setLoader(false);
    });
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Latitude</Text>
        <Text style={styles.value}>{item.Lat}</Text>
      </View>

      <View style={styles.rowContainer}>
        <Text style={styles.label}>Longitude</Text>
        <Text style={styles.value}>{item.Lon}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>timestamp</Text>
        <Text style={styles.value}>
          <TimeAgo time={item.createdAt} />
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <>
        {loader ? (
          <ActivityIndicator
            size={30}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}></ActivityIndicator>
        ) : (
          <ScrollView>
            {checkInData.length < 1 ? (
              <Text style={{textAlign: 'center', fontSize: 20, color: '#000'}}>
                No Data
              </Text>
            ) : (
              <FlatList
                data={checkInData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
              />
            )}
          </ScrollView>
        )}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  listContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    width: '90%',
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 5,
    elevation: 3,
    alignSelf: 'center',
    marginTop: 10,
  },
  rowContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 15,
    color: '#3498db',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
});

export default CheckIn;
