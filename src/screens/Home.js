import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import WeatherInfo from '../components/WeatherInfo';
import UnitsPicker from '../components/UnitsPicker';
import { colors } from '../../utils/index';
import ReloadIcon from '../components/ReloadIcon';
import WeatherDetails from '../components/WeatherDetails';
import { useSelector } from 'react-redux';


const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'
const API_KEY = '12868a6403d14196a24028c076c86b10'

export default function Home() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsStystem, setUnitsSystem] = useState('metric');
  const locationData = useSelector(state => state.location)

  useEffect(() => {
    load();
  }, [unitsStystem, locationData])

  async function load() {
    setCurrentWeather(null)
    setErrorMessage(null)

    const weatherUrl = `${BASE_WEATHER_URL}lat=${locationData.latitude}&lon=${locationData.longitude}&units=${unitsStystem}&appid=${API_KEY}`

    const response = await fetch(weatherUrl)
    const result = await response.json()

    if (response.ok) {
      setCurrentWeather(result)
    } else {
      setErrorMessage(response.message)
    }
  }

  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker unitsStystem={unitsStystem} setUnitsSystem={setUnitsSystem} />
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails currentWeather={currentWeather} unitsStystem={unitsStystem} />
      </View>
    )
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
      </View>
    )
  }
  ;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1
  }
});
