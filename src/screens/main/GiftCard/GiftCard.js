import { use, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, ActivityIndicator, InteractionManager, Alert } from 'react-native';
import { Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import CustomModal from '../../common/CustomModal';
import GradientScreen from '../../common/GradientScreen';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEligibility, sendNote } from '../../../fetures/eligibilitySlice';
import { sendCardToFriend, resetCardState, checkBanWords } from '../../../fetures/cardSendSlice';
import { showMessage } from '../../../fetures/messageSlice';
import { Picker } from '@react-native-picker/picker';
import { fetchRewardsCollages } from '../../../fetures/getRewardsSlice';
import IOSRewardDropdown from './IOSRewardDropdown';
import { fetchColleges } from '../../../fetures/getUniversitySlice';
import { Dropdown } from 'react-native-element-dropdown';
const { height, width } = Dimensions.get('window');

const CustomTextField = ({
    value,
    onChangeText,
    placeholder,
    keyboardType = "default",
    multiline = false,
    inputStyle,
}) => {
    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            keyboardType={keyboardType}
            multiline={multiline}
            style={[styles.input, inputStyle, multiline && { textAlignVertical: "top", minHeight: 150 }]}
            placeholderTextColor="#BDBDBD"
        />
    );
}

const CustomButton = ({ onPress, loading }) => {
    return (
        <TouchableOpacity
            style={[styles.customButtonStyle, loading && { backgroundColor: '#E5B865' }]}
            onPress={onPress}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator color="#fff" size="small" />
            ) : (
                <Text style={styles.customButtonTextStyle}>Submit</Text>
            )}
        </TouchableOpacity>
    )
}

