import { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import CustomModal from '../../common/CustomModal';
import GradientScreen from '../../common/GradientScreen';
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

const CustomButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.customButtonStyle} onPress={onPress}>
            <Text style={styles.customButtonTextStyle}>Submit</Text>
        </TouchableOpacity>
    )
}

const BgCard = ({ onPress }) => {
    const [name, setNameText] = useState('');
    const [recipeintName, setRecipeintNameText] = useState('');
    const [recipeintCollegeHouse, setRecipeintCollegeHouseText] = useState('');
    const [message, setMessageText] = useState('');
    return (
        <View style={styles.cardBgStyle}>
            
            <Text style={styles.cardLabelTextStyle}>
                Your Name
            </Text>
            <CustomTextField
                value={name}
                onChangeText={setNameText}
                placeholder="Enter your Name"
            />

            <Text style={styles.cardLabelTextStyle}>
                Recipeint's Name
            </Text>
            <CustomTextField
                value={recipeintName}
                onChangeText={setRecipeintNameText}
                placeholder="Enter Recipeint's Name"
            />

            <Text style={styles.cardLabelTextStyle}>
                Recipeint's College House
            </Text>
            <CustomTextField
                value={recipeintCollegeHouse}
                onChangeText={setRecipeintCollegeHouseText}
                placeholder="Type to search"
            />

            <Text style={styles.cardLabelTextStyle}>
                Your Message
            </Text>
            <CustomTextField
                value={message}
                onChangeText={setMessageText}
                placeholder="Enter Your Message"
                multiline={true}
            />

            <CustomButton onPress={onPress} />
            {/* </ScrollView> */}
        </View>
    )
}


const GiftCard = () => {
    const navigation = useNavigation();
    const [open, setOpen] = useState(false);
    const handleOnPress = () => {
        setOpen(true)
    }
    return (

        <GradientScreen colors={['#B5D1EB', '#B5D1EB', '#E9B243', '#6D5B98']} locations={[0, 0.5, 0.6, 1]}>
            <View style={styles.container}>
                {/* Fixed Background Images */}
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
                        <BgCard onPress={handleOnPress} />
                    </View>
                </KeyboardAwareScrollView>
                <CustomModal
                    visible={open}
                    onClose={() => setOpen(false)}
                    title="You're on break!"
                    buttonLabel='Got it'
                >
                    <Text style={[styles.screenTextStyle, { color: 'black', textAlign: 'center' }]}>
                        Thanks for sending last card. You can send another card from{' '}
                        <Text style={[styles.screenTextStyle, { color: '#E9B243', textAlign: 'center' }]}>
                            july 14.
                        </Text>
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

    // custom Text Field
    input: {
        height: 43,
        borderWidth: 1,
        borderColor: "#BDBDBD",
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 14,
        color: "#000",
        marginTop: 5,
        marginBottom: 16

    },
    // custom Button style 
    customButtonStyle: {
        height: 40,
        backgroundColor: '#DDDDDD',
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
        color: '#A0A0A0'
    },
    // cardBg style
    cardBgStyle: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 15,
        marginHorizontal: 16,
        marginTop: 25,
        height: height * 0.60,
    },
    cardLabelTextStyle: {
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0,
        color: 'black'
    }

});

export default GiftCard