import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, TextInput } from 'react-native';
import { ResetPassword } from '../../../fetures/ResetPasswordSlice';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@react-native-vector-icons/feather';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import {showMessage} from '../../../fetures/messageSlice';

const ResetPasswordScreen = ({ navigation }) => {
    const [email, setEmailText] = useState('');

    const dispatch = useDispatch();
    const { resetPassword, loading, error } = useSelector(
        state => state.forgetData
    );

    const handleSendOtp = async () => {
        try {
            if (!email || email.trim() === "") {
                dispatch(showMessage({ type: 'error', text: "Please enter your email" }));
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.trim())) {
                dispatch(showMessage({ type: 'error', text: "Please enter a valid email" }));
                return;
            }
            console.log(email, 'email+++++++')
            const res = await dispatch(ResetPassword(email)).unwrap();
            console.log(res, 'res------')
            dispatch(showMessage({ type: 'success', text: res.message }));
            setEmailText("");
            navigation.navigate("VerfyOtp", { email });
        } catch (err) {
            console.log(err, 'errorr')
            const msg =
                typeof err === "string"
                    ? err
                    : err?.message || "Something went wrong";

            dispatch(showMessage({ type: 'error', text: msg }));
        }
    };


    return (
        <SafeAreaView style={styles.pageBg} edges={['top']}>
            <View style={styles.headermain}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name='chevron-left' color={'#000'} size={25} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Forget Password</Text>
                <View style={{ width: 24 }} />
            </View>
            <Text style={styles.headerTextStyle}>Reset Password</Text>
            <Text style={styles.descriptionTextStyle}>Enter your email address to receive an OTP.</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Your Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Email"
                placeholderTextColor="#C4C4C4"
                value={email}
                onChangeText={setEmailText}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View style={styles.buttonsRowStyle}>
                <TouchableOpacity style={styles.buttonStyle} onPress={handleSendOtp}>
                    {loading ? <ActivityIndicator size={'small'} color={'#fff'} /> : <Text style={styles.buttonTextStyle}>Send OTP</Text>}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    pageBg: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    headerTextStyle: {
        fontSize: moderateScale(18),
        color: '#000',
        // fontFamily: Fonts.InterSemiBold
    },
    descriptionTextStyle: {
        fontSize: moderateScale(15),
        color: '#000',
        // fontFamily: Fonts.InterRegular,
        marginTop: 16
    },
    textInputStyle: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        marginTop: 5,
        backgroundColor: '#fff'
    },
    buttonsRowStyle: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 32
    },
    buttonStyle: {
        width: width * 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor:'#E5B865'
        // backgroundColor: theme.secandprimary,
    },
    buttonTextStyle: {
        fontSize: moderateScale(16),
        // fontFamily: Fonts.InterMedium,
        color: '#fff'
    },
    headermain: {
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: moderateScale(16),
        // fontFamily: Fonts.InterSemiBold,
        color: '#000',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    inputGroup: {
        marginBottom:5,
        marginTop:15
      },
      label: {
        fontSize: 15,
        color: '#333333',
        marginBottom: 10,
        fontWeight: '500',
      },
      input: {
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 15,
        color: '#333333',
        backgroundColor: '#FAFAFA',
      },
})

export default ResetPasswordScreen;