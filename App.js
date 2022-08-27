import React from 'react';
import {Text} from 'react-native';
// import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home'
import Add from './screens/Add';
import Edit from './screens/Edit';

const Stack = createNativeStackNavigator();

const App = ()=>{
  return(
    <NavigationContainer>
         <Stack.Navigator initialRouteName="Home">
         <Stack.Screen 
         name="Home"
         component={Home} 
         options={{ 
          headerStyle:{
          backgroundColor: "#0f4c75"
         },
         title:'Netflix App',
         headerTitleStyle:{
          textAlign:"center",
          color:"#00b7c2"
         }
        }}
        >

         </Stack.Screen>

         <Stack.Screen 
         name="Add"
         component={Add} 
         options={{ 
          headerStyle:{
          backgroundColor: "#0f4c75"
         },
         title:'Netflix App',
         headerTitleStyle:{
          textAlign:"center",
          color:"#00b7c2"
         }
        }}
        >

         </Stack.Screen>

         <Stack.Screen 
         name="Edit"
         component={Edit} 
         options={{ 
          headerStyle:{
          backgroundColor: "#0f4c75"
         },
         title:'Netflix App',
         headerTitleStyle:{
          textAlign:"center",
          color:"#00b7c2"
         }
        }}
        >

         </Stack.Screen>
         </Stack.Navigator>
    </NavigationContainer>
 
  )
}
export default App;
