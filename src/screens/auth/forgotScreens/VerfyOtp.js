import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { Dimensions } from 'react-native';
import { useState } from 'react';
const { width } = Dimensions.get('window');
import { useSelector, useDispatch } from "react-redux";
import { VerifyResetCode } from '../../../fetures/ResetPasswordSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import Feather from '@react-native-vector-icons/feather';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from '../../../fetures/messageSlice';
import Icon from 'react-native-vector-icons/Ionicons';


const VerifyOtp = ({ route }) => {
    const { email } = route.params;
    const [otp, setOtpText] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [newshowPassword, setnewShowPassword] = useState(false);

    const [newPassword, setNewPasswordText] = useState('');
    const navigation = useNavigation();

    const dispatch = useDispatch();
    const { resetCode, loading, error } = useSelector(
        state => state.forgetData
    );

    const handleVerifyOtp = async () => {
        try {
            if (!otp || otp.trim() === "") {
                dispatch(showMessage({ type: 'error', text: "Please enter the OTP." }));
                return;
            }

            if (!newPassword || newPassword.trim() === "") {
                dispatch(showMessage({ type: 'error', text: "Please enter new password." }));
                return;
            }

            const passwordRegex =
                /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

            if (!passwordRegex.test(newPassword.trim())) {
                dispatch(showMessage({
                    type: 'error',
                    text: "Password must contain 1 uppercase, 1 number, 1 special character and be at least 8 characters."
                }));
                return;
            }

            if (!password || password.trim() === "") {
                dispatch(showMessage({ type: 'error', text: "Please enter confirm password." }));
                return;
            }

            if (password.trim() !== newPassword.trim()) {
                dispatch(showMessage({ type: 'error', text: "Passwords do not match." }));
                return;
            }
            const data = {
                email: email.trim(),
                code: otp.trim(),
                newPassword: newPassword.trim()
            };
            console.log(data, "data");
            const res = await dispatch(VerifyResetCode(data)).unwrap();
            dispatch(showMessage({ type: 'success', text: res.message }));
            navigation.pop(2);
        } catch (err) {
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
                <Text style={styles.headerTitle}>Reset Password</Text>
                <View style={{ width: 24 }} />
            </View>
            <Text style={styles.headerTextStyle}>Verify OTP</Text>
            <Text style={styles.descriptionTextStyle}>Enter the OTP sent to your email and set a new password</Text>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Your Otp</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your Email"
                    placeholderTextColor="#C4C4C4"
                    value={otp}
                    onChangeText={setOtpText}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
            <Text style={[styles.label]}>New Password*</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter your Password"
                  placeholderTextColor="#C4C4C4"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#C4C4C4"
                  />
                </TouchableOpacity>
              </View>
            <Text style={[styles.label]}>Confirm New Password*</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter your Password"
                  placeholderTextColor="#C4C4C4"
                  value={newPassword}
                  onChangeText={setNewPasswordText}
                  secureTextEntry={!newshowPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setnewShowPassword(!newshowPassword)}
                >
                  <Icon
                    name={newshowPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#C4C4C4"
                  />
                </TouchableOpacity>
              </View>
            <View style={styles.buttonsRowStyle}>
                {/* <TouchableOpacity style={[styles.buttonStyle, { width: width * 0.4, borderWidth: 1, borderColor: '#0000', borderRadius: 10, }]}>
                    <Text style={styles.buttonTextStyle}>Cancel</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={[styles.buttonStyle, { width: width * 0.4,backgroundColor:'#E5B865' }]} onPress={handleVerifyOtp}>
                    {loading ? <ActivityIndicator size={'small'} color={'#fff'} /> : <Text style={[styles.buttonTextStyle, { color: '#fff' }]}>Reset Password</Text>}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    pageBg: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white'
    },
    headerTextStyle: {
        fontSize: moderateScale(16),
        color: '#000',
        // fontFamily: Fonts.InterSemiBold
    },
    descriptionTextStyle: {
        fontSize: moderateScale(14),
        color: '#000',
        // fontFamily: Fonts.InterMedium,
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
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 10,
    },
    buttonTextStyle: {
        fontSize: moderateScale(14),
        color: "#000",
        // fontFamily: Fonts.InterSemiBold
    },
    headermain: {
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: moderateScale(16),
        // fontFamily: Fonts.InterSemiBold,
        color: "#000",
    },
    inputGroup: {
        marginTop:20,
      },
      label: {
        fontSize: 15,
        color: '#333333',
        marginBottom:5,
        fontWeight: '500',
        marginTop:15
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
      eyeIcon: {
        paddingHorizontal: 12,
      },
      passwordInput: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 15,
        color: '#333333',
      },
      passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        backgroundColor: '#FAFAFA',
      },
});

export default VerifyOtp;