const BgCard = ({ onPress, sendCardLoading, collegesLoading, colleges }) => {
    const [name, setNameText] = useState('');
    const [recipeintName, setRecipeintNameText] = useState('');
    const [recipeintEmail, setRecipeintEmail] = useState('');
    const [message, setMessageText] = useState('');
    const [recipeintLast, setRecipeintNameLast] = useState('');
    const [recipeintCollege, setRecipeintCollege] = useState('');
    const dispatch = useDispatch();
    const { list: rewards, loading } = useSelector((state) => state.rewards);
    const [selectedReward, setSelectedReward] = useState(null);
    const [charCount, setCharCount] = useState(0)
    const [college, setCollege] = useState(null);

    const placeholderText = "Dear James,\n\nQuick reminder that you’re actually crushing it, even on the hard days. Don’t forget that.\n\nFrom Tom";

    console.log(rewards, loading, 'rewards');

    useEffect(() => {
        if (!rewards || rewards.length === 0) {
            dispatch(fetchRewardsCollages());
        }
    }, []);

    const rewardsData = rewards.map(item => ({
        ...item,
        isDisabled: !item.unlocked || !item.claimed || item.sent
    }));

    console.log('Rewards Data:', rewardsData);
    const handleTextChange = (text) => {
        setMessageText(text);
        setCharCount(text.trim().length);
    };

    const handleCollegeChange = (item) => {
        setCollege(item._id);
        // validateField('college', item._id);
    };


    const handleSubmit = async () => {
        if (!name.trim()) {
            Alert.alert('Error', 'Please enter your name');
            return;
        }
        if (!recipeintName.trim()) {
            Alert.alert('Error', 'Please enter recipient\'s first name');
            return;
        }
        if (!recipeintEmail.trim()) {
            Alert.alert('Error', 'Please enter recipient\'s email');
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

        console.log('Sending card data:', cardData);
        onPress(cardData);
    };

    console.log('Selected Reward:', rewards.length);

    return (
        <View style={{ backgroundColor: "#fff", borderRadius: 12, marginHorizontal: 16 }}>
            <View style={styles.cardBgStyle}>
                <Text style={styles.cardLabelTextStyle}>Your Name</Text>
                <CustomTextField
                    value={name}
                    onChangeText={setNameText}
                    placeholder="Enter your Name"
                />

                <Text style={styles.cardLabelTextStyle}>Recipient's Name</Text>
                <CustomTextField
                    value={recipeintName}
                    onChangeText={setRecipeintNameText}
                    placeholder="Enter Recipient's Name"
                />

                <Text style={styles.cardLabelTextStyle}>Recipient's Last Name</Text>
                <CustomTextField
                    value={recipeintLast}
                    onChangeText={setRecipeintNameLast}
                    placeholder="Enter Recipient's Last Name"
                />

                <Text style={styles.cardLabelTextStyle}>Recipient's Email</Text>
                <CustomTextField
                    value={recipeintEmail}
                    onChangeText={setRecipeintEmail}
                    placeholder="Enter email address"
                    keyboardType="email-address"
                />

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Recipient's College Name</Text>
                    {collegesLoading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="small" color="#E5B865" />
                            <Text style={styles.loadingText}>Loading colleges...</Text>
                        </View>
                    ) : (
                        <Dropdown
                            style={[styles.dropdown]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            data={colleges}
                            search
                            maxHeight={300}
                            labelField="name"
                            valueField="_id"
                            placeholder={'Select College'}
                            searchPlaceholder="Search..."
                            value={college}
                            onChange={handleCollegeChange}
                        />
                    )}
                </View>

                <Text style={styles.cardLabelTextStyle}>Rewards</Text>
                {(!rewards || rewards.length === 0) ? (
                    <Text style={{ color: "black", marginTop: 0, fontSize: 12 }}>No rewards available</Text>
                ) : Platform.OS === 'ios' ? (
                    <IOSRewardDropdown
                        data={rewardsData}
                        selectedValue={selectedReward}
                        onSelect={(value) => {
                            setSelectedReward(value);
                            console.log('✅ iOS Selected reward:', value);
                        }}
                    />
                ) : (
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedReward}
                            onValueChange={(itemValue) => {
                                if (itemValue !== 'placeholder') {
                                    setSelectedReward(itemValue);
                                    console.log('✅ Selected reward:', itemValue);
                                }
                            }}
                            style={styles.picker}
                            mode="dropdown"
                        >
                            <Picker.Item label="Select Reward" value={"placeholder"} color="#BDBDBD" />
                            {rewardsData.map((item) => (
                                <Picker.Item
                                    key={item.rewardId}
                                    label={`${item.rewardName}${!item.unlocked ? ' (Locked)' : item.unlocked && !item.claimed ? ' (Not Claimed Yet)' : item.sent ? ' (Already Sent)' : ' (✓ Ready to Send)'}`}
                                    value={item.rewardId}
                                    enabled={!item.isDisabled}
                                    color={item.isDisabled ? 'gray' : '#000'}
                                />
                            ))}
                        </Picker>
                    </View>
                )}

                <Text style={[styles.cardLabelTextStyle, { marginTop: 10 }]}>Your Message</Text>
                <CustomTextField
                    value={message}
                    // onChangeText={setMessageText}
                    onChangeText={handleTextChange}
                    placeholder={placeholderText}
                    multiline={true}
                    placeholderTextColor="#9CA3AF"
                />
                <View style={{ width: '100%', alignItems: 'flex-end' , paddingBottom:10}}><Text style={styles.cardLabelTextStyle}>
                    {charCount}/600
                </Text></View>
                <CustomButton onPress={handleSubmit} loading={sendCardLoading} />
            </View>
        </View>
    )
}

