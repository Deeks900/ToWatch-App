import React, {useState} from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';
import shortid from 'shortid';
import AsyncStorage from '@react-native-community/async-storage';
import { Center, Container, Button} from 'native-base';
import { NativeBaseProvider } from 'native-base';
import { Snackbar, TextInput } from 'react-native-paper';

const Add = ({navigation, route})=>{
    const [name, setName] = useState('');
    const [totalNoSeason, setTotalNoSeason] = useState('');
    
    const addToList = async()=>{
      try{
        if(!name || !totalNoSeason){
          Snackbar.show('Please add both fields');
          return;
        }

        const seasonToAdd = {
          id: shortid.generate(),
          name: name,
          totalNoSeason: totalNoSeason,
          isWatched: false,
        }

        const storedValue = await AsyncStorage.getItem('@seasonList')
        const prevList = await JSON.parse(storedValue);

        if(!prevList){
          const newList = [seasonToAdd];
          await AsyncStorage.setItem('@seasonList', JSON.stringify(newList))
        }
        else{
          prevList.push(seasonToAdd);
          await AsyncStorage.setItem('@seasonList', JSON.stringify(prevList))
        }

        navigation.navigate('Home');
      }
      catch(error){
        console.log(error)
      }
    }

    return(
        <NativeBaseProvider>
             <Container style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <Text style={styles.heading}>Add to Watch List</Text>
                <TextInput 
                mode="outlined"
                placeholder="Season Name"
                underlineColor='#00b7c2'
                outlineColor='#00b7c2'
                selectionColor='#00b7c2'
                activeOutlineColor='#00b7c2'
                activeUnderlineColor='#00b7c2'
                style={styles.formItem}
                value={name}
                onChangeText={(text) => setName(text)}
               
    />

    <TextInput
     placeholder='Total Number of Seasons'
     underlineColor='#00b7c2'
     outlineColor='#00b7c2'
     selectionColor='#00b7c2'
     activeOutlineColor='#00b7c2'
     activeUnderlineColor='#00b7c2'
     mode="outlined"
     style={styles.formItem}
     value={totalNoSeason}
     onChangeText={totalNoSeason => setTotalNoSeason(totalNoSeason)}

     />

     <Button style={styles.button} onPress={addToList}>
      <Text style={{color:"#eee"}}>Add</Text>
     </Button>
            </ScrollView>
        </Container>
     
        </NativeBaseProvider>
          
    )
}

export default Add;
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
      marginLeft:0,
      paddingLeft: 0,
      maxWidth: 1000,
      justifyContent: 'flex-start',
    },
    button:{
      width: 120,
      marginLeft: 110,
    },
    heading: {
      textAlign: 'center',
      fontSize: 24,
      color: '#00b7c2',
      marginHorizontal: 5,
      marginTop: 50,
      marginBottom: 20,
      marginLeft: 80,
      textDecorationLine:'underline'
    },
    formItem: {
      marginBottom: 20,
      backgroundColor: '#CAD5E2',
    //   textColor: '#00b7c2',
    //   borderColor: "grey",
      borderRadius: 15,
    //   textDecorationLine: "none",
    //   padding: 2,
    marginLeft: 70,
      textAlign: "center",
      
    },
  });
  