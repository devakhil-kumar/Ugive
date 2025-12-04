import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GradientScreen from '../../common/GradientScreen';
const { width } = Dimensions.get('window');

const ProfileDetails = () => {
    const navigation = useNavigation();

    return (
        <GradientScreen colors={['#B5D1EB']}>
            <View style={styles.pageBg}>
                <View style={styles.flowerImagePosition}>
                    <Image
                        source={require('../../../assets/flower.png')}
                        style={styles.flowerImageStyle}
                    />
                </View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../../../assets/backIcon.png')}
                        style={styles.backIconStyle}
                    />
                </TouchableOpacity>
                <Image
                    source={require('../../../assets/purple_profile.png')}
                    style={styles.profileStyle}
                />
                <View style={{ marginVertical: 30, alignContent: 'center' }}>
                    <View style={styles.textRowStyle}>
                        <Text style={styles.screenTextStyle}>Name:</Text>
                        <Text style={[styles.screenTextStyle, { marginStart: 5 }]}>Annie Philips</Text>
                    </View>
                    <View style={[styles.textRowStyle, { marginTop: 10 }]}>
                        <Text style={styles.screenTextStyle}>Mobile:</Text>
                        <Text style={[styles.screenTextStyle, { marginStart: 5 }]}>0123456789</Text>
                    </View>
                    <View style={[styles.textRowStyle, { marginTop: 10 }]}>
                        <Text style={styles.screenTextStyle}>Email:</Text>
                        <Text style={[styles.screenTextStyle, { marginStart: 5 }]}>annie.phillips93@gmail.com</Text>
                    </View>
                    <View style={[styles.textRowStyle, { marginTop: 10 }]}>
                        <Text style={styles.screenTextStyle}>University:</Text>
                        <Text style={[styles.screenTextStyle, { marginStart: 5 }]}>University of{"\n"}Queensland</Text>
                    </View>
                    <View style={[styles.textRowStyle, { marginTop: 10 }]}>
                        <Text style={styles.screenTextStyle}>College:</Text>
                        <Text style={[styles.screenTextStyle, { marginStart: 5 }]}>Pitt Hall</Text>
                    </View>
                    <View style={[styles.textRowStyle, { marginTop: 10 }]}>
                        <Text style={styles.screenTextStyle}>USI:</Text>
                        <Text style={[styles.screenTextStyle, { marginStart: 5 }]}>321</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.butoonStyle, { backgroundColor: '#B09FE9', marginTop: 30 }]}
                    onPress={() => navigation.navigate('EditProfile')}
                >
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.butoonStyle, { backgroundColor: '#8B79C4', marginTop: 20 }]} >
                    <Text style={styles.buttonText}>Your Points</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.butoonStyle, { backgroundColor: '#66579E', marginTop: 20 }]} >
                    <Text style={styles.buttonText}>Cards Sent</Text>
                </TouchableOpacity>
            </View>
        </GradientScreen>
    )
}

const styles = StyleSheet.create({
    pageBg: {
        flex: 1,
    },
    textRowStyle: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    flowerImagePosition: {
        position: 'absolute',
        top: -50,
        right: 0,
    },
    flowerImageStyle: {
        width: 135,
        height: 157,
        resizeMode: "contain"
    },
    backIconStyle: {
        width: 38,
        height: 38,
        marginLeft: 20
    },
    profileStyle: {
        marginTop: 40,
        width: 115,
        height: 115,
        alignSelf: 'center'
    },
    screenTextStyle: {
        fontWeight: '800',
        fontSize: 18,
        letterSpacing: 0,
        alignSelf: 'center',
        color: '#7D8286',
    },

    butoonStyle: {
        height: 40,
        width: 200,
        backgroundColor: '#E9B243',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 4,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '800',
        fontSize: 14,
        lineHeight: 14,
        letterSpacing: 0.2,
    }
});

export default ProfileDetails;