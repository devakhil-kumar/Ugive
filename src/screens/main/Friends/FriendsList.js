import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState, useEffect, useMemo } from 'react';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import GradientScreen from "../../common/GradientScreen";
import { fetchFriendList } from '../../../fetures/friendListSlice'; 

const { height, width } = Dimensions.get('window');

const ListItem = ({ friend }) => {
    return (
        <View style={styles.listDataItemStyle}>
            <View style={styles.imageContainer}>
                {friend.profileImage ? (
                    <Image
                        source={{ uri: friend.profileImage }}
                        style={styles.personIconStyle}
                    />
                ) : (
                    <Image
                        source={require('../../../assets/person.png')}
                        style={styles.personIconStyle}
                    />
                )}
            </View>
            <View style={{ marginStart: 16, flex: 1 }}>
                <Text style={styles.nameTextStyle}>{friend.name}</Text>
                <Text style={styles.emailTextStyle}>{friend.email}</Text>
                {friend.university && (
                    <Text style={styles.universityTextStyle}>
                        {friend.university.name}
                    </Text>
                )}
            </View>
        </View>
    );
};

const FriendsList = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');

    const { list: friends, loading, error } = useSelector((state) => state.friends);
    console.log(friends,loading,error,'firends________')

    useEffect(() => {
        dispatch(fetchFriendList());
    }, [dispatch]);

    const filteredFriends = useMemo(() => {
        if (!searchText.trim()) {
            return friends;
        }
        const searchLower = searchText.toLowerCase();
        return friends.filter(friend => 
            friend.name?.toLowerCase().includes(searchLower) ||
            friend.email?.toLowerCase().includes(searchLower) ||
            friend.university?.name?.toLowerCase().includes(searchLower) ||
            friend.college?.name?.toLowerCase().includes(searchLower)
        );
    }, [friends, searchText]);

    const handleFriendList = () => {
        navigation.navigate('FriendsRequest');
    };

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
                    <View style={styles.searchContainerStyle}>
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
                    <Text style={styles.filterText}>
                        Friends {filteredFriends.length > 0 && `(${filteredFriends.length})`}
                    </Text>
                </View>

                {loading ? (
                    <View style={styles.centerContainer}>
                        <ActivityIndicator size="large" color="#F3B11C" />
                        <Text style={styles.loadingText}>Loading friends...</Text>
                    </View>
                ) : error ? (
                    <View style={styles.centerContainer}>
                        <Text style={styles.errorText}>Error: {error}</Text>
                        <TouchableOpacity 
                            style={styles.retryButton}
                            onPress={() => dispatch(fetchFriendList())}
                        >
                            <Text style={styles.retryButtonText}>Retry</Text>
                        </TouchableOpacity>
                    </View>
                ) : filteredFriends.length === 0 ? (
                    <View style={styles.centerContainer}>
                        <Text style={styles.emptyText}>
                            {searchText ? 'No friends found' : 'No friends yet'}
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={filteredFriends}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <ListItem friend={item} />}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                )}
            </View>
        </GradientScreen>
    );
};

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
        marginTop: 20,
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
    personIconStyle: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
    },
    listDataItemStyle: {
        height: 'auto',
        minHeight: 60,
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
        justifyContent: 'center',
        overflow: 'hidden'
    },
    nameTextStyle: {
        fontWeight: '800',
        fontSize: 18,
        color: 'white'
    },
    emailTextStyle: {
        fontWeight: '400',
        fontSize: 15,
        color: 'white',
        marginTop: 2
    },
    universityTextStyle: {
        fontWeight: '400',
        fontSize: 13,
        color: '#F3B11C',
        marginTop: 4
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: 'white',
        fontSize: 16,
        marginTop: 10,
    },
    errorText: {
        color: '#FF6B6B',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    emptyText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    retryButton: {
        backgroundColor: '#F3B11C',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 25,
    },
    retryButtonText: {
        color: '#6955A5',
        fontSize: 16,
        fontWeight: '700',
    }
});

export default FriendsList;