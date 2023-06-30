import * as React from 'react';
import * as RN from 'react-native';
import EmojiPicker from 'rn-emoji-keyboard';
import { database } from '../config/fb';
import { collection,addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

//Creat
export default function Add() {
    const navigation = useNavigation();
    const [isOpen, setIsOpen] = React.useState(false);
    const [newItem, settNewItem] = React.useState({
        emoji :'🍖',
        name:'',
        price: 0,
        isSold: false,
        createdAt: new Date(),
    })
    
    const onSend = async () =>{
        await addDoc (collection(database , 'produtos'), newItem );
        navigation.goBack();

    }

    const handlePick = (emojiObject) => {
        settNewItem({
            ...newItem,
            emoji: emojiObject.emoji,
        });
    }
    return(
        <RN.View style = {styles.container}>
            <RN.Text style ={styles.title} >Adicionar um produto</RN.Text>
            <RN.Text style ={styles.emoji} onPress={()=>setIsOpen(true)}>{newItem.emoji}</RN.Text>
            <EmojiPicker 
            onEmojiSelected={handlePick}
            open ={isOpen}
            onClose={() => setIsOpen(false)}
            />
            <RN.TextInput
                onChangeText = {(text) => settNewItem({...newItem, name: text})}
                placeholder = 'Nome do produto'
                style ={styles.inputContainer}
            />
             <RN.TextInput
                onChangeText = {(text) => settNewItem({...newItem, price: text})}
                placeholder = 'R$: '
                style ={styles.inputContainer}
                keyboardType = "number-pad"
            />
            <RN.Button title = 'Adicionar' onPress = {onSend} />
        </RN.View>
        
    )
}
//styles
const styles = RN.StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title:{
        fontSize:32,
        fontWeight:'700',
    },
    inputContainer:{
        width:'90%',
        padding:13,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
    },
    emoji:{
        fontSize: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 10, 
        marginVertical: 6, 

    }
})