import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Platform, Alert, ActivityIndicator } from 'react-native';
import { Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation, useRoute } from '@react-navigation/native';
import GradientScreen from '../../common/GradientScreen';
import { useEffect, useState } from 'react';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { launchImageLibrary } from 'react-native-image-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import { updateProfile } from '../../../fetures/profileSlice';
import { showMessage } from '../../../fetures/messageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchColleges } from '../../../fetures/getUniversitySlice';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import { changePassword } from '../../../fetures/changepassword';
import { stat } from 'react-native-fs';
const { width } = Dimensions.get('window');

const CustomTextField = ({
    value,
    onChangeText,
    placeholder,
    keyboardType = "default",
    multiline = false,
    inputStyle,
    editable = true,
}) => {
    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            keyboardType={keyboardType}
            multiline={multiline}
            editable={editable}
            style={[
                styles.input,
                inputStyle,
                multiline && { textAlignVertical: "top", minHeight: 100 },
                !editable && styles.disabledInput
            ]}
            placeholderTextColor="#BDBDBD"
        />
    );
}

const EditProfie = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { user } = route.params || {};
    const [name, setNameText] = useState(user?.name || '');
    const [mobile, setMobileText] = useState(user?.phoneNumber || '');
    const [email, setEmailText] = useState(user?.email || '');
    const [university, setUniversityText] = useState(user?.university?.name || '');
    const [college, setCollegeText] = useState(user?.college?._id || '');
    const [usi, setUsiText] = useState(user?.studentUniId || '');
    const [image, setImage] = useState(user?.profileImage || null);
    const [currentpassword, setCurrentPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [newShowPassword, setNewShowPassword] = useState(false);
    const [conshowPassword, setConShowPassword] = useState(false);

    const [activeTab, setActiveTab] = useState('editProfile')

    const dispatch = useDispatch();

    const { colleges, collegesLoading } = useSelector(
        (state) => state.universities
    );
    const { loading, dataresponse, error} = useSelector((state) => state.password);
    const { updateLoading } = useSelector(state => state.profile);
    const collegesList = Array.isArray(colleges) ? colleges : [];

    useEffect(() => {
        dispatch(fetchColleges(user?.university?._id))
    }, [dispatch, university])

    const handleCollegeChange = (item) => {
        setCollegeText(item._id);
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('phoneNumber', mobile);
        formData.append('college', college);
        if (image && image.startsWith('data:image')) {
            formData.append('profileImage', image);
        }
        try {
            const resultAction = await dispatch(updateProfile(formData));
            if (updateProfile.fulfilled.match(resultAction)) {
                dispatch(showMessage({
                    type: 'success',
                    text: resultAction.payload.message || 'Profile updated successfully!'
                }));
                navigation.pop(2);
            } else {
                dispatch(showMessage({
                    type: 'error',
                    text: resultAction.payload || 'Something went wrong'
                }));
            }
        } catch (error) {
            dispatch(showMessage({
                type: 'error',
                text: error.message || 'An unexpected error occurred'
            }));
        }
    };

    const convertToBase64 = async (uri) => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error('Error converting image to base64:', error);
            Alert.alert('Error', 'Failed to convert image');
            return null;
        }
    };

    const handlePickImage = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            selectionLimit: 1,
        };
        launchImageLibrary(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
                return;
            }
            if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                Alert.alert('Error', 'Failed to pick image');
                return;
            }
            if (!response.assets || !response.assets[0]) {
                console.log('No image selected');
                return;
            }

            try {
                const asset = response.assets[0];
                console.log('Original image URI:', asset.uri);
                const resized = await ImageResizer.createResizedImage(
                    asset.uri,
                    600,
                    600,
                    'JPEG',
                    60,
                    0
                );
                const base64String = await convertToBase64(resized.uri);
                if (base64String) {
                    console.log('Image converted to base64 successfully');
                    setImage(base64String);
                } else {
                    Alert.alert('Error', 'Failed to process image');
                }
            } catch (err) {
                console.error("Image processing error:", err);
                Alert.alert('Error', 'Failed to process image: ' + err.message);
            }
        });
    };

    // const handlePasswordChange = () => {
    //     // Validation
    //     try {
    //         if (!currentpassword || !newpassword || !confirmpassword) {
    //             Alert.alert('Error', 'Please fill all password fields');
    //             return;
    //         }

    //         if (newpassword !== confirmpassword) {
    //             Alert.alert('Error', 'New password and confirm password do not match');
    //             return;
    //         }

    //         if (newpassword.length < 6) {
    //             Alert.alert('Error', 'New password must be at least 6 characters long');
    //             return;
    //         }
    //         const passwordData = {
    //             currentPassword: currentpassword,
    //             newPassword: newpassword,
    //         };
    //         console.log(passwordData, 'password')
    //         const response = dispatch(changePassword(passwordData));
    //         dispatch(showMessage({
    //             type: 'success',
    //             text: dataresponse?.data?.message,
    //         }))
    //     } catch (error) {
    //         // console.log(error, 'errror')
    //         // dispatch(showMessage({
    //         //     type: 'error',
    //         //     text: error.message,
    //         // }))
    //     }
    // };
    const handlePasswordChange = async () => {
        // Validation
        if (!currentpassword || !newpassword || !confirmpassword) {
            Alert.alert('Error', 'Please fill all password fields');
            return;
        }
    
        if (newpassword !== confirmpassword) {
            Alert.alert('Error', 'New password and confirm password do not match');
            return;
        }
    
        if (newpassword.length < 6) {
            Alert.alert('Error', 'New password must be at least 6 characters long');
            return;
        }
    
        const passwordData = {
            currentPassword: currentpassword,
            newPassword: newpassword,
        };
    
        try {
            const response = await dispatch(changePassword(passwordData)).unwrap();
            dispatch(showMessage({
                type: 'success',
                text: response?.message || 'Password changed successfully',
            }));
            navigation.pop(2)
        } catch (err) {
            dispatch(showMessage({
                type: 'error',
                text: err || 'Failed to change password',
            }));
        }
    };

    const handleCancelchange = () => {
        if (activeTab === 'editProfile') {
            navigation.goBack();
        } else {
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
    };

    if (updateLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#3340C4" />
            </View>
        );
    }


    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#3340C4" />
            </View>
        );
    }

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
                        <View style={styles.tabContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.tabButton,
                                    activeTab === 'editProfile' && styles.activeTabButton
                                ]}
                                onPress={() => setActiveTab('editProfile')}
                            >
                                <Text style={[
                                    styles.tabText,
                                    activeTab === 'editProfile' && styles.activeTabText
                                ]}>
                                    Edit Profile
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.tabButton,
                                    activeTab === 'changePassword' && styles.activeTabButton
                                ]}
                                onPress={() => setActiveTab('changePassword')}
                            >
                                <Text style={[
                                    styles.tabText,
                                    activeTab === 'changePassword' && styles.activeTabText
                                ]}>
                                    Change Password
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.formContainer}>

                            {activeTab === 'editProfile' && <View>
                                <View style={styles.avatarContainer}>
                                    {image ? (
                                        <Image
                                            source={{ uri: image }}
                                            style={{ width: 90, height: 90, borderRadius: 45 }}
                                            resizeMode="cover"
                                        />
                                    ) : (
                                        <FontAwesome name="user" size={50} color="#555" />
                                    )}
                                    <TouchableOpacity style={styles.editIcon} onPress={handlePickImage} >
                                        <FontAwesome name="edit" size={15} color="#555" />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.cardLabelTextStyle}>
                                    Your Name
                                </Text>
                                <CustomTextField
                                    value={name}
                                    onChangeText={setNameText}
                                    placeholder="Enter your Name"
                                    editable={true}
                                />

                                <Text style={styles.cardLabelTextStyle}>
                                    Mobile
                                </Text>
                                <CustomTextField
                                    value={mobile}
                                    onChangeText={setMobileText}
                                    placeholder="0478040086"
                                    keyboardType="phone-pad"
                                    editable={true}
                                />

                                <Text style={styles.cardLabelTextStyle}>
                                    Email
                                </Text>
                                <CustomTextField
                                    value={email}
                                    onChangeText={setEmailText}
                                    placeholder="Enter your Email"
                                    keyboardType="email-address"
                                    editable={false}
                                />

                                <Text style={styles.cardLabelTextStyle}>
                                    University
                                </Text>
                                <CustomTextField
                                    value={university}
                                    onChangeText={setUniversityText}
                                    placeholder="University of Queensland"
                                    editable={false}
                                />
                                <View style={styles.inputGroup}>
                                    <Text style={styles.cardLabelTextStyle}>Your College</Text>
                                    {collegesLoading ? (
                                        <View style={styles.loadingContainer}>
                                            <ActivityIndicator size="small" color="#E5B865" />
                                        </View>
                                    ) : (
                                        <Dropdown
                                            style={styles.dropdown}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            data={collegesList}
                                            search
                                            maxHeight={180}
                                            labelField="name"
                                            valueField="_id"
                                            placeholder={university ? 'Select College' : 'First select university'}
                                            searchPlaceholder="Search..."
                                            value={college}
                                            onChange={handleCollegeChange}
                                            disable={!university}
                                        />
                                    )}
                                </View>
                                <Text style={[styles.cardLabelTextStyle, { marginTop: 0 }]}>
                                    USI
                                </Text>
                                <CustomTextField
                                    value={usi}
                                    onChangeText={setUsiText}
                                    placeholder="321"
                                    editable={false}
                                />
                            </View>}

                            {activeTab === 'changePassword' && <View>
                                <Text style={{ fontSize: 18, fontWeight: '700', alignSelf: 'center' }}>Change Password</Text>
                                <View style={[styles.inputGroup, { marginBottom: 10, marginTop: 15 }]}>
                                    <Text style={styles.label}>Current Password</Text>
                                    <View style={styles.passwordContainer}>
                                        <TextInput
                                            style={styles.passwordInput}
                                            placeholder="Enter your Current Password"
                                            placeholderTextColor="#C4C4C4"
                                            value={currentpassword}
                                            onChangeText={setCurrentPassword}
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
                                </View>
                                <View style={[styles.inputGroup, { marginBottom: 10 }]}>
                                    <Text style={styles.label}>New Password</Text>
                                    <View style={styles.passwordContainer}>
                                        <TextInput
                                            style={styles.passwordInput}
                                            placeholder="Enter your New Password"
                                            placeholderTextColor="#C4C4C4"
                                            value={newpassword}
                                            onChangeText={setNewPassword}
                                            secureTextEntry={!newShowPassword}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                        />
                                        <TouchableOpacity
                                            style={styles.eyeIcon}
                                            onPress={() => setNewShowPassword(!newShowPassword)}
                                        >
                                            <Icon
                                                name={newShowPassword ? 'eye-off-outline' : 'eye-outline'}
                                                size={20}
                                                color="#C4C4C4"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={[styles.inputGroup, { marginBottom: 0 }]}>
                                    <Text style={styles.label}>Confirm New Password</Text>
                                    <View style={styles.passwordContainer}>
                                        <TextInput
                                            style={styles.passwordInput}
                                            placeholder="Enter your New Password"
                                            placeholderTextColor="#C4C4C4"
                                            value={confirmpassword}
                                            onChangeText={setConfirmPassword}
                                            secureTextEntry={!conshowPassword}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                        />
                                        <TouchableOpacity
                                            style={styles.eyeIcon}
                                            onPress={() => setConShowPassword(!conshowPassword)}
                                        >
                                            <Icon
                                                name={conshowPassword ? 'eye-off-outline' : 'eye-outline'}
                                                size={20}
                                                color="#C4C4C4"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>}

                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    style={[styles.btnLets, { backgroundColor: "#DDDDDD" }]}
                                    onPress={handleCancelchange}
                                >
                                    <Text style={styles.txtBtn}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.btnLets}
                                    onPress={activeTab === 'editProfile' ? handleSave : handlePasswordChange}
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
    pageBg: {
        flex: 1,
        // backgroundColor: '#F5F5F5',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 30,
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
    // Tab Slider Styles
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '92%',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 25,
        padding: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    activeTabButton: {
        backgroundColor: '#E9B243',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    activeTabText: {
        color: '#fff',
    },
    // Form Container
    formContainer: {
        backgroundColor: '#fff',
        width: '92%',
        alignSelf: "center",
        marginTop: 20,
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        alignSelf: 'center',
        color: '#333',
    },
    // Avatar Styles
    avatarContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#E9F2FF',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        alignSelf: 'center',
        marginBottom: 10,
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'lightgray',
        borderRadius: 12,
        padding: 4,
        borderWidth: 1,
        borderColor: '#fff',
    },
    // Input Styles
    cardLabelTextStyle: {
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0,
        color: 'gray',
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
        marginTop: 10,
        backgroundColor: '#FAFAFA',
    },
    disabledInput: {
        backgroundColor: '#F5F5F5',
        color: '#666666',
    },
    // Password Input Styles
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 15,
        color: '#333333',
        marginBottom: 10,
        fontWeight: '500',
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
        paddingVertical: 12,
        fontSize: 15,
        color: '#333333',
    },
    eyeIcon: {
        paddingHorizontal: 12,
    },
    // Button Styles
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    btnLets: {
        backgroundColor: "#E9B243",
        borderRadius: 25,
        width: '40%',
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: '#fff',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    txtBtn: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
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
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    loadingContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50 },
});


export default EditProfie;