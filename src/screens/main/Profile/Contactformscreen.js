// ─── screens/contact/ContactFormScreen.js ────────────────────────────────────
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AppText from '../../../components/AppText';
import AppTextInput from '../../../components/AppTextInput';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@react-native-vector-icons/feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GradientScreen from '../../common/GradientScreen';
import {
  submitContactForm,
  resetContactForm,
  clearContactFormError,
  selectContactSubmitting,
  selectContactSuccess,
  selectContactError,
} from '../../../fetures/contactformslice';

const InputField = ({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  multiline = false,
  error,
}) => (
  <View style={styles.fieldWrapper}>
    <AppText style={styles.fieldLabel}>{label}</AppText>
    <View
      style={[
        styles.inputBox,
        multiline && styles.inputBoxMultiline,
        error && styles.inputBoxError,
      ]}
    >
      <Icon
        name={icon}
        size={16}
        color={error ? '#FF6B6B' : '#F3B11C99'}
        style={styles.inputIcon}
      />
      <TextInput
        style={[styles.input, multiline && styles.inputMultiline]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#ffffff33"
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        textAlignVertical={multiline ? 'top' : 'center'}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'words'}
      />
    </View>
    {error ? <AppText style={styles.fieldError}>{error}</AppText> : null}
  </View>
);

const SuccessView = ({ onDone }) => (
  <View style={styles.successContainer}>
    <View style={styles.successIconCircle}>
      <Icon name="check" size={44} color="#4CAF50" />
    </View>
    <AppText style={styles.successTitle}>Submitted!</AppText>
    <AppText style={styles.successSubtitle}>
      Your contact form has been submitted successfully. We'll get back to you
      soon.
    </AppText>
    <TouchableOpacity
      style={styles.doneBtn}
      onPress={onDone}
      activeOpacity={0.85}
    >
      <Icon name="arrow-left" size={18} color="#FFF" />
      <AppText style={styles.doneBtnText}>Back</AppText>
    </TouchableOpacity>
  </View>
);

const ContactFormScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const submitting = useSelector(selectContactSubmitting);
  const success = useSelector(selectContactSuccess);
  const error = useSelector(selectContactError);

  const [form, setForm] = useState({
    name: '',
    surname: '',
    mobile: '',
    email: '',
    comment: '',
  });

  // field-level validation errors
  const [fieldErrors, setFieldErrors] = useState({});

  // Clear redux error when user edits any field
  useEffect(() => {
    if (error) dispatch(clearContactFormError());
  }, [form]);

  // Reset slice on unmount so next visit starts fresh
  useEffect(() => {
    return () => dispatch(resetContactForm());
  }, []);

  const set = key => value => {
    setForm(prev => ({ ...prev, [key]: value }));
    setFieldErrors(prev => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.surname.trim()) errs.surname = 'Surname is required';
    if (!form.mobile.trim()) errs.mobile = 'Mobile is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = 'Enter a valid email';
    if (!form.comment.trim()) errs.comment = 'Comment is required';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    dispatch(submitContactForm(form));
  };

  return (
    <GradientScreen colors={['#E9B243', '#6D5B98', '#B5D1EB']}>
      <View
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.pageBg}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
            >
              <Icon name="arrow-left" size={30} color="#FFF" />
            </TouchableOpacity>
            <AppText style={styles.topBarTitle}>Contact Us</AppText>
            <View style={{ width: 38 }} />
          </View>

          {success ? (
            <SuccessView onDone={() => navigation.goBack()} />
          ) : (
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              enableOnAndroid={true}
              extraScrollHeight={30}
              keyboardOpeningTime={0}
            >
              {/* Header card */}
              <View style={styles.headerCard}>
                <View style={styles.headerIconCircle}>
                  <Icon name="mail" size={28} color="#F3B11C" />
                </View>
                <View style={styles.headerTextBlock}>
                  <AppText style={styles.headerTitle}>Get in Touch</AppText>
                  <AppText style={styles.headerSubtitle}>
                    Fill in the form below and we'll respond as soon as
                    possible.
                  </AppText>
                </View>
              </View>

              <View style={styles.formCard}>
                <View style={styles.rowFields}>
                  <View style={{ flex: 1 }}>
                    <InputField
                      label="First Name"
                      icon="user"
                      value={form.name}
                      onChangeText={set('name')}
                      placeholder="John"
                      error={fieldErrors.name}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <InputField
                      label="Surname"
                      icon="user"
                      value={form.surname}
                      onChangeText={set('surname')}
                      placeholder="Smith"
                      error={fieldErrors.surname}
                    />
                  </View>
                </View>

                <InputField
                  label="Mobile"
                  icon="phone"
                  value={form.mobile}
                  onChangeText={set('mobile')}
                  placeholder="0412345678"
                  keyboardType="phone-pad"
                  error={fieldErrors.mobile}
                />

                <InputField
                  label="Email"
                  icon="mail"
                  value={form.email}
                  onChangeText={set('email')}
                  placeholder="john.smith@student.edu.au"
                  keyboardType="email-address"
                  error={fieldErrors.email}
                />

                <InputField
                  label="Comment"
                  icon="message-square"
                  value={form.comment}
                  onChangeText={set('comment')}
                  placeholder="Write your message here..."
                  multiline
                  error={fieldErrors.comment}
                />

                {/* API error banner */}
                {error ? (
                  <View style={styles.errorBanner}>
                    <Icon name="alert-triangle" size={15} color="#FF6B6B" />
                    <AppText style={styles.errorBannerText}>{error}</AppText>
                  </View>
                ) : null}

                {/* Submit button */}
                <TouchableOpacity
                  style={[
                    styles.submitBtn,
                    submitting && styles.submitBtnDisabled,
                  ]}
                  onPress={handleSubmit}
                  disabled={submitting}
                  activeOpacity={0.85}
                >
                  {submitting ? (
                    <ActivityIndicator size="small" color="#1a1228" />
                  ) : (
                    <>
                      <Icon name="send" size={16} color="#FFF" />
                      <AppText style={styles.submitBtnText}>Submit</AppText>
                    </>
                  )}
                </TouchableOpacity>
              </View>

              <View style={{ height: 30 }} />
            </KeyboardAwareScrollView>
          )}
        </View>
      </View>
    </GradientScreen>
  );
};