const GiftCard = () => {
    const navigation = useNavigation();
    const [open, setOpen] = useState(false);
    const [modalHandled, setModalHandled] = useState(false);
    // const [hasFetched, setHasFetched] = useState(false);
    const dispatch = useDispatch();
    const { eligible, message, next_available_date, loading, error, noteData } = useSelector(
        (state) => state.eligibility
    );

    const { colleges, collegesLoading } = useSelector(
        (state) => state.universities
    );

    const { user } = useSelector(state => state.profile);


    const { loading: sendCardLoading } = useSelector((state) => state.cardSend);
    const noteMessage = noteData?.data[0].message
    console.log(noteData, 'noptemessage+++=')

    useEffect(() => {
        dispatch(fetchEligibility());
        dispatch(sendNote());
    }, [dispatch]);

    // useEffect(() => {
    //     dispatch(fetchColleges(user.university._id))
    // }, [dispatch])

    // useEffect(() => {
    //     if (!loading) {
    //         setHasFetched(true);
    //     }
    // }, [loading]);

    useEffect(() => {
        if (!loading && eligible === false && error?.message) {
            setOpen(true);
        }
    }, [loading, eligible, error]);

    const handleOnPress = async (cardData) => {
        try {
            // Ban Word API should be here
            const finalMessage = { "text": cardData.message };
            try {
                console.log("Final message : ", finalMessage)
                const result = await dispatch(checkBanWords(finalMessage)).unwrap();
                console.log("response :", result);
                if (result?.clean_text && result.clean_text !== result.original) {
                    const clearMessage = result.clean_text;
                    console.log("Clear Message :", clearMessage);
                    cardData.message = clearMessage;
                    // Alert.alert(
                    //     "Inappropriate words detected. We cleaned the message for you.",
                    //     "info"
                    // );
                }
            } catch (error) {
                showMessage(
                    {
                        type: 'error',
                        text: "Message validation failed. Please try again." || error
                    }
                );
                return;
            }
            const result = await dispatch(sendCardToFriend(cardData)).unwrap();
            console.log("Result :", result);
            dispatch(
                showMessage({
                    type: 'success',
                    text: 'Card sent successfully to your friend!',
                })
            );

            navigation.navigate('SendingCard');
        } catch (error) {
            dispatch(
                showMessage({
                    type: 'error',
                    text: error || 'Failed to send card. Please try again.',
                })
            );
        } finally {
            dispatch(resetCardState());
        }
    };

    const handleCloseModal = async () => {
        setOpen(false);
        // setModalHandled(true);
        await new Promise(resolve => setTimeout(resolve, 50));
        //  dispatch(fetchEligibility());
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
        <GradientScreen colors={['#B5D1EB', '#B5D1EB', '#E9B243', '#6D5B98']} locations={[0, 0.5, 0.6, 1]}>
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
                        <Text style={styles.screenTextStyle}>One card a week keeps the smiles going!</Text>
                        <BgCard onPress={handleOnPress} sendCardLoading={sendCardLoading} collegesLoading={collegesLoading} colleges={colleges} />
                    </View>
                </KeyboardAwareScrollView>
                {open && (
                    <CustomModal
                        visible={open}
                        onClose={handleCloseModal}
                        title="You're on break!"
                        buttonLabel='Got it'
                        showClose={true}
                    >
                        <Text style={[styles.screenTextStyle, { color: 'black', textAlign: 'center' }]}>
                            {error?.message}
                        </Text>
                    </CustomModal>
                )}
            </View>
        </GradientScreen>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 80,
    },
    pageBg: {
        // flex: 1,
    },
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
        resizeMode: "contain",
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
        resizeMode: "contain"
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
        marginTop: 50
    },
    screenTextStyle: {
        fontWeight: '800',
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0,
        alignSelf: 'center',
        color: 'white',
        marginTop: 10
    },
    input: {
        height: 43,
        borderWidth: 1,
        borderColor: "#BDBDBD",
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 14,
        color: "#000",
        marginTop: 5,
        marginBottom:5
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
        color: '#FFF'
    },
    cardBgStyle: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        borderRadius: 15,
        paddingBottom: 60,
        marginTop: 10
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
        // overflow: 'hidden',
    },
    picker: {
        height: Platform.OS === 'ios' ? 50 : 50,
        width: '100%',
    },
    loadingContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50 },
    loadingText: { marginLeft: 10, color: '#999' },
    inputGroup: { marginBottom: 12 },
    label: { fontSize: 15, color: '#333', marginBottom: 8, fontWeight: '500' },
});

export default GiftCard;