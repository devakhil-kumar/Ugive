import React, { use, useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  InteractionManager,
  Alert,
  FlatList,
} from 'react-native';
import AppText from '../../../components/AppText';
import AppTextInput from '../../../components/AppTextInput';
import AppDropdown from '../../../components/AppTextInput'; // apna path check karo
import { Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CustomModal from '../../common/CustomModal';
import GradientScreen from '../../common/GradientScreen';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEligibility, sendNote } from '../../../fetures/eligibilitySlice';
import {
  sendCardToFriend,
  resetCardState,
  checkBanWords,
} from '../../../fetures/cardSendSlice';
import { showMessage } from '../../../fetures/messageSlice';
import { Picker } from '@react-native-picker/picker';
import { fetchRewardsCollages } from '../../../fetures/getRewardsSlice';
import IOSRewardDropdown from './IOSRewardDropdown';
import { fetchColleges } from '../../../fetures/getUniversitySlice';

// ✅ Friends slice imports
import { fetchFriends, clearFriends } from '../../../fetures/friendsSlice'; // apna path adjust karo
import { fetchProfile } from '../../../fetures/profileSlice';

const { height, width } = Dimensions.get('window');

const CustomTextField = ({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  multiline = false,
  inputStyle,
}) => {
  return (
    <AppTextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      multiline={multiline}
      style={[
        styles.input,
        inputStyle,
        multiline && { textAlignVertical: 'top', minHeight: 150 },
      ]}
      placeholderTextColor="#BDBDBD"
    />
  );
};

const CustomButton = ({ onPress, loading }) => {
  return (
    <TouchableOpacity
      style={[
        styles.customButtonStyle,
        loading && { backgroundColor: '#E5B865' },
      ]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <AppText style={styles.customButtonTextStyle}>Submit</AppText>
      )}
    </TouchableOpacity>
  );
};

