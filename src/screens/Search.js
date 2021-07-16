import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import PreviousSearched from '../components/PreviousSearched';
import { colors } from '../../utils/index'
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLocationRedux } from '../store/modules/location/actions'
import * as Location from 'expo-location';
import { addSearch } from '../store/modules/searches/actions';
import { useSelector } from 'react-redux';

export default function Search() {
    const [location, setLocation] = useState(null);
    const { register, handleSubmit, setValue } = useForm();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const searched = useSelector(state => state.search?.items)

    useEffect(() => {
        console.log(searched)
        register('location')
    }, [register, searched])

    const onSubmit = async (data) => {

        const url = `https://api.opencagedata.com/geocode/v1/json?key=e85809527b0341b18712ec1bacc3aab9&q=${data.location}`

        const response = await axios.get(url);
        const { results } = response.data;
        const { lat, lng } = results[0].geometry;
        const { city, state, country } = results[0].components;

        dispatch(setLocationRedux(lat, lng));
        dispatch(addSearch(city, state, country));
        navigation.navigate('Home');

    }

    const handleActualLocation = async () => {
        try {
            let { status } = await Location.requestBackgroundPermissionsAsync()

            if (status !== 'granted') {
                setErrorMessage('Access to location is needed to run the app.')
                return
            }

            const location = await Location.getCurrentPositionAsync()
            const { latitude, longitude } = location.coords
            dispatch(setLocationRedux(latitude, longitude))
            navigation.navigate('Home');
        } catch (error) {
            setErrorMessage(error.message)
        }
    }
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.subtitle}>Type your location here:</Text>
            <TextInput style={styles.input} placeholder="Ex: saopaulo,sp" onChangeText={text => setValue('location', text)} />
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleActualLocation}>
                    <MaterialCommunityIcons name="crosshairs-gps" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <Text style={styles.previousTitle}>Previous Searches:</Text>
            <ScrollView showsVerticalScrollIndicator={false} >
                <PreviousSearched city="Belém" state="PA" country="Brasil" />
                <PreviousSearched city="São Paulo" state="SP" country="Brasil" />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    subtitle: {
        fontSize: 18,
        marginTop: 10
    },
    input: {
        marginTop: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: colors.BORDER_COLOR,
        borderRadius: 10,
        height: 60,
        padding: 10,
    },
    button: {
        backgroundColor: colors.PRIMARY_COLOR,
        width: 120,
        height: 60,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },
    previousTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    }
})
