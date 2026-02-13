import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import GradientScreen from '../../common/GradientScreen';
import { logout } from '../../../fetures/authSlice';
import { useDispatch } from 'react-redux';
import { deleteAccount } from '../../../fetures/deleteSlice';
import { clearUserData } from '../../../utils/asyncStorageManager';
import { useState } from 'react';
import CustomModal from '../../common/CustomModal';
import { logoutDevice } from '../../../apis/api';
import { getFCMToken } from '../../../utils/notificationService';
const { width } = Dimensions.get('window');

const ProfileDetails = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [confirmVisible, setConfirmVisible] = useState(false);

    const handleLogout = async () => {
        try {
            const fcmToken = await getFCMToken();
            if (fcmToken) {
                await logoutDevice(fcmToken);
                console.log('✅ Device unregistered from backend');
            }
        } catch (error) {
            console.log('Logout device error:', error?.response?.data || error.message);
        } finally {
            dispatch(logout());
        }
    }

    const handleDelete = async () => {
        try {
            const response = await dispatch(deleteAccount()).unwrap();
            await clearUserData();
            dispatch(logout());
        } catch (error) {
            console.log('error', error)
        }
    }

    const onHandleConfirm = () => {
        setConfirmVisible(false);
        handleDelete();
    }


    const route = useRoute();
    const { user } = route.params;

    const HandleProfileEdit = () => {
        navigation.navigate('EditProfile', { user: user })
    }

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
                    source={
                        user?.profileImage
                            ? { uri: user.profileImage }
                            : require('../../../assets/purple_profile.png')
                    }
                    style={styles.profileStyle}
                />
                <View style={{ marginVertical: 30, alignContent: 'center' }}>
                    <View style={styles.textRowStyle}>
                        <Text style={styles.screenTextStyle}>Name:</Text>
                        <Text style={[styles.screenTextStyle, { marginStart: 5 }]}>{user?.name}</Text>
                    </View>
                    <View style={[styles.textRowStyle, { marginTop: 10 }]}>
                        <Text style={styles.screenTextStyle}>Mobile:</Text>
                        <Text style={[styles.screenTextStyle, { marginStart: 5 }]}>{user?.phoneNumber}</Text>
                    </View>
                    <View style={[styles.textRowStyle, { marginTop: 10 }]}>
                        <Text style={styles.screenTextStyle}>Email:</Text>
                        <Text style={[styles.screenTextStyle, { marginStart: 5 }]}>{user?.email}</Text>
                    </View>
                    <View style={[styles.textRowStyle, { marginTop: 10 }]}>
                        <Text style={styles.screenTextStyle}>University:</Text>
                        <Text style={[styles.screenTextStyle, { marginStart: 5, width: '80%' }]}>{user?.university?.name}</Text>
                    </View>
                    <View style={[styles.textRowStyle, { marginTop: 10 }]}>
                        <Text style={styles.screenTextStyle}>College:</Text>
                        <Text style={[styles.screenTextStyle, { marginStart: 5, width: '50%' }]}>{user?.college?.name}</Text>
                    </View>
                    <View style={[styles.textRowStyle, { marginTop: 10 }]}>
                        <Text style={styles.screenTextStyle}>USI:</Text>
                        <Text style={[styles.screenTextStyle, { marginStart: 5 }]}>{user?.studentUniId}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.butoonStyle, { backgroundColor: '#B09FE9', marginTop: 30 }]}
                    onPress={HandleProfileEdit}
                >
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.butoonStyle, { backgroundColor: '#8B79C4', marginTop: 20 }]} onPress={handleLogout} >
                    <Text style={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.butoonStyle, { backgroundColor: '#66579E', marginTop: 20 }]} onPress={() => setConfirmVisible(true)}>
                    <Text style={styles.buttonText}>Delete Account</Text>
                </TouchableOpacity>
            </View>
            <CustomModal visible={confirmVisible} confirmModal={true} showClose={true} onClose={onHandleConfirm} handleClose={() => setConfirmVisible(false)} title=" Are you sure you want to delete your account?" buttonLabelCancel={'No,Cancel'} buttonLabel={'Yes, Delete'} />
        </GradientScreen>
    )
}

const styles = StyleSheet.create({
    pageBg: {
        flex: 1,
    },
    textRowStyle: { flexDirection: 'row', justifyContent: 'flex-start', alignItems:'flex-start' , marginLeft:20},
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
        alignSelf: 'center',
               borderRadius:80
    },
    screenTextStyle: {
        fontWeight: '800',
        fontSize: 18,
        alignSelf: 'flex-start',
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