const BgCard = ({ onPress, sendCardLoading, collegesLoading, colleges }) => {
  const [name, setNameText] = useState('');
  const [recipeintName, setRecipeintNameText] = useState('');
  const [recipeintEmail, setRecipeintEmail] = useState('');
  const [message, setMessageText] = useState('');
  const [recipeintLast, setRecipeintNameLast] = useState('');
  const [recipeintCollege, setRecipeintCollege] = useState('');
  const dispatch = useDispatch();
  const { list: rewards, loading } = useSelector(state => state.rewards);
  const [selectedReward, setSelectedReward] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const [college, setCollege] = useState(null);

  // ─── Friends Search State ─────────────────────────────────────────────────
  const [showDropdown, setShowDropdown] = useState(false);
  const searchTimeout = useRef(null);

  // ✅ Friends data from Redux
  const { results: friendsList, loading: friendsLoading } = useSelector(
    state => state.friendsList,
  );
  // ──────────────────────────────────────────────────────────────────────────

  const placeholderText = `Dear James,\n\nQuick reminder that you're actually crushing it, even on the hard days. Don't forget that.\n\nFrom Tom`;

  useEffect(() => {
    if (!rewards || rewards.length === 0) {
      dispatch(fetchRewardsCollages());
    }
  }, []);

  const rewardsData = rewards.map(item => ({
    ...item,
    isDisabled: !item.unlocked || !item.claimed || item.sent,
  }));

  const handleTextChange = text => {
    setMessageText(text);
    setCharCount(text.trim().length);
  };

  const handleCollegeChange = item => {
    setRecipeintCollege(item._id);
  };

  // ─── Friends Search Handlers ──────────────────────────────────────────────

  /**
   * Jab user "Recipient's Name" input mein type kare:
   * - State update karo
   * - Debounce ke saath API call karo (300ms)
   * - Dropdown show karo
   */
  const handleRecipientNameChange = text => {
    setRecipeintNameText(text);

    // Agar input clear ho jaye to dropdown band karo
    if (!text.trim()) {
      setShowDropdown(false);
      dispatch(clearFriends());
      return;
    }

    setShowDropdown(true);

    // Debounce — pehla pending timeout clear karo
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      dispatch(fetchFriends(text.trim()));
    }, 300);
  };

  /**
   * Jab user list mein se kisi friend par click kare:
   * - Saare related fields autofill karo
   * - Dropdown band karo
   */
  const handleSelectFriend = friend => {
    // Name split karo: "Annie Phillips" → first = "Annie", last = "Phillips"
    const nameParts = friend.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    setRecipeintNameText(firstName);
    setRecipeintNameLast(lastName);
    setRecipeintEmail(friend.email || '');

    // College dropdown set karo agar college data available hai
    if (friend.college?._id) {
      setRecipeintCollege(friend.college._id);
      setCollege(friend.college._id); // Dropdown value bhi update karo
    }

    // Dropdown band karo aur list clear karo
    setShowDropdown(false);
    dispatch(clearFriends());
  };

  // ──────────────────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    if (!recipeintName.trim()) {
      Alert.alert('Error', "Please enter recipient's first name");
      return;
    }

    if (!recipeintLast.trim()) {
      Alert.alert('Error', "Please enter recipient's last name");
      return;
    }

    if (!recipeintCollege.trim()) {
      Alert.alert('Error', "Please enter recipient's College name");
      return;
    }

    if (!recipeintEmail.trim()) {
      Alert.alert('Error', "Please enter recipient's email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recipeintEmail)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (!message.trim()) {
      Alert.alert('Error', 'Please enter a message');
      return;
    }

    if (charCount < 160) {
      Alert.alert('Error', `Message must be at least 160 characters.`);
      return;
    }

    if (charCount > 600) {
      Alert.alert('Error', `Message cannot exceed 600 characters.`);
      return;
    }

    const cardData = {
      reward: selectedReward,
      message: message.trim(),
      sender_name: name.trim(),
      recipient_email: recipeintEmail.trim().toLowerCase(),
      recipient_name: recipeintName.trim(),
      recipient_last_name: recipeintLast.trim(),
      college_name: recipeintCollege.trim(),
    };

    onPress(cardData);
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        marginHorizontal: 16,
      }}
    >
      <View style={styles.cardBgStyle}>
        <AppText style={styles.cardLabelTextStyle}>Your Name</AppText>
        <CustomTextField
          value={name}
          onChangeText={setNameText}
          placeholder="Enter your Name"
        />

        {/* ─── Recipient's Name with Friends Search Dropdown ──────────────── */}
        <AppText style={styles.cardLabelTextStyle}>Recipient's Name</AppText>

        {/* Input + Dropdown wrapper — zIndex zaroori hai overlap ke liye */}
        <View style={styles.searchWrapper}>
          <AppTextInput
            value={recipeintName}
            onChangeText={handleRecipientNameChange}
            placeholder="Enter Recipient's Name"
            style={[styles.input, { marginBottom: 0 }]}
            placeholderTextColor="#BDBDBD"
            autoCorrect={false}
            autoCapitalize="words"
          />

          {/* Friends Dropdown List */}
          {showDropdown && (
            <View style={styles.friendsDropdown}>
              {friendsLoading ? (
                <View style={styles.dropdownLoadingRow}>
                  <ActivityIndicator size="small" color="#E5B865" />
                  <AppText style={styles.dropdownLoadingText}>
                    Searching...
                  </AppText>
                </View>
              ) : friendsList.length === 0 ? (
                <View style={styles.dropdownEmptyRow}>
                  <AppText style={styles.dropdownEmptyText}>
                    No friends found
                  </AppText>
                </View>
              ) : (
                <FlatList
                  data={friendsList}
                  keyExtractor={item => item.id}
                  scrollEnabled={friendsList.length > 4}
                  keyboardShouldPersistTaps="handled"
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.friendRow}
                      onPress={() => handleSelectFriend(item)}
                      activeOpacity={0.7}
                    >
                      {/* Profile Image */}
                      {item.profileImage ? (
                        <Image
                          source={{ uri: item.profileImage }}
                          style={styles.friendAvatar}
                        />
                      ) : (
                        <View style={styles.friendAvatarPlaceholder}>
                          <AppText style={styles.friendAvatarInitial}>
                            {item.name?.charAt(0) || '?'}
                          </AppText>
                        </View>
                      )}

                      {/* Name + University */}
                      <View style={styles.friendInfo}>
                        <AppText style={styles.friendName}>{item.name}</AppText>
                        {item.university?.name ? (
                          <AppText style={styles.friendUniversity}>
                            {item.university.name}
                          </AppText>
                        ) : null}
                      </View>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          )}
        </View>
        {/* ─────────────────────────────────────────────────────────────────── */}

        <AppText style={[styles.cardLabelTextStyle, { marginTop: 8 }]}>
          Recipient's Last Name
        </AppText>
        <CustomTextField
          value={recipeintLast}
          onChangeText={setRecipeintNameLast}
          placeholder="Enter Recipient's Last Name"
        />

        <AppText style={styles.cardLabelTextStyle}>Recipient's Email</AppText>
        <CustomTextField
          value={recipeintEmail}
          onChangeText={setRecipeintEmail}
          placeholder="Enter email address"
          keyboardType="email-address"
        />

        <View style={styles.inputGroup}>
          <AppText style={styles.label}>Recipient's College Name</AppText>
          {collegesLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#E5B865" />
              <AppText style={styles.loadingText}>Loading colleges...</AppText>
            </View>
          ) : (
            <AppDropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={colleges}
              search
              maxHeight={300}
              valueField="_id"
              placeholder="Select College"
              searchPlaceholder="Search..."
              value={college}
              onChange={handleCollegeChange}
            />
          )}
        </View>

        <AppText style={styles.cardLabelTextStyle}>Rewards</AppText>
        {!rewards || rewards.length === 0 ? (
          <AppText style={{ color: 'black', marginTop: 0, fontSize: 12 }}>
            No rewards available
          </AppText>
        ) : Platform.OS === 'ios' ? (
          <IOSRewardDropdown
            data={rewardsData}
            selectedValue={selectedReward}
            onSelect={value => {
              setSelectedReward(value);
            }}
          />
        ) : (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedReward}
              onValueChange={itemValue => {
                if (itemValue !== 'placeholder') {
                  setSelectedReward(itemValue);
                }
              }}
              style={styles.picker}
              mode="dropdown"
            >
              <Picker.Item
                label="Select Reward"
                value={'placeholder'}
                color="#BDBDBD"
              />
              {rewardsData.map(item => (
                <Picker.Item
                  key={item.rewardId}
                  label={`${item.rewardName}${
                    !item.unlocked
                      ? ' (Locked)'
                      : item.unlocked && !item.claimed
                      ? ' (Not Claimed Yet)'
                      : item.sent
                      ? ' (Already Sent)'
                      : ' (✓ Ready to Send)'
                  }`}
                  value={item.rewardId}
                  enabled={!item.isDisabled}
                  color={item.isDisabled ? 'gray' : '#000'}
                />
              ))}
            </Picker>
          </View>
        )}

        <AppText style={[styles.cardLabelTextStyle, { marginTop: 10 }]}>
          Your Message
        </AppText>
        <CustomTextField
          value={message}
          onChangeText={handleTextChange}
          placeholder={placeholderText}
          multiline={true}
          placeholderTextColor="#9CA3AF"
        />
        <View
          style={{ width: '100%', alignItems: 'flex-end', paddingBottom: 10 }}
        >
          <AppText style={styles.cardLabelTextStyle}>{charCount}/600</AppText>
        </View>
        <CustomButton onPress={handleSubmit} loading={sendCardLoading} />
      </View>
    </View>
  );
};

