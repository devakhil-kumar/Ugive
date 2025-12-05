import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GradientScreen from '../../common/GradientScreen';

const Profile = () => {
    const navigation = useNavigation();

    const handleCardSent = () => {
        navigation.navigate('ReadCard')
    }

    const handleYourPoint = () => {
        navigation.navigate('RewardStutas')
    }

    return (
        <GradientScreen colors={['#D99656','#6D5B98', '#B5D1EB','#B5D1EB']}>
            <View style={styles.pageBg}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../../../assets/backIcon.png')}
                        style={styles.backIconStyle}
                    />
                </TouchableOpacity>
                <Image
                    source={require('../../../assets/profile.png')}
                    style={styles.profileStyle}
                />
                <Text style={[styles.screenTextStyle, { color: 'white', textAlign: 'center' }]}>Hey, <Text style={[styles.screenTextStyle, { color: '#E9B243', textAlign: 'center' }]}>Annie</Text>!</Text>
                <TouchableOpacity
                    style={styles.butoonStyle}
                    onPress={() => navigation.navigate('ProfileDetails')}
                >
                    <Text style={styles.buttonText}>Profile Info</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.butoonStyle} onPress={handleYourPoint}  >
                    <Text style={styles.buttonText}>Your Points</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.butoonStyle} onPress={handleCardSent} >
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
    backIconStyle: {
        width: 38,
        height: 38,
        marginLeft:20
    },
    profileStyle: {
        marginTop: 60,
        width: 155,
        height: 155,
        alignSelf: 'center'
    },
    screenTextStyle: {
        fontWeight: '800',
        fontSize: 26,
        letterSpacing: 0,
        alignSelf: 'center',
        color: 'white',
        marginTop: 30
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
        marginTop: 30,
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

export default Profile;