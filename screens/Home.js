import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, ScrollView, Image} from 'react-native';
import { FAB} from 'react-native-paper';
import { NativeBaseProvider } from 'native-base';
import {Container, Spinner} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { List, IconButton, Checkbox } from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native'

const Home = ({navigation, route})=>{
    const [listOfSeasons, setListOfSeasons] = useState([]);
    // const [checked, setChecked] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const isFocused = useIsFocused();

    const getList = async()=>{
      setLoading(true);
      const storedValue = await AsyncStorage.getItem('@seasonList');
      if(!storedValue){
        setListOfSeasons([]);
      }
      else{
        const list = JSON.parse(storedValue);
        setListOfSeasons(list);
      }
      
      setLoading(false);

    }

    const deleteSeason = async(id)=>{
      const newList = await listOfSeasons.filter((list)=>list.id != id)
      await AsyncStorage.setItem('@seasonList', JSON.stringify(newList));
      setListOfSeasons(newList);
    } 

    const markComplete = async(id)=>{
      const newList = listOfSeasons.map((list)=>{
        if(list.id == id){
          list.isWatched = !list.isWatched;
        }
        return list
      })
      await AsyncStorage.setItem('@seasonList', JSON.stringify(newList));
      setListOfSeasons(newList);
    }

    //Run when app will mount and when this screen willbe in focus
    useEffect(()=>{
      getList();
    }, [isFocused])

    if(loading){
      return (
        <NativeBaseProvider>
           <Container style={styles.container}>
          <Spinner color="#00b7c2" style={{position:'absolute', top:290, left:160}}/>
        </Container>
        </NativeBaseProvider>
       
      )
    }
    
    return(
        <NativeBaseProvider>
             <ScrollView contentContainerStyle={styles.container}>
            <Text>List of seasons goes here</Text>
            {listOfSeasons?.length == 0 ? (
              <Container style={styles.container}>
                <Text style={styles.heading}>Watch List is Empty.Please add a season</Text>
              </Container>
            ) : (
              <>
              <Text style={styles.heading}>Next Series To Watch</Text>
              {listOfSeasons.map((season)=>(
                   <List.Item
                   key={season.id}
                   style={styles.listItem}
                     title={season.name}
                     titleStyle={{color:"white"}}
                     description={`${season.totalNoSeason} to watch`}
                     descriptionStyle={{color:"white"}}
                     // left={(props)=><List.Icon {...props}  color="white" icon="delete-empty" style={styles.actionButton} />}
                     left={props=>(
                       <>
                       <IconButton mode="outlined" animated="true" iconColor="white" style={styles.actionBtn1} icon="delete-empty" onPress={()=>{deleteSeason(season.id)}}/>
                       <IconButton mode="outlined" animated="true" iconColor="white" style={styles.actionBtn2} icon="pencil-box-multiple" onPress={()=>{navigation.navigate('Edit', {season})}}/>
                       </>
                     )}
                     right={props=>(
                       <Checkbox
           status={season.isWatched ? 'checked' : 'unchecked'}
           uncheckedColor="#00b7c2"
           color="#00b7c2"
           onPress={() => {
             markComplete(season.id)
           }}
         />)
                     }
                   />
              ))}

           
              </>
            )}

            <FAB style={styles.fab} icon="plus" small onPress={()=>navigation.navigate("Add")}/>
            <Image style={styles.image} source={require('./assets/img.jpg')} />
        </ScrollView>
        </NativeBaseProvider>
       
    )
}

export default Home;

const styles = StyleSheet.create({
    fab:{
        width: 60,
        borderRadius: 600,
        position: "absolute",
        right: 30,
        bottom: 25
    },
    image:{
      height:300,
      width:260,
      borderRadius: 470,
      position:"absolute",
      bottom:-49,
      left:-25
    },
    emptyContainer: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: '#1b262c',
      maxWidth:1000,
      flex: 1,
    },
    heading: {
      textAlign: 'center',
      color: '#00b7c2',
      marginVertical: 15,
      marginHorizontal: 5,
      fontSize: 20,
      textDecorationLine:'underline'
    },
    actionBtn1: {
      marginLeft: 5,
      backgroundColor: "red",
    },
    actionBtn2:{
      marginLeft: 5,
      backgroundColor: "#00b7c2",
      marginRight: 28,
      marginLeft: 5
    },
    seasonName: {
      color: '#fdcb9e',
      textAlign: 'justify',
    },
    listItem: {
      marginLeft: 0,
      marginBottom: 20,
    },
  });
  
  