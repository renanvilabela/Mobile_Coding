import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./screens/Home";
import Add from "./screens/Add";
import Login from "./screens/Login";
import Newuser from "./screens/Newuser";


const Stack = createNativeStackNavigator();

function MyStack (){
    return(
        <Stack.Navigator>
            <Stack.Screen name ="Login" component={Login} />
            
            <Stack.Screen name ="Newuser" component={Newuser}/>

            <Stack.Screen name ="Home" component={Home} />

            <Stack.Screen name ="Add" component={Add}
                options={{presentation : 'modal'}} />
        </Stack.Navigator>
    )
}

export default function Navigation(){
    return(
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}