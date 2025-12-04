import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Platform } from 'react-native';
import { Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import GradientScreen from '../../common/GradientScreen';
import { useState } from 'react';
const { width } = Dimensions.get('window');

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

const EditProfie = () => {
    const navigation = useNavigation();
    const [name, setNameText] = useState('');
    const [mobile, setMobileText] = useState('');
    const [email, setEmailText] = useState('');
    const [university, setUniversityText] = useState('');
    const [college, setCollegeText] = useState('');
    const [usi, setUsiText] = useState('');
    const [password, setPasswordText] = useState('');

    const handleSave = () => {
        // TODO: Add save profile logic here
        console.log('Profile saved');
        navigation.goBack();
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    return (
        <GradientScreen colors={['#B5D1EB']}>
            <View style={styles.container}>
                <View style={styles.flowerImagePosition}>
                    <Image
                        source={require('../../../assets/flower.png')}
                        style={styles.flowerImageStyle}
                    />
                </View>

                <KeyboardAwareScrollView
                    contentContainerStyle={styles.scrollContent}
                    enableOnAndroid={true}
                    enableAutomaticScroll={true}
                    extraScrollHeight={Platform.OS === 'ios' ? 20 : 100}
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

                        <View style={styles.formContainer}>
                            <Text style={styles.cardLabelTextStyle}>
                                Your Name
                            </Text>
                            <CustomTextField
                                value={name}
                                onChangeText={setNameText}
                                placeholder="Enter your Name"
                            />
                            
                            <Text style={styles.cardLabelTextStyle}>
                                Mobile
                            </Text>
                            <CustomTextField
                                value={mobile}
                                onChangeText={setMobileText}
                                placeholder="0478040086"
                                keyboardType="phone-pad"
                            />
                            
                            <Text style={styles.cardLabelTextStyle}>
                                Email
                            </Text>
                            <CustomTextField
                                value={email}
                                onChangeText={setEmailText}
                                placeholder="Enter your Email"
                                keyboardType="email-address"
                            />
                            
                            <Text style={styles.cardLabelTextStyle}>
                                University
                            </Text>
                            <CustomTextField
                                value={university}
                                onChangeText={setUniversityText}
                                placeholder="University of Queensland"
                            />
                            
                            <Text style={styles.cardLabelTextStyle}>
                                College
                            </Text>
                            <CustomTextField
                                value={college}
                                onChangeText={setCollegeText}
                                placeholder="Pitt Hall"
                            />
                            
                            <Text style={styles.cardLabelTextStyle}>
                                USI
                            </Text>
                            <CustomTextField
                                value={usi}
                                onChangeText={setUsiText}
                                placeholder="321"
                            />
                            
                            <Text style={styles.cardLabelTextStyle}>
                                Password [Leave empty to keep it unchanged]
                            </Text>
                            <CustomTextField
                                value={password}
                                onChangeText={setPasswordText}
                                placeholder="Enter Your Password"
                            />
                            
                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    style={[styles.btnLets, { backgroundColor: "#DDDDDD" }]}
                                    onPress={handleCancel}
                                >
                                    <Text style={styles.txtBtn}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.btnLets}
                                    onPress={handleSave}
                                >
                                    <Text style={styles.txtBtn}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
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
    flowerImagePosition: {
        position: 'absolute',
        top: -50,
        right: 0,
        zIndex: -1,
        pointerEvents: 'none',
    },
    flowerImageStyle: {
        width: 135,
        height: 157,
        resizeMode: "contain"
    },
    backIconStyle: {
        width: 38,
        height: 38,
        marginLeft: 20,
        marginTop: 10,
    },
    formContainer: {
        backgroundColor: '#fff',
        width: '92%',
        alignSelf: "center",
        marginTop: 60,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    profileStyle: {
        marginTop: 60,
        width: 115,
        height: 115,
        alignSelf: 'center'
    },
    screenTextStyle: {
        fontWeight: '800',
        fontSize: 18,
        letterSpacing: 0,
        alignSelf: 'center',
        color: '#7D8286',
    },
    butoonStyle: {
        height: 40,
        width: 200,
        backgroundColor: '#E9B243',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 4,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '800',
        fontSize: 14,
        lineHeight: 14,
        letterSpacing: 0.2,
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
        marginBottom: 16
    },
    cardLabelTextStyle: {
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0,
        color: 'gray'
    },
    btnLets: {
        backgroundColor: "#E9B243",
        borderRadius: 25,
        width: '40%',
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderWidth: 1,
        borderColor: '#fff',
        elevation: 8,
        marginTop: 10
    },
    txtBtn: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500'
    },
});

export default EditProfie;