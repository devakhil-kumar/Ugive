import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../../fetures/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from '../../fetures/messageSlice';
import CustomModal from '../common/CustomModal';
import { resetAccountDeleted } from '../../fetures/deleteSlice';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showMessagee, setShowMessagee] = useState(false);
  const { accountDeleted, message } = useSelector((state) => state.delete);

  // Validation states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAttemptedLogin, setHasAttemptedLogin] = useState(false);

  useEffect(() => {
    if (accountDeleted) {
      setShowMessagee(true);
      const timer = setTimeout(() => {
        setShowMessagee(false);
        dispatch(resetAccountDeleted());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [accountDeleted, dispatch]);

  // Email validation function
  const validateEmail = (emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue.trim()) {
      return 'Email is required';
    } else if (!emailRegex.test(emailValue)) {
      return 'Please enter a valid email';
    }
    return '';
  };

  // Password validation function
  const validatePassword = (passwordValue) => {
    if (!passwordValue.trim()) {
      return 'Password is required';
    } else if (passwordValue.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  };

  // Live validation after first attempt
  useEffect(() => {
    if (hasAttemptedLogin) {
      setEmailError(validateEmail(email));
    }
  }, [email, hasAttemptedLogin]);

  useEffect(() => {
    if (hasAttemptedLogin) {
      setPasswordError(validatePassword(password));
    }
  }, [password, hasAttemptedLogin]);

  const handleLogin = async () => {
    // Mark that user has attempted login
    setHasAttemptedLogin(true);

    // Validate all fields
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    // If there are errors, don't proceed
    if (emailErr || passwordErr) {
      return;
    }

    setIsLoading(true);
    try {
      const loginPayload = {
        email: email,
        password: password,
      };
      const response = await dispatch(loginUser(loginPayload)).unwrap();
    } catch (error) {
      const errorMessage = typeof error === "string"
        ? error
        : error?.message || "Login failed!";
      if (errorMessage.toLowerCase().includes('invalid') ||
        errorMessage.toLowerCase().includes('credential')) {
        dispatch(
          showMessage({
            type: 'error',
            text: 'Invalid email or password',
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

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={'yellow'} />
      </View>
    );
  }

  const handleForgetPassword = () => {
    navigation.navigate('ResetPassword')
  }

  // Check if form is valid
  const isFormValid = email.trim() && password.trim() && !emailError && !passwordError;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#E5B865" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerSection}>
            <Text style={styles.logo}>UGive</Text>
            <Text style={styles.tagline}>
              Sign up to UGive, and make a{'\n'}difference in someone's world{'\n'}today.
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Your Email</Text>
              <TextInput
                style={[
                  styles.input,
                  emailError ? styles.inputError : null
                ]}
                placeholder="Enter your Email"
                placeholderTextColor="#C4C4C4"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
            </View>

            <View style={[styles.inputGroup, { marginBottom: 0 }]}>
              <Text style={styles.label}>Your Password</Text>
              <View style={[
                styles.passwordContainer,
                passwordError ? styles.inputError : null
              ]}>
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
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
            </View>

            <TouchableOpacity onPress={handleForgetPassword}>
              <Text style={styles.forgotPassword}>
                Forgot Password
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.loginButton,
                isFormValid && styles.loginButtonActive
              ]}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.loginButtonText,
                isFormValid && styles.loginButtonTextActive
              ]}>
                Let's go!
              </Text>
            </TouchableOpacity>

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>
                Don't have an account?{' '}
                <Text style={styles.signUpLink} onPress={handleSignUp}>Sign up now</Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomModal visible={showMessagee} title={message} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5B865',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 40 : 60,
    paddingBottom: 40,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 56,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -1,
    marginBottom: 16,
  },
  tagline: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '400',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  inputGroup: {
    marginBottom: 15,
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
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 4,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#333333',
  },
  eyeIcon: {
    paddingHorizontal: 12,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#D4D4D4',
    borderRadius: 50,
    paddingVertical: 10,
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 15,
  },
  loginButtonActive: {
    backgroundColor: '#E5B865',
  },
  loginButtonText: {
    fontSize: 17,
    color: '#999999',
    fontWeight: '600',
  },
  loginButtonTextActive: {
    color: '#FFFFFF',
  },
  signUpContainer: {
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 14,
    color: '#000',
  },
  signUpLink: {
    color: '#E5B865',
    fontWeight: '600',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
});

export default LoginScreen;