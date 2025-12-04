import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GradientScreen from "../../common/GradientScreen";
const { height, width } = Dimensions.get('window');

const CustomButton = ({ style, title, onPress }) => {
    return (
        <TouchableOpacity style={[styles.butoonStyle, style]} onPress={onPress} >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const ListItem = () => {
    return (
        <View style={styles.listDataItemStyle}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../../assets/person.png')}
                    style={styles.personIconStyle}
                />
            </View>
            <View>
                <Text style={styles.nameTextStyle}>John Doe</Text>
                <Text style={styles.emailTextStyle}>@johndoe</Text>
            </View>
            <CustomButton style={{ backgroundColor: '#F3B11C' }} title={"Connect"} />
            <CustomButton style={{ backgroundColor: '#BBBFC6' }} title={'Delete'} />
        </View>
    )
}

const FriendsRequest = () => {
    const navigation = useNavigation();

    return (
        <GradientScreen colors={['#6955A5']}>
            <View style={styles.pageBg}>
                {/* Top Bar */}
                <View style={styles.topBarStyle}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={require('../../../assets/backIcon.png')}
                            style={styles.backIconStyle}
                        />
                    </TouchableOpacity>
                    <Text style={styles.topBarTextStyle}>Friend Requests</Text>
                </View>
                {/* Searched Data */}
                <FlatList
                    data={[...Array(5)]}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ index }) => (
                        <ListItem />
                    )}
                />
            </View>
        </GradientScreen>

    )
}

const styles = StyleSheet.create({
    pageBg: {
        padding: 16,
        flex: 1,
    },
    //Top Bar Style
    backIconStyle: {
        width: 21,
        height: 21,
        position: 'absolute',
        left: 0,
    },
    topBarTextStyle: {
        fontWeight: '800',
        fontSize: 24,
        color: '#F3B11C',
        textAlign: 'center'
    },
    topBarStyle: {
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    // List Data item Style
    personIconStyle: {
        width: 45,
        height: 45,
    },
    listDataItemStyle: {
        height: 60,
        backgroundColor: 'transparent',
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageContainer: {
        width: 60,
        height: 60,
        backgroundColor: '#F3B11C',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nameTextStyle: {
        fontWeight: '800',
        fontSize: 18,
        color: 'white'
    },
    emailTextStyle: {
        fontWeight: '400',
        fontSize: 17,
        color: 'white'
    },
    butoonStyle: {
        paddingVertical:8,
        paddingHorizontal:16,
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
    },
    buttonText: {
        color: 'white',
        fontWeight: '800',
        fontSize: 12,
    }
});

export default FriendsRequest;