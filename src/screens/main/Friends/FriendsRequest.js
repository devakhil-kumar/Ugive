import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import GradientScreen from "../../common/GradientScreen";
import { 
  fetchReceivedFriendRequests, 
  acceptFriendRequestAction, 
  rejectFriendRequestAction 
} from '../../../fetures/friendReceviedSlice';

const { height, width } = Dimensions.get('window');

export const CustomButton = ({ style, title, onPress, disabled, loading }) => {
    return (
        <TouchableOpacity 
            style={[styles.butoonStyle, style, disabled && styles.buttonDisabled]} 
            onPress={onPress} 
            disabled={disabled}
        >
            {loading ? (
                <ActivityIndicator size="small" color="white" />
            ) : (
                <Text style={styles.buttonText}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const ListItem = ({ request, onAccept, onReject, isAccepting, isRejecting }) => {
    return (
        <View style={styles.listDataItemStyle}>
            <View style={styles.imageContainer}>
                {request.profileImage ? (
                    <Image
                        source={{ uri: request?.sender?.profileImage}}
                        style={styles.personIconStyle}
                    />
                ) : (
                    <Image
                        source={require('../../../assets/person.png')}
                        style={styles.personIconStyle}
                    />
                )}
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.nameTextStyle} numberOfLines={1}>
                    {request?.sender?.name}
                </Text>
                <Text style={styles.emailTextStyle} numberOfLines={1}>
                    {request?.sender?.email}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton 
                    style={{ backgroundColor:'#F3B11C', marginRight: 8 , width:width/4}} 
                    title="Connect" 
                    onPress={onAccept}
                    disabled={isAccepting || isRejecting}
                    loading={isAccepting}
                />
                <CustomButton 
                    style={{ backgroundColor:'#BBBFC6' , marginTop:10, width:width/4}} 
                    title="Delete"
                    onPress={onReject}
                    disabled={isAccepting || isRejecting}
                    loading={isRejecting}
                />
            </View>
        </View>
    );
};

const FriendsRequest = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // Get friend requests from Redux store
    const { receivedRequests, loading, error, actionLoading } = useSelector(
        (state) => state.friendsRecevied
    );
    console.log(receivedRequests, 'recnhbvdifsbvdfkvndfb')

    useEffect(() => {
        dispatch(fetchReceivedFriendRequests());
    }, [dispatch]);

    const handleAccept = (requestId) => {
        console.log(requestId,'requestId=============')
        dispatch(acceptFriendRequestAction(requestId));
    };

    const handleReject = (requestId) => {
        console.log(requestId,'requestId=============')

        dispatch(rejectFriendRequestAction(requestId));
    };

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

                {/* Loading State */}
                {loading ? (
                    <View style={styles.centerContainer}>
                        <ActivityIndicator size="large" color="#F3B11C" />
                        <Text style={styles.loadingText}>Loading requests...</Text>
                    </View>
                ) : error ? (
                    <View style={styles.centerContainer}>
                        <Text style={styles.errorText}>Error: {error}</Text>
                        <TouchableOpacity 
                            style={styles.retryButton}
                            onPress={() => dispatch(fetchReceivedFriendRequests())}
                        >
                            <Text style={styles.retryButtonText}>Retry</Text>
                        </TouchableOpacity>
                    </View>
                ) : receivedRequests.length === 0 ? (
                    <View style={styles.centerContainer}>
                        <Text style={styles.emptyText}>No friend requests</Text>
                    </View>
                ) : (
                    <FlatList
                        data={receivedRequests}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <ListItem 
                                request={item}
                                onAccept={() => handleAccept(item?._id)}
                                onReject={() => handleReject(item?._id)}
                                isAccepting={actionLoading[item?._id] === 'accepting'}
                                isRejecting={actionLoading[item?._id] === 'rejecting'}
                            />
                        )}
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
        width: 25,
        height: 25,
    },
    topBarTextStyle: {
        fontWeight: '800',
        fontSize: 24,
        color: '#F3B11C',
        textAlign: 'center',
    },
    topBarStyle: {
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
    },
    personIconStyle: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
    },
    listDataItemStyle: {
        minHeight: 70,
        backgroundColor: '#ffffff10',
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding:10,
        borderRadius:10
    },
    imageContainer: {
        width: 60,
        height: 60,
        backgroundColor: '#F3B11C',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    nameTextStyle: {
        fontWeight: '800',
        fontSize: 16,
        color: 'white',
    },
    emailTextStyle: {
        fontWeight: '400',
        fontSize: 14,
        color: 'white',
        marginTop: 2,
    },
    buttonContainer: {
        // flexDirection: 'row',
        alignItems: 'center',
    },
    butoonStyle: {
        paddingVertical: 8,
        paddingHorizontal: 8,
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
        minWidth: 70,
        height: 35,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: 'white',
        fontWeight: '800',
        fontSize: 12,
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
    },
});

export default FriendsRequest;