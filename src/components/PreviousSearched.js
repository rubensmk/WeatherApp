import React from 'react'
import { View, Text } from 'react-native'
import { colors } from '../../utils/index'
import { AntDesign } from '@expo/vector-icons'
import { StyleSheet } from 'react-native';

export default function PreviousSearched({ city, state, country }) {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.infoCity}>{city}</Text>
                <Text style={styles.infoState}>{state}, {country}</Text>
            </View>
            <AntDesign name="arrowright" size={28} color={colors.PRIMARY_COLOR} style={styles.icon} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 10,
        backgroundColor: colors.BORDER_COLOR,
        borderRadius: 10,
        height: 80,
        width: 360
    },
    info: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: 150,
        borderLeftWidth: 3,
        borderLeftColor: colors.PRIMARY_COLOR,
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2,
        paddingLeft: 10,
    },
    infoCity: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    infoState: {
        fontSize: 16
    },
    icon: {
        alignSelf: 'center',
    }

})