const GiftCard = () => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [modalHandled, setModalHandled] = useState(false);
  const dispatch = useDispatch();
  const { eligible, message, next_available_date, loading, error, noteData } =
    useSelector(state => state.eligibility);

  const { colleges, collegesLoading } = useSelector(
    state => state.universities,
  );

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchProfile());
    }, [dispatch]),
  );

  const { user } = useSelector(state => state.profile);

  const { loading: sendCardLoading } = useSelector(state => state.cardSend);
  const noteMessage = noteData?.data[0].message;

  useEffect(() => {
    dispatch(fetchEligibility());
    dispatch(sendNote());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchColleges(user?.university?._id));
  }, [dispatch]);

  useEffect(() => {
    if (!loading && eligible === false && error?.message) {
      setOpen(true);
    }
  }, [loading, eligible, error]);

  const handleOnPress = async cardData => {
    try {
      const finalMessage = { text: cardData.message };
      try {
        const result = await dispatch(checkBanWords(finalMessage)).unwrap();
        if (result?.clean_text && result.clean_text !== result.original) {
          cardData.message = result.clean_text;
        }
      } catch (error) {
        showMessage({
          type: 'error',
          text: 'Message validation failed. Please try again.' || error,
        });
        return;
      }
      const result = await dispatch(sendCardToFriend(cardData)).unwrap();
      dispatch(
        showMessage({
          type: 'success',
          text: 'Card sent successfully to your friend!',
        }),
      );
      navigation.navigate('SendingCard');
    } catch (error) {
      dispatch(
        showMessage({
          type: 'error',
          text: error || 'Failed to send card. Please try again.',
        }),
      );
    } finally {
      dispatch(resetCardState());
    }
  };

  const handleCloseModal = async () => {
    setOpen(false);
    await new Promise(resolve => setTimeout(resolve, 50));
    navigation.navigate('HomeScreen');
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={'#6D5B98'} />
      </View>
    );
  }

  return (
    <GradientScreen
      colors={['#B5D1EB', '#B5D1EB', '#E9B243', '#6D5B98']}
      locations={[0, 0.5, 0.6, 1]}
    >
      <View style={styles.container}>
        <View style={styles.cupImagePosition}>
          <Image
            source={require('../../../assets/cup.png')}
            style={styles.cupImageStyle}
          />
        </View>
        <View style={styles.pizzaImagePosition}>
          <Image
            source={require('../../../assets/pizza.png')}
            style={styles.pizzaImageStyle}
          />
        </View>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContent}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          extraScrollHeight={Platform.OS === 'ios' ? 200 : 40}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          enableResetScrollToCoords={false}
        >
          <View style={styles.pageBg}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../../../assets/backIcon.png')}
                style={styles.backIconStyle}
              />
            </TouchableOpacity>
            <Image
              source={require('../../../assets/ugive_logo.png')}
              style={styles.appLogoStyle}
            />
            <AppText style={styles.screenTextStyle}>
              One card a week keeps the smiles going!
            </AppText>
            <BgCard
              onPress={handleOnPress}
              sendCardLoading={sendCardLoading}
              collegesLoading={collegesLoading}
              colleges={colleges}
            />
          </View>
        </KeyboardAwareScrollView>
        {open && (
          <CustomModal
            visible={open}
            onClose={handleCloseModal}
            title="You're on break!"
            buttonLabel="Got it"
            showClose={true}
          >
            <AppText
              style={[
                styles.screenTextStyle,
                { color: 'black', textAlign: 'center' },
              ]}
            >
              {error?.message}
            </AppText>
          </CustomModal>
        )}
      </View>
    </GradientScreen>
  );
};

