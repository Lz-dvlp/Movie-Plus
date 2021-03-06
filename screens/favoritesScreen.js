import React, { useEffect, cleanup, useRef, useState } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import * as Animatable from 'react-native-animatable';
import { db } from '../firebase';
import * as firebase from 'firebase'

const favoritesScreen = () => {

    const navigation = useNavigation();
    const user = firebase.auth().currentUser;
    const refCarousel = useRef(null);

    const [listaMovieFavorite, setMovieFavorite] = useState();
    const [loading, setLoading] = useState(true);

    const getMovieFavorite = async () => {
        const snapshot = await
            db.collection(`${user.uid}`)
                .get()
                .then(querySnapshot => {
                    console.log('Total favoritos: ', querySnapshot.size);

                    const docList = []

                    if (querySnapshot.size == 0) {
                        setLoading(false)
                        navigation.navigate('Home')
                        Toast.show('Nenhum filme favoritado.', Toast.LONG);

                    }

                    querySnapshot.forEach(documentSnapshot => {
                        docList.push(documentSnapshot.data())

                        setMovieFavorite(docList)
                        setLoading(false)
                    });
                });
    }

    const _renderItem = ({ item }) => {
        return (
            <Animatable.View animation="fadeIn" style={{ width: Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Overview', { filme: item })}>
                    <Image style={styles.carouselImage} source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster}` }} />
                </TouchableOpacity>
            </Animatable.View>
        )
    };

    useEffect(() => {
        const refresh = navigation.addListener('focus', () => {
            getMovieFavorite();
        });
        return refresh;
    }, [cleanup]);

    return (
        <View>
            <View style={styles.slideView}>
                {!loading && (
                    <FlatList
                        style={styles.carousel}
                        ref={refCarousel}
                        data={listaMovieFavorite}
                        renderItem={_renderItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                )}
            </View>

            {loading &&
                <View style={styles.activeIndicator}>
                    <ActivityIndicator size="large" color="#f5f5f5" />
                </View>
            }
        </View>
    )
}

export default favoritesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slideView: {
        alignSelf: 'center',
    },
    carouselImage: {
        width: 320,
        height: 460,
        borderRadius: 12,
    },
    carousel: {
        //paddingRight: 10,
    },
    activeIndicator: {
        paddingTop: 400,
        height: 60,
    }
})
