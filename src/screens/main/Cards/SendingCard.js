
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import GradientScreen from '../../common/GradientScreen';
import CustomModal from '../../common/CustomModal';

const { width, height } = Dimensions.get('window');

const SendingCard = () => {
    const navigation = useNavigation();
    const handleOnPress = () => {
        navigation.navigate('HomeScreen')
    }
    return (
        <GradientScreen>
            <View style={{ padding: 16, flex: 1 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back' color={'#fff'} size={30} />
                </TouchableOpacity>
                <View style={styles.main}>
                    <View>
                        <Text style={styles.header}>
                            Your <Text style={{ color: "#D99656" }}>Card</Text> is on {"\n"}its way!
                        </Text>
                        <Text style={styles.subHeader}>
                            Note: Cards are delivered each Thursday
                            with a Tuesday evening cutoff to allow
                            time for printing.
                        </Text>
                    </View>
                    <Image source={require('../../../assets/sendMesg.png')} style={styles.imageStyle} />
                    <View style={{ width: "100%" }}>
                        <Text style={styles.lastHeader}>
                            Thank you for making a{"\n"}
                            difference in someone’s{"\n"}
                            world today!
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.btnLets} onPress={handleOnPress}>
                        <Text style={styles.txtBtn}>Let's go!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </GradientScreen>
    );
}


const styles = StyleSheet.create({
    btnLets: {
        backgroundColor: "#E9B243",
        borderRadius: 25,
        width: '50%',
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 30
    },
    txtBtn: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500'
    },
    imageStyle: {
        width: width * 0.7,
        height: height / 3,
        resizeMode: "contain",
        marginVertical: 50
    },
    header: {
        fontSize: 22,
        color: '#fff',
        fontWeight: '600',
        textAlign: "center",
        lineHeight: 20
    },
    subHeader: {
        fontSize: 15,
        color: '#fff',
        fontWeight: '500',
        textAlign: "center",
        marginTop: 10,
        lineHeight: 17,
        width: width / 1.3
    },
    lastHeader: {
        fontSize: 15,
        color: '#fff',
        fontWeight: '500',
        textAlign: "center"
    },
    main: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    screenTextStyle: {
        fontWeight: '800',
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0,
        alignSelf: 'center',
        color: 'white',
        marginTop: 10
    },
})


export default SendingCard;
