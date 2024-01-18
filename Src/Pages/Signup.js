import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {SignUP} from '../Api';

const Signup = ({navigation}) => {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [load, setLoad] = useState('');

  const LoginUser = () => {
    if (!Name) {
      Alert.alert('Please enter your name');
      return false;
    } else if (!Email) {
      Alert.alert('Please enter your Email');
      return false;
    } else if (!Password) {
      Alert.alert('Please enter your Password');
      return false;
    }
    setLoad(true);

    SignUP({
      Name: Name,
      Email: Email,
      Password: Password,
    })
      .then(res => {
        if (res.message === 'success') {
          Alert.alert(res.message);
          navigation.navigate("Login")
          console.log(res.data);
        } else if (res.status === 'failed') {
          setLoad(false);
          Alert.alert(res.status);
        }
      })
      .catch(err => {
        setLoad(false);
        Alert.alert(err.message);
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: 'rgba(18, 18, 35, 1)'}}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(18, 18, 35, 1)',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text style={{color: '#fff', fontSize: 25, fontWeight: '500'}}>
            Sign Up
          </Text>
          <Text style={{color: '#fff', fontSize: 18, marginTop: 4}}>
            Please sign up to New account
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 3,
          backgroundColor: '#fff',
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
          elevation: 20,
          position: 'relative',
          bottom: 5,
        }}>
        <ScrollView>
          <View
            style={{
              width: '80%',
              alignSelf: 'center',
              marginTop: 30,
              marginBottom: 250,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  fontWeight: '500',
                }}>
                Name
              </Text>
              <TextInput
                value={Name}
                onChangeText={text => setName(text)}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(227, 238, 249, 1)',
                  padding: 15,
                  marginTop: 10,
                  borderRadius: 10,
                  fontSize: 18,
                  color: '#000',
                }}
                placeholder="Enter Your Name"></TextInput>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  fontWeight: '500',
                  marginTop: 10,
                }}>
                Email
              </Text>
              <TextInput
                value={Email}
                onChangeText={text => setEmail(text)}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(227, 238, 249, 1)',
                  padding: 15,
                  marginTop: 10,
                  borderRadius: 10,
                  fontSize: 18,
                  color: '#000',
                }}
                placeholder="Enter Your Email"></TextInput>
            </View>

            <View style={{marginTop: 10}}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  fontWeight: '500',
                }}>
                Password
              </Text>
              <TextInput
                value={Password}
                onChangeText={text => setPassword(text)}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(227, 238, 249, 1)',
                  padding: 15,
                  marginTop: 10,
                  borderRadius: 10,
                  fontSize: 18,
                  color: '#000',
                }}
                placeholder="Enter Your Password"></TextInput>
            </View>

            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                marginTop: 20,
                borderRadius: 8,
                backgroundColor: 'rgba(255, 118, 34, 1)',
              }}
              onPress={() => LoginUser()}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {load ? (
                  <ActivityIndicator></ActivityIndicator>
                ) : (
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#fff',
                    }}>
                    SIGN UP
                  </Text>
                )}
              </View>
            </TouchableOpacity>
            <Text
              style={{
                textAlign: 'center',
                marginTop: 20,
                fontSize: 16,
                fontWeight: '500',
                color: '#000',
              }}>
              Already Have Account?
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{
                    fontSize: 20,
                    position: 'relative',
                    top: 8,
                    color: 'rgba(255, 118, 34, 1)',
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
            </Text>
            {/* <Text
              style={{
                textAlign: 'center',
                marginTop: 20,
                fontSize: 20,
                color: 'grey',
              }}>
              Or
            </Text> */}
            {/* <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 30,
                }}>
                <Image source={require('../../Images/facebook.png')}></Image>
                <Image source={require('../../Images/Twitter.png')}></Image>
                <Image source={require('../../Images/Apple.png')}></Image>
              </View>
            </View> */}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Signup;
