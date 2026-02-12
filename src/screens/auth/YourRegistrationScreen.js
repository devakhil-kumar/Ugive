import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@react-native-vector-icons/feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
// Make sure to import these from your actual file paths
import { registerUser } from '../../fetures/authSlice'; 
import { showMessage } from '../../fetures/messageSlice';

const VerifyOTPScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  
  // Get the form data passed from the SignUpScreen
  const { userData, email } = route.params || {}; 

  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  
  const inputRef = useRef(null);
  const length = 6; // OTP Length

  // Auto focus the input when screen loads
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  const handleVerify = async () => {
    Keyboard.dismiss();

    if (otp.length !== length) {
      Alert.alert('Invalid OTP', 'Please enter a valid 6-digit code.');
      return;
    }

    setIsLoading(true);

   
    const payload = {
      ...userData, 
      otp: otp    
    };

    try {
      const response = await dispatch(registerUser(payload)).unwrap();
      dispatch(showMessage({
        type: 'success',
        text: response.message || 'Signup successful!',
      }));
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });

    } catch (error) {
      console.log(error, 'error');
      let errorMessage = typeof error === 'string' ? error : error.message || 'Signup failed!';
      
      console.log(errorMessage, 'errormessage');
      
      if (errorMessage.toLowerCase().includes('user already') || errorMessage.toLowerCase().includes('email')) {
        dispatch(
          showMessage({
            type: 'error',
            text: errorMessage || 'This email is already registered. Please use a different email or try logging in.',
          })
        );
      } else {
        dispatch(
          showMessage({
            type: 'error',
            text: errorMessage,
          })
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#E5B865" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <View style={styles.content}>
          
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Feather name='arrow-left' color={'#FFFFFF'} size={28} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Verification</Text>
            <View style={{ width: 28 }} /> 
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Enter OTP</Text>
            <Text style={styles.subtitle}>
              We have sent a 6-digit verification code to {'\n'}
              <Text style={styles.emailText}>{email || userData?.email || 'your email'}</Text>
            </Text>

            {/* OTP Input Section */}
            <View style={styles.otpContainer}>
              {/* Visible Boxes */}
              <View style={styles.otpBoxesContainer}>
                {Array(length).fill(0).map((_, index) => {
                  const digit = otp[index];
                  const isFocused = index === otp.length;
                  return (
                    <TouchableOpacity 
                      key={index} 
                      style={[
                        styles.otpBox,
                        isFocused && styles.otpBoxFocused,
                        digit && styles.otpBoxFilled
                      ]}
                      onPress={() => inputRef.current?.focus()}
                      activeOpacity={1}
                    >
                      <Text style={styles.otpText}>{digit || ''}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Hidden Actual Input */}
              <TextInput
                ref={inputRef}
                value={otp}
                onChangeText={(text) => {
                  // Only allow numbers
                  if (/^\d*$/.test(text)) {
                    setOtp(text);
                  }
                }}
                maxLength={length}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                style={styles.hiddenInput}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.verifyButton,
                (otp.length !== length || isLoading) && styles.verifyButtonDisabled
              ]}
              onPress={handleVerify}
              disabled={isLoading || otp.length !== length}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.verifyButtonText}>Verify Otp</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#E5B865' 
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  emailText: {
    fontWeight: '600',
    color: '#333',
  },
  
  // OTP Styles
  otpContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
    height: 60, // Ensure height for hidden input overlap
  },
  otpBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  otpBox: {
    width: 45,
    height: 50,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpBoxFocused: {
    borderColor: '#E5B865',
    backgroundColor: '#FFF',
  },
  otpBoxFilled: {
    borderColor: '#333',
    backgroundColor: '#FFF',
  },
  otpText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  hiddenInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0, // Hide it but keep it interactable
  },

  // Button Styles
  verifyButton: {
    width: '100%',
    backgroundColor: '#E5B865',
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  verifyButtonDisabled: {
    backgroundColor: '#D4D4D4',
  },
  verifyButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  
  // Resend
  resendContainer: {
    flexDirection: 'row',
  },
  resendText: {
    fontSize: 14,
    color: '#888',
  },
  resendLink: {
    fontSize: 14,
    color: '#E5B865',
    fontWeight: '700',
  },
});

export default VerifyOTPScreen;