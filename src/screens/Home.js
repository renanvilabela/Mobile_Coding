import * as React from 'react';
import * as RN from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { database } from '../config/fb';
import { QuerySnapshot, collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import Product from '../components/Product';
import { ScrollView } from 'react-native-gesture-handler';
    //Read
export default function Home() {
    const navigation = useNavigation();
    const [products, setProducts] = React.useState([]);
    React.useLayoutEffect(() =>{
        navigation.setOptions({
            headerRight: () => <RN.Button title = 'Add' onPress ={ () => navigation.navigate('Add')} />
        })
    },[])

    React.useEffect(() => {
        const collectionRef = collection(database,'produtos');
        const q = query(collectionRef, orderBy('createdAt','desc'));
        
        const unsuscribe = onSnapshot(q,querySnapshot =>{
            setProducts(
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    emoji: doc.data().emoji,
                    name: doc.data().name,
                    price: doc.data().price,
                    isSold: doc.data().isSold,
                    createAt: doc.data().createAt,
                })
                )
            )})
        return unsuscribe;
    },[])

    return(
        <ScrollView>
        <RN.View style = {styles.container}>

        <RN.Text style = {styles.title}>Produtos</RN.Text>
        
        {products.map(product => <Product key={product.id} {...product}/>)}

       

        </RN.View>
        </ScrollView>
    )
}
const styles = RN.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F3F9',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        margin: 16,
    },
});
