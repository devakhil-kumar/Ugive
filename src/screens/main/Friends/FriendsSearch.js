import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Keyboard,
} from "react-native";
import { useState, useEffect, useCallback } from 'react';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import GradientScreen from "../../common/GradientScreen";
import { searchUsers, clearSearchResults } from '../../../fetures/searchFriendSlice';
import debounce from 'lodash.debounce';
import { CustomButton } from "./FriendsRequest";
import { addFriend } from "../../../fetures/friendAdddeleteslice";

const { height, width } = Dimensions.get('window');



const FriendsSearch = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { results, loading, error } = useSelector((state) => state.searchFriend);
    console.log(results?.results, 'results+++++')
    const [searchText, setSearchText] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('People');

    const debouncedSearch = useCallback(
        debounce((query) => {
            if (query.trim()) {
                dispatch(searchUsers(query.trim()));
            } else {
                dispatch(clearSearchResults());
            }
        }, 400),
        [dispatch]
    );

    const handleSearch = (text) => {
        setSearchText(text);
        debouncedSearch(text);
    };

    const handleCancel = () => {
        setSearchText('');
        dispatch(clearSearchResults());
        Keyboard.dismiss();
    };

    const handleSelectedFilter = (filter) => {
        if (selectedFilter !== filter) {
            setSelectedFilter(filter);
        }
    };

    const ListItem = ({ item }) => {
        const dispatch = useDispatch();
        const { loadingById, sentRequestIds } = useSelector((state) => state.friendsAdd);
        const userId = item?._id || item?.id || item?.user?._id || item?.userId || null;

        const isRequestSent = sentRequestIds.includes(userId);
        const isLoading = loadingById[userId] || false;
        const handleAddFriend = () => {
            if (item.friendshipStatus === 'none') {
                dispatch(addFriend(userId));
            }
        };

        console.log(item?._id, '→', item?.friendshipStatus);

        const renderAction = () => {
            if (isRequestSent) {
                return (
                    <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
                        <Text style={{ color: '#999', fontWeight: '600', fontSize: 14 }}>
                            Request Sent
                        </Text>
                    </View>
                );
            }
            switch (item.friendshipStatus) {
                case 'connected':
                    return (
                        <TouchableOpacity style={{ paddingHorizontal: 22, paddingVertical: 10, backgroundColor: '#666', borderRadius: 30,height:40 }}>
                            <Text style={{ color: '#4CAF50', fontWeight: 'bold', fontSize: 16 }}>
                                Friend
                            </Text>
                        </TouchableOpacity>
                    );

                case 'requested_by_me':
                    return (
                        <View style={{ paddingHorizontal: 16, paddingVertical: 10, height:40 }}>
                            <Text style={{ color: '#999', fontWeight: '600', fontSize: 14 }}>
                                Request Sent
                            </Text>
                        </View>
                    );
                case 'none':
                default:
                    return (
                        <TouchableOpacity
                            onPress={handleAddFriend}
                            disabled={isLoading}
                            style={{
                                backgroundColor: '#F3B11C',
                                paddingHorizontal: 16,
                                paddingVertical: 11,
                                borderRadius: 30,
                                height:40
                            }}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>
                                {isLoading ? 'Sending...' : 'Add Friend'}
                            </Text>
                        </TouchableOpacity>
                    );
            }
        };

        return (
            <View style={styles.listDataItemStyle}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={
                                item?.profileImage
                                    ? { uri: item.profileImage }
                                    : require('../../../assets/person.png')
                            }
                            style={styles.personIconStyle}
                        />
                    </View>

                    <View style={{ flex: 1, marginLeft: 16}}>
                        <Text style={styles.nameTextStyle}>
                            {item?.name || item?.username || 'Unknown User'}
                        </Text>
                        <Text style={styles.emailTextStyle}>
                            {item?.email || '@user'}
                        </Text>
                    </View>
                    {renderAction()}
                </View>

                <View style={{ flexDirection: 'row', width:'100%', marginTop:5 }}>
                    <View>
                        <Text style={styles.emailTextStyle}>
                            Universities:- {item?.university?.name ||  'Not Now'}
                        </Text>
                        <Text style={styles.emailTextStyle }>
                           College:- {item?.college?.name ||  'Not Now'}
                        </Text>
                    </View>
                </View>
            </View>
        );
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
                    <Text style={styles.topBarTextStyle}>Search</Text>
                    <View style={{ width: 25 }} />
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
                            onChangeText={handleSearch}
                            autoFocus={false}
                        />
                    </View>
                    {searchText.length > 0 && (
                        <TouchableOpacity onPress={handleCancel}>
                            <Text style={styles.cancelTextStyle}>Cancel</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.filterRowStyle}>
                    {['People'].map((filter) => (
                        <TouchableOpacity
                            key={filter}
                            onPress={() => handleSelectedFilter(filter)}
                            activeOpacity={0.8}
                        >
                            <Text
                                style={
                                    selectedFilter === filter
                                        ? styles.selectedFilterText
                                        : styles.unselectedFilterText
                                }
                            >
                                {filter}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {loading ? (
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#F3B11C" />
                    </View>
                ) : error ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>{error}</Text>
                    </View>
                ) : results?.results?.length === 0 && searchText.length > 0 ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>No users found</Text>
                    </View>
                ) : (
                    <FlatList
                        data={results?.results}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                        renderItem={({ item }) => {
                            return <ListItem item={item} />;
                        }}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        ListEmptyComponent={
                            searchText.length === 0 ? (
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                                    <Text style={{ color: '#ccc', fontSize: 18 }}>
                                        Type to search friends...
                                    </Text>
                                </View>
                            ) : null
                        }
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
    backIconStyle: { width: 25, height: 25 },
    topBarTextStyle: {
        fontWeight: '800',
        fontSize: 24,
        color: '#F3B11C',
        flex: 1,
        textAlign: 'center',
        marginRight: 25,
    },
    topBarStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchIconStyle: { width: 23, height: 23 },
    serachBarRowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 10,
    },
    searchContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 40,
        height: 50,
        flex: 1,
        paddingHorizontal: 16,
        marginRight: 12,
    },
    serachTextInputStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        color: '#6955A5',
        marginStart: 10,
    },
    cancelTextStyle: {
        fontWeight: '500',
        fontSize: 18,
        color: 'white',
    },
    filterRowStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginVertical: 20,
    },
    selectedFilterText: {
        fontWeight: '900',
        fontSize: 19,
        color: 'white',
        borderBottomWidth: 3,
        borderColor: '#F3B11C',
        paddingBottom: 8,
    },
    unselectedFilterText: {
        fontWeight: '400',
        fontSize: 18,
        color: '#ccc',
    },
    listDataItemStyle: {
        // flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff10',
        padding: 12,
        borderRadius: 16,
        marginBottom: 12,
        // justifyContent: 'space-between'
    },
    imageContainer: {
        width: 60,
        height: 60,
        backgroundColor: '#F3B11C',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    personIconStyle: { width: 35, height: 35 },
    nameTextStyle: {
        fontWeight: '800',
        fontSize: 16,
        color: 'white',
    },
    emailTextStyle: {
        fontWeight: '400',
        fontSize: 12,
        color: '#ddd',
        marginTop: 2,
    },
});

export default FriendsSearch;