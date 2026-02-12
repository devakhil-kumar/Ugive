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
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import { MaskedTextInput } from 'react-native-advanced-input-mask';
import { useNavigation } from '@react-navigation/native';
import { clearColleges, fetchColleges, fetchUniversities } from '../../fetures/getUniversitySlice';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from '../../fetures/messageSlice';
import Feather from '@react-native-vector-icons/feather';
import { sendOtpSignupThunk } from '../../fetures/sendOtpSignupThunk'; // Ensure this path is correct

const SignUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Form State
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [university, setUniversity] = useState(null);
  const [college, setCollege] = useState(null);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  // UI State
  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redux Data
  const { universities, colleges, universitiesLoading, collegesLoading } = useSelector(
    (state) => state.universities
  );

  const universitiesList = Array.isArray(universities) ? universities : [];
  const collegesList = Array.isArray(colleges) ? colleges : [];

  useEffect(() => {
    dispatch(fetchUniversities());
    return () => dispatch(clearColleges());
  }, [dispatch]);

  const ALLOWED_EMAIL_DOMAINS = [
    'usq.edu.au',
    'uq.edu.au',
    'unimelb.edu.au',
    'sydney.edu.au',
    'monash.edu',
    'anu.edu.au',
    'unsw.edu.au',
  ];

  // --- Validation Logic ---
  const validateName = (v) => /^[A-Za-z\s]{2,50}$/.test(v.trim());
  const validateEmail = (v) => {
    const lower = v.toLowerCase().trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lower)) return false;
    return ALLOWED_EMAIL_DOMAINS.some(d => lower.endsWith(`@${d}`));
  };
  const validateMobile = (v) => /^04\d{8}$/.test(v.replace(/\s/g, ''));
  const validatePassword = (v) =>
    v.length >= 8 &&
    /[a-z]/.test(v) &&
    /[A-Z]/.test(v) &&
    /\d/.test(v) &&
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(v);

  const validateField = (field, value) => {
    let error = '';
    switch (field) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        else if (!validateName(value)) error = 'Only letters and spaces allowed';
        break;
      case 'studentId':
        if (!value.trim()) error = 'Student ID is required';
        break;
      case 'university':
        if (!value) error = 'Please select your university';
        break;
      case 'college':
        if (!value) error = 'Please select your college';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        else if (!validateEmail(value)) error = 'Only university email allowed';
        break;
      case 'mobile':
        if (!value) error = 'Mobile number is required';
        else if (!validateMobile(value)) error = 'Enter valid Australian mobile number';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        else if (!validatePassword(value)) error = 'Min 8 chars, upper, lower, number & special';
        break;
    }
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleBlur = (field, value) => {
    if (submitAttempted) validateField(field, value);
  };

  const isFormValid = () =>
    name.trim() &&
    studentId.trim() &&
    university &&
    college &&
    email &&
    mobile &&
    password &&
    Object.values(errors).every(e => !e) &&
    isTermsAccepted;

  // --- Handlers ---

  const handleOpenTerms = () => navigation.navigate('TermsScreen');
  const handleOpenPrivacy = () => navigation.navigate('PrivacyPolicy');

  const handleUniversityChange = (item) => {
    setUniversity(item._id);
    setCollege(null);
    dispatch(clearColleges());
    dispatch(fetchColleges(item._id));   
    if (submitAttempted) {
      validateField('university', item._id);
      validateField('college', null);
    }
  };

  const handleCollegeChange = (item) => {
    setCollege(item._id);
    validateField('college', item._id);
  };

  const handleLogin = () => navigation.navigate('Login');
  const showError = field => submitAttempted && errors[field];

  // --- MAIN FUNCTIONALITY: SEND OTP & NAVIGATE ---
  const handleSendOTP = async () => {
    setSubmitAttempted(true);
    if (!isTermsAccepted) {
      Alert.alert('Terms Required', 'Please accept the Terms & Conditions and Privacy Policy.');
      return;
    }

    // 2. Trigger validation for all fields
    validateField('name', name);
    validateField('studentId', studentId);
    validateField('university', university);
    validateField('college', college);
    validateField('email', email);
    validateField('mobile', mobile);
    validateField('password', password);

    // 3. Check if form is valid
    if (!isFormValid()) {
      Alert.alert('Fix Errors', 'Please correct all fields before submitting');
      return;
    }

    setIsLoading(true);

    try {
      const response = await dispatch(
        sendOtpSignupThunk({ email: email.trim(), name: name.trim() })
      ).unwrap();
      console.log(response, 'response+++++')
      dispatch(
        showMessage({
          type: 'success',
          text: response.message || 'OTP Sent Successfully! Please check your email.',
        })
      );

      const userDataForNextScreen = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
        role: 'student',
        university,
        college,
        phoneNumber: mobile,
        studentUniId: studentId.trim(),
      };

      navigation.navigate('YourRegistrationScreen', { 
        email: email.trim(),
        userData: userDataForNextScreen 
      });

    } catch (error) {
      console.log(error, 'OTP Error');
      let errorMessage = typeof error === 'string' ? error : error.message || 'Failed to send OTP.';
      
      if (errorMessage.toLowerCase().includes('already registered')) {
        dispatch(
          showMessage({
            type: 'error',
            text: 'This email is already registered. Please use a different email or try logging in.',
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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          {/* Header */}
          <View style={styles.headerSection}>
            <View style={styles.headerRow}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name='arrow-left' color={'#FFFFFF'} size={28} />
              </TouchableOpacity>
              <Text style={styles.logo}>UGive</Text>
            </View>
            <Text style={styles.tagline}>
              Sign up to UGive, and make a{'\n'}difference in someone's world{'\n'}today.
            </Text>
          </View>

          <View style={styles.card}>
            {/* Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Your Name</Text>
              <TextInput
                style={[styles.input, showError('name') && styles.inputError]}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                onBlur={() => handleBlur('name', name)}
                autoCapitalize="words"
              />
              {showError('name') && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            {/* Student ID */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Student Identifier</Text>
              <TextInput
                style={[styles.input, showError('studentId') && styles.inputError]}
                placeholder="Enter your Student ID"
                value={studentId}
                onChangeText={setStudentId}
                onBlur={() => handleBlur('studentId', studentId)}
              />
              {showError('studentId') && <Text style={styles.errorText}>{errors.studentId}</Text>}
            </View>

            {/* University */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Your University</Text>
              {universitiesLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#E5B865" />
                  <Text style={styles.loadingText}>Loading universities...</Text>
                </View>
              ) : (
                <Dropdown
                  style={[styles.dropdown, showError('university') && styles.inputError]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={universitiesList}
                  search
                  maxHeight={300}
                  labelField="name"
                  valueField="_id"
                  placeholder="Select University"
                  searchPlaceholder="Search..."
                  value={university}
                  onChange={handleUniversityChange}
                />
              )}
              {showError('university') && <Text style={styles.errorText}>{errors.university}</Text>}
            </View>

            {/* College */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Your College</Text>
              {collegesLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#E5B865" />
                  <Text style={styles.loadingText}>Loading colleges...</Text>
                </View>
              ) : (
                <Dropdown
                  style={[styles.dropdown, showError('college') && styles.inputError]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={collegesList}
                  search
                  maxHeight={300}
                  labelField="name"
                  valueField="_id"
                  placeholder={university ? 'Select College' : 'First select university'}
                  searchPlaceholder="Search..."
                  value={college}
                  onChange={handleCollegeChange}
                  disable={!university}
                />
              )}
              {showError('college') && <Text style={styles.errorText}>{errors.college}</Text>}
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>University Email</Text>
              <TextInput
                style={[styles.input, showError('email') && styles.inputError]}
                placeholder="name@usq.edu.au"
                value={email}
                onChangeText={setEmail}
                onBlur={() => handleBlur('email', email)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {showError('email') && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            {/* Mobile */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mobile Number</Text>
              <MaskedTextInput
                style={styles.input}
                placeholder="Enter Your Mobile Number"
                placeholderTextColor="#C4C4C4"
                mask="04[00] [000] [000]"
                value={mobile}
                onChangeText={(formatted) => {
                  setMobile(formatted);
                  if (submitAttempted) validateField('mobile', formatted);
                }}
                keyboardType="phone-pad"
              />
              {showError('mobile') && <Text style={styles.errorText}>{errors.mobile}</Text>}
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={[styles.passwordContainer, showError('password') && styles.inputError]}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Strong password"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (submitAttempted) validateField('password', text);
                  }}
                  onBlur={() => handleBlur('password', password)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#888" />
                </TouchableOpacity>
              </View>
              {showError('password') && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            {/* Terms Checkbox */}
            <View style={styles.termsContainer}>
              <TouchableOpacity
                style={styles.checkboxTouch}
                onPress={() => setIsTermsAccepted(!isTermsAccepted)}
              >
                <Icon
                  name={isTermsAccepted ? "checkbox" : "square-outline"}
                  size={24}
                  color={isTermsAccepted ? "#E5B865" : "#C4C4C4"}
                />
              </TouchableOpacity>

              <View style={styles.termsTextContainer}>
                <Text style={styles.termsTextBase}>
                  I agree to the{' '}
                  <Text style={styles.termsLink} onPress={handleOpenTerms}>
                    Terms & Conditions
                  </Text>{' '}
                  and{' '}
                  <Text style={styles.termsLink} onPress={handleOpenPrivacy}>
                    Privacy Policy
                  </Text>.
                </Text>
              </View>
            </View>

            {submitAttempted && !isTermsAccepted && (
              <Text style={styles.errorTextCenter}>You must accept the terms to continue.</Text>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.signUpButton,
                isLoading && styles.signUpButtonDisabled
              ]}
              onPress={handleSendOTP}
              disabled={isLoading}
            >
              <Text style={styles.signUpButtonText}>{isLoading ? 'Please wait...' : "Sign Up"}</Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>
                Already have an account?{' '}
                <Text style={styles.loginLink} onPress={handleLogin}>Login</Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Global Loader */}
      {isLoading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#E5B865" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E5B865' },
  scrollContent: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 40, paddingBottom: 40 },
  headerSection: { alignItems: 'center', marginBottom: 32 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', 
    marginBottom: 10,
    // Add some paddingRight to balance the back arrow if you want it perfectly centered
    paddingRight: 28 
  },
  logo: { 
    fontSize: 56, 
    fontWeight: '700', 
    color: '#FFFFFF', 
    letterSpacing: -1, 
    flex: 1, 
    textAlign: 'center' 
  },
  tagline: { fontSize: 16, color: '#FFFFFF', textAlign: 'center', lineHeight: 24 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  inputGroup: { marginBottom: 12 },
  label: { fontSize: 15, color: '#333', marginBottom: 8, fontWeight: '500' },
  input: {
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: '#FAFAFA',
  },
  dropdown: {
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
  },
  placeholderStyle: { fontSize: 15, color: '#C4C4C4' },
  selectedTextStyle: { fontSize: 15, color: '#333' },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
  },
  passwordInput: { paddingHorizontal: 16, paddingVertical: 12, fontSize: 15, width: '90%' },
  inputError: { borderColor: '#e74c3c' },
  errorText: { color: '#e74c3c', fontSize: 13, marginTop: 6 },
  errorTextCenter: { color: '#e74c3c', fontSize: 13, marginTop: 6, textAlign: 'center' },
  
  signUpButton: {
    backgroundColor: '#E5B865',
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  signUpButtonDisabled: { backgroundColor: '#D4D4D4' },
  signUpButtonText: { fontSize: 17, color: '#FFFFFF', fontWeight: '600' },
  
  loginContainer: { alignItems: 'center', marginTop: 16 },
  loginText: { fontSize: 14, color: '#B8B8B8' },
  loginLink: { color: '#E5B865', fontWeight: '600' },
  
  loadingContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50 },
  loadingText: { marginLeft: 10, color: '#999' },
  
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  
  // Terms Styles
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
    marginBottom: 5,
  },
  checkboxTouch: {
    marginRight: 10,
    marginTop: 2, 
  },
  termsTextContainer: {
    flex: 1,
  },
  termsTextBase: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
  },
  termsLink: {
    color: '#E5B865',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;