const styles = StyleSheet.create({
  pageBg: { flex: 1, paddingHorizontal: 16, paddingTop: 13 },

  // ── Top bar ──
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBarTitle: {
    color: '#Fff',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 8,
  },

  scrollContent: { paddingBottom: 20 },

  // ── Header card ──
  headerCard: {
    backgroundColor: '#745cb3',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ffffff18',
  },
  headerIconCircle: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#F3B11C22',
    borderWidth: 1,
    borderColor: '#F3B11C44',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextBlock: { flex: 1 },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 4,
  },
  headerSubtitle: { color: '#ffffff88', fontSize: 12, lineHeight: 17 },

  // ── Form card ──
  formCard: {
    backgroundColor: '#745cb3',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ffffff18',
    gap: 14,
  },

  rowFields: { flexDirection: 'row', gap: 10 },

  // ── Input field ──
  fieldWrapper: { gap: 6 },
  fieldLabel: {
    color: '#ffffffcc',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 2,
    letterSpacing: 0.3,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff0d',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffffff22',
    paddingHorizontal: 12,
    height: 48,
  },
  inputBoxMultiline: {
    height: 110,
    alignItems: 'flex-start',
    paddingTop: 12,
  },
  inputBoxError: {
    borderColor: '#FF6B6B88',
    backgroundColor: '#FF6B6B0d',
  },
  inputIcon: { marginRight: 10 },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  inputMultiline: { height: 84 },
  fieldError: {
    color: '#FF6B6B',
    fontSize: 11,
    fontWeight: '500',
    marginLeft: 2,
  },

  // ── Error banner ──
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FF6B6B18',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF6B6B44',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  errorBannerText: { color: '#FF6B6B', fontSize: 13, flex: 1, lineHeight: 18 },

  // ── Submit button ──
  submitBtn: {
    backgroundColor: '#F3B11C',
    borderRadius: 14,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
  },
  submitBtnDisabled: { opacity: 0.6 },
  submitBtnText: { color: '#FFF', fontSize: 18, fontWeight: '700' },

  // ── Success view ──
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    gap: 16,
  },
  successIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4CAF5022',
    borderWidth: 2,
    borderColor: '#4CAF5066',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  successTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
  },
  successSubtitle: {
    color: '#ffffff88',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },
  doneBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F3B11C',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 10,
  },
  doneBtnText: { color: '#fff', fontSize: 18, fontWeight: '800' },
});

export default ContactFormScreen;
