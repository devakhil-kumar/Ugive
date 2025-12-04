import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GradientScreen from '../../common/GradientScreen';
const { width, height } = Dimensions.get('window');

const ReadCard = () => {
    const navigation = useNavigation();
    const [showContent, setShowContent] = useState(false);
    return (
        <GradientScreen colors={['#EAB344']}>
            <View style={styles.pageBg}>
                <TouchableOpacity style={styles.backImagePosition} onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../../../assets/backIcon.png')}
                        style={styles.backIconStyle}
                    />
                </TouchableOpacity>
                <View style={styles.bgCard}>
                    <Text style={styles.screenText}>Card To Andre - 07/07/2025</Text>
                    <TouchableOpacity
                        onPress={() => { setShowContent(!showContent) }}
                        activeOpacity={0.8}
                        style={[styles.dropDownStyle, { borderColor: showContent ? '#B5D1E5' : '#BDBDBD', }]}>
                        <View style={styles.dropDownTextRowStyle}>
                            <Image
                                source={require('../../../assets/stacks_icon.png')}
                                style={styles.stackIconStyle}
                            />
                            <Text style={[styles.screenText, { marginStart: 10, color: '#7F7F7F' }]}>Read Card</Text>
                        </View>
                        <Image
                            source={require('../../../assets/arrow_down.png')}
                            style={styles.arrowIconStyle}
                        />
                    </TouchableOpacity>
                    {
                        showContent ? (
                            <View style={styles.contentContainerStyle}>
                                <Text style={{ marginStart: 10, fontSize: 14, fontWeight: '800', lineHeight: 22, letterSpacing: 0, color: '#BDBDBD' }}>Dear Andre,{"\n"}Hello{"\n"}From Annie Phillips</Text>
                            </View>
                        ) : (

                            <Text
                                style={[styles.screenText, { color: '#7F7F7F', marginTop: 5, fontSize: 12, }]}
                            >
                                Tap on arrow to read your msg!
                            </Text>
                        )
                    }

                </View>
            </View>
        </GradientScreen>

    )
}


const styles = StyleSheet.create({
    pageBg: {
        padding: 16,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    screenText: {
        fontSize: 14,
        fontWeight: '800',
        lineHeight: 14,
        letterSpacing: 0,
        color: 'black'
    },
    contentContainerStyle: {
        padding: 16,
        borderWidth: 2,
        borderColor: '#BDBDBD',
        borderRadius: 10,
        marginTop: 20
    },
    dropDownTextRowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dropDownStyle: {
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    backImagePosition: {
        position: 'absolute',
        top: 20,
        left: 16,
    },
    backIconStyle: {
        width: 38,
        height: 38,
    },
    stackIconStyle: {
        width: 18,
        height: 18,
    },
    arrowIconStyle: {
        height: 10,
        width: 10
    },
    bgCard: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 15,
        width: width * 0.8,
        height: height * 0.4
    }
});

export default ReadCard;