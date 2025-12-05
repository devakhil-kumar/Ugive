import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity } from "react-native";
import { useState } from 'react';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GradientScreen from "../../common/GradientScreen";
const { height, width } = Dimensions.get('window');

const ListItem = () => {
    return (
        <View style={styles.listDataItemStyle}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../../assets/person.png')}
                    style={styles.personIconStyle}
                />
            </View>
            <View style={{ marginStart: 16 }}>
                <Text style={styles.nameTextStyle}>John Doe</Text>
                <Text style={styles.emailTextStyle}>@johndoe</Text>
            </View>
        </View>
    )
}

const FriendsList = () => {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');

    const handleFriendList = () => {
        navigation.navigate('FriendsRequest')
    }

    return (
        <GradientScreen colors={['#6955A5']}>
            <View style={styles.pageBg}>
                <View style={styles.topBarStyle}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={require('../../../assets/backIcon.png')}
                            style={styles.backIconStyle}
                        />
                    </TouchableOpacity>
                    <Text style={styles.topBarTextStyle}>Friends List</Text>
                    <TouchableOpacity onPress={handleFriendList}>
                        <Image
                            source={require('../../../assets/share.png')}
                            style={styles.shareIconStyle}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.serachBarRowStyle}>
                    <View
                        style={styles.searchContainerStyle}
                    >
                        <Image
                            source={require('../../../assets/search.png')}
                            style={styles.searchIconStyle}
                        />
                        <TextInput
                            style={styles.serachTextInputStyle}
                            placeholder="Search People"
                            placeholderTextColor={'#6955A5'}
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                    </View>
                </View>
                <View style={styles.filterRowStyle}>
                    <Text style={styles.filterText}>Friends</Text>
                </View>
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
    backIconStyle: {
        width: 21,
        height: 21,
    },
    shareIconStyle: {
        width: width / 13,
        height: height / 19,
    },
    topBarTextStyle: {
        fontWeight: '800',
        fontSize: 24,
        color: '#F3B11C',
        textAlign: 'center'
    },
    topBarStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    searchIconStyle: {
        width: 23,
        height: 23,
    },
    serachBarRowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 40,
    },
    searchContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 40,
        height: 50,
        width: '100%',
        paddingHorizontal: 16
    },
    serachTextInputStyle: {
        flex: 1,
        fontSize: 20,
        fontWeight: '600',
        color: '#6955A5',
        marginStart: 10
    },
    //Filter People Row
    filterRowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20
    },
    filterText: {
        fontWeight: '900',
        fontSize: 24,
        color: 'white'
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
        justifyContent: 'flex-start',
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
    }
});

export default FriendsList;