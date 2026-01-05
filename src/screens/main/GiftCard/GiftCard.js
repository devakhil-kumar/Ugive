import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, ActivityIndicator, InteractionManager, Alert } from 'react-native';
import { Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import CustomModal from '../../common/CustomModal';
import GradientScreen from '../../common/GradientScreen';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEligibility } from '../../../fetures/eligibilitySlice';
import { sendCardToFriend, resetCardState } from '../../../fetures/cardSendSlice';
import { showMessage } from '../../../fetures/messageSlice'; 
import { Dropdown } from 'react-native-element-dropdown';
import { fetchRewardsCollages } from '../../../fetures/getRewardsSlice';
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
            style={[styles.input, inputStyle, multiline && { textAlignVertical: "top", minHeight: 100 }]}
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

const BgCard = ({ onPress, sendCardLoading }) => {
    const [name, setNameText] = useState('');
    const [recipeintName, setRecipeintNameText] = useState('');
    const [recipeintEmail, setRecipeintEmail] = useState('');
    const [message, setMessageText] = useState('');
    const [recipeintLast, setRecipeintNameLast] = useState('');
    const [recipeintCollege, setRecipeintCollege] = useState('');
    const dispatch = useDispatch();
    const { list: rewards, loading } = useSelector((state) => state.rewards);
    const [selectedReward, setSelectedReward] = useState(null);

    console.log(rewards, loading, 'rewards');

    useEffect(() => {
        if (!rewards || rewards.length === 0) {
            dispatch(fetchRewardsCollages());
        }
    }, []);

    const rewardsData = rewards.map(item => ({
        ...item,
        disable: item.claimed || !item.unlocked
    }));

    const renderRewardItem = (item) => {
        return (
            <TouchableOpacity
                style={{
                    padding: 12,
                    backgroundColor: item.disable ? "#eee" : "white",
                    opacity: item.disable ? 0.5 : 1,
                    flexDirection: "row",
                    alignItems: "center"
                }}
            >
                <Image
                    source={{ uri: item.rewardImage }}
                    style={{ width: 30, height: 30, borderRadius: 6, marginRight: 10 }}
                />
                <Text style={{ color: item.disable ? "gray" : "black" }}>
                    {item.rewardName}
                    {item.claimed ? " (Claimed)" : ""}
                    {!item.unlocked && !item.claimed ? " (Locked)" : ""}
                </Text>
            </TouchableOpacity>
        );
    };

    const handleSubmit = () => {
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

    return (
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

            <Text style={styles.cardLabelTextStyle}>Recipient's College Name</Text>
            <CustomTextField
                value={recipeintCollege}
                onChangeText={setRecipeintCollege}
                placeholder="Enter Recipient's College Name"
            />

            <Text style={styles.cardLabelTextStyle}>Rewards</Text>
            {(!rewards || rewards.length === 0) ? (
                <Text style={{ color: "gray", marginTop: 10 }}>No rewards available</Text>
            ) : (
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={rewardsData}
                    labelField="rewardName"
                    valueField="rewardId"
                    placeholder="Select Reward"
                    searchPlaceholder="Search rewards..."
                    value={selectedReward}
                    onChange={(item) => {
                        if (!item.disable) {
                            setSelectedReward(item.rewardId);
                            console.log('Selected reward:', item.rewardId);
                        }
                    }}
                    renderItem={renderRewardItem}
                />
            )}

            <Text style={styles.cardLabelTextStyle}>Your Message</Text>
            <CustomTextField
                value={message}
                onChangeText={setMessageText}
                placeholder="Enter Your Message"
                multiline={true}
            />
            
            <CustomButton onPress={handleSubmit} loading={sendCardLoading} />
        </View>
    )
}

const GiftCard = () => {
    const navigation = useNavigation();
    const [open, setOpen] = useState(false);
    const [modalHandled, setModalHandled] = useState(false);
    const dispatch = useDispatch();
    
    // ELIGIBILITY STATE
    const { eligible, message, next_available_date, loading, error } = useSelector(
        (state) => state.eligibility
    );
    console.log(eligible,modalHandled,loading, 'eligible+++++++++')
    
    const { loading: sendCardLoading } = useSelector((state) => state.cardSend);

    useEffect(() => {
        dispatch(fetchEligibility());
    }, [dispatch]);

    useEffect(() => {
        if (!loading && !modalHandled) {
            if (eligible === false) {
                setOpen(true);
            } else {
                console.log('chlbldfsohlvbldfs')
                setOpen(false);
            }
        }
    }, [eligible, loading, modalHandled]);



    const handleOnPress = async (cardData) => {
        console.log('Submitting card:', cardData);
        try {
            const result = await dispatch(sendCardToFriend(cardData)).unwrap();
            
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
        setModalHandled(true);
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
                    extraScrollHeight={Platform.OS === 'ios' ? 20 : 40}
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
                        <BgCard onPress={handleOnPress} sendCardLoading={sendCardLoading} />
                    </View>
                </KeyboardAwareScrollView>
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
        paddingBottom: 30,
    },
    pageBg: {
        flex: 1,
    },
    pizzaImagePosition: {
        position: 'absolute',
        bottom: 0,
        right: 40,
        zIndex: 1,
        pointerEvents: 'none',
    },
    pizzaImageStyle: {
        width: width / 2.8,
        height: height / 9,
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
        marginBottom: 10
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
        marginTop: 10,
    },
    customButtonTextStyle: {
        fontWeight: '800',
        fontSize: 14,
        lineHeight: 14,
        letterSpacing: 0.2,
        color: '#FFF'
    },
    cardBgStyle: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 15,
        marginHorizontal: 16,
        marginTop: 25,
        height: height * 0.90,
    },
    cardLabelTextStyle: {
        fontWeight: '500',
        fontSize: 14,
        // lineHeight: 20,
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
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FAFAFA',
    },
    placeholderStyle: { fontSize: 15, color: '#C4C4C4' },
    selectedTextStyle: { fontSize: 15, color: '#333' },
});

export default GiftCard;