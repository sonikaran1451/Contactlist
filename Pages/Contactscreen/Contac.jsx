import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View,Image} from 'react-native';
import Contacts from 'react-native-contacts';
import {PermissionsAndroid} from 'react-native';

const Contac = () => {
  const [data, setdata] = useState(undefined);

  useEffect(() => {
    const requestContactsPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts',
            message: 'This app would like to view your contacts.',
            buttonPositive: 'Please accept bare mortal',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          fetchContacts();
        } else {
          console.log('Contacts permission denied');
        }
      } catch (error) {
        console.error('Permission error: ', error);
      }
    };
    requestContactsPermission();
  }, []);
  const fetchContacts = async () => {
    try {
      const contacts = await Contacts.getAll();
      setdata(contacts);
    } catch (error) {
      console.error('Error fetching contacts: ', error);
    }
  };

  return (
  
      <View style={styles.container}>
        {data == undefined ? (
          null
        ) : (
          <FlatList
          data={data} // Limit the rendered items
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
        )}
      
      </View>
   
  );
};

const styles = StyleSheet.create({});

const renderItem = ({item}) => {
  {
   
    if(item.thumbnailPath){
        console.log(item?.thumbnailPath);
    }
  }
  return (
    <View>
      <Text>{item?.displayName}</Text>
      {/* {item.phoneNumber === null ? (<Text></Text>): (<Text>{item.phoneNumber.number}</Text>)} */}
      <Text>{((item.phoneNumbers)[0]?.number)}</Text>
      {
        item.thumbnailPath ?  (
        // Render this if condition is true
        <Image source={{uri:  item.thumbnailPath}} style={{height:100,width:100}} />
      ) :(null)
      }
    </View>
  );
};
export default Contac;
