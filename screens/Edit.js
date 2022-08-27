import React,{useState, useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { Container, ScrollView } from 'native-base';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

const Edit = ({navigation, route})=>{
  const [name, setName] = useState('');
  const [totalNoSeason, setTotalNoSeason] = useState('');
  const [id, setId] = useState(null);

  const update = async()=>{
    try{
      if(!name || !totalNoSeason){
        Snackbar.show("Please enter the value in both field");
        return;
      }

      const seasonToUpdate = {
        id,
        name,
        totalNoSeason,
        isWatched: false
      }

      const storedValue = await AsyncStorage.getItem('@seasonList');
      const list = JSON.parse(storedValue);

      list.map((singleSeason)=>{
        if(singleSeason.id == id){
          singleSeason.name = name;
          singleSeason.totalNoSeason = totalNoSeason;
        }
        return singleSeason;
      })

      await AsyncStorage.setItem('@seasonList', JSON.stringify(list));
      navigation.navigate('Home');
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    const {season} = route.params;
    const {id, name, totalNoSeason} = season;
    setId(id);
    setName(name);
    setTotalNoSeason(totalNoSeason)
  }, [])

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

<Button style={styles.button} onPress={update}>
<Text style={{color:"#eee"}}>Update</Text>
</Button>

     </ScrollView>
 </Container>

 </NativeBaseProvider>      
    )
}

export default Edit;


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
      maxWidth: 1000,
      justifyContent: 'flex-start',
    },
    heading: {
      textAlign: 'center',
      fontSize: 25,
      color: '#00b7c2',
      marginHorizontal: 5,
      marginTop: 50,
      marginBottom: 20,
      marginLeft: 80,
    },
    formItem: {
      marginBottom: 20,
      backgroundColor: '#CAD5E2',
      borderRadius: 15,
      marginLeft: 70,
      textAlign: "center",
    },
    button:{
      width: 120,
      marginLeft: 110,
      backgroundColor:'#00b7c2'
    },
  });