export default GiftCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  pageBg: {},
  pizzaImagePosition: {
    position: 'absolute',
    bottom: 0,
    right: 40,
    zIndex: 1,
    pointerEvents: 'none',
  },
  pizzaImageStyle: {
    width: width / 2.5,
    height: height / 10,
    resizeMode: 'contain',
  },
  cupImagePosition: {
    position: 'absolute',
    top: 0,
    right: -3,
    zIndex: -1,
    pointerEvents: 'none',
  },
  cupImageStyle: {
    width: width / 2.7,
    height: height / 6,
    resizeMode: 'contain',
  },
  backIconStyle: {
    width: 38,
    height: 38,
    marginLeft: 20,
    marginTop: 10,
  },
  appLogoStyle: {
    width: 187,
    height: 64,
    alignSelf: 'center',
    marginTop: 50,
  },
  screenTextStyle: {
    fontWeight: '800',
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0,
    alignSelf: 'center',
    color: 'white',
    marginTop: 10,
  },
  input: {
    height: 43,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#000',
    marginTop: 5,
    marginBottom: 5,
  },
  customButtonStyle: {
    height: 40,
    backgroundColor: '#E5B865',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  customButtonTextStyle: {
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 0.2,
    color: '#FFF',
  },
  cardBgStyle: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 15,
    paddingBottom: 60,
    marginTop: 10,
  },
  cardLabelTextStyle: {
    fontWeight: '500',
    fontSize: 14,
    letterSpacing: 0,
    color: 'black',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
  },
  placeholderStyle: { fontSize: 15, color: '#C4C4C4' },
  selectedTextStyle: { fontSize: 15, color: '#333' },
  pickerContainer: {
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    marginTop: 5,
    marginBottom: 10,
  },
  picker: {
    height: Platform.OS === 'ios' ? 50 : 50,
    width: '100%',
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  loadingText: { marginLeft: 10, color: '#999' },
  inputGroup: { marginBottom: 12 },
  label: { fontSize: 15, color: '#333', marginBottom: 8, fontWeight: '500' },

  // ─── Friends Search Dropdown Styles ────────────────────────────────────────
  searchWrapper: {
    position: 'relative',
    zIndex: 999, // Dropdown baaki inputs ke upar aaye
  },
  friendsDropdown: {
    position: 'absolute',
    top: 52, // Input height ke theek neeche
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    maxHeight: 220,
    zIndex: 1000,
    elevation: 10, // Android ke liye shadow/overlap
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  friendAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  friendAvatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E5B865',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  friendAvatarInitial: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  friendUniversity: {
    fontSize: 11,
    color: '#888',
    marginTop: 1,
  },
  dropdownLoadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  dropdownLoadingText: {
    marginLeft: 8,
    color: '#999',
    fontSize: 13,
  },
  dropdownEmptyRow: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  dropdownEmptyText: {
    color: '#BDBDBD',
    fontSize: 13,
  },
});
