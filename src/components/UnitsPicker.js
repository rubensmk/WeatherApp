import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { Picker } from '@react-native-community/picker'


export default function UnitsPicker({ unitsStystem, setUnitsSystem }) {
    return (
        <View style={styles.unitsStystem}>
            <Picker selectedValue={unitsStystem} onValueChange={(item) => setUnitsSystem(item)} mode="dropdown" itemStyle={{ fontSize: 12 }}>
                <Picker.Item label="C°" value="metric" />
                <Picker.Item label="F°" value="imperial" />
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    unitsStystem: {
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: -30,
            },
            android: {
                top: 30
            }
        }),
        left: 20,
        height: 50,
        width: 100
    }
})
