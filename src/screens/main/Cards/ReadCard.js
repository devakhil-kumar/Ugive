// screens/ReadCard.js
import { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GradientScreen from '../../common/GradientScreen';
import { useDispatch, useSelector } from 'react-redux';
import { listCards } from '../../../fetures/getCardListSlice';

const { width, height } = Dimensions.get('window');

const ReadCard = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { cards = [], loading, error } = useSelector((state) => state.listCards);
    console.log(cards, 'cards')
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        dispatch(listCards());
    }, [dispatch]);

    // Format date nicely
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const renderCardItem = ({ item }) => {
        console.log(item, 'item+++++++++')
        return (
            <View style={styles.cardItem}>
                <Text style={styles.senderName}>{item.sender_name}</Text>
                <Text style={styles.recipientText}>
                    To: {item.recipient_name} {item.recipient_last_name} ({item.recipient_email})
                </Text>
                <Text style={styles.sentDate}>Sent on {item.date || formatDate(item.sent_at)}</Text>
            </View>
        )
    };

    return (
        <GradientScreen colors={['#EAB344']}>
            <View style={styles.pageBg}>
                {/* Back Button */}
                <TouchableOpacity style={styles.backImagePosition} onPress={() => navigation.goBack()}>
                    <Image source={require('../../../assets/backIcon.png')} style={styles.backIconStyle} />
                </TouchableOpacity>

                {/* Header: Count & Date */}
                <View style={styles.headerContainer}>
                    <Text style={styles.countText}>Total Cards Sent: {cards.count}</Text>
                    <Text style={styles.dateText}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                </View>

                {/* Main Card Container */}
                <View style={styles.bgCard}>
                    <Text style={styles.screenText}>My Sent Cards</Text>

                    {/* Dropdown Toggle */}
                    <TouchableOpacity
                        onPress={() => setShowContent(!showContent)}
                        activeOpacity={0.8}
                        style={[styles.dropDownStyle, { borderColor: showContent ? '#B5D1E5' : '#BDBDBD' }]}
                    >
                        <View style={styles.dropDownTextRowStyle}>
                            <Image source={require('../../../assets/stacks_icon.png')} style={styles.stackIconStyle} />
                            <Text style={[styles.screenText, { marginStart: 10, color: '#7F7F7F' }]}>Read Cards</Text>
                        </View>
                        <Image
                            source={require('../../../assets/arrow_down.png')}
                            style={[styles.arrowIconStyle, showContent && { transform: [{ rotate: '180deg' }] }]}
                        />
                    </TouchableOpacity>
                    {showContent ? (
                        <View style={styles.contentContainerStyle}>
                            {loading ? (
                                <ActivityIndicator size="large" color="#B5D1E5" style={{ marginTop: 20 }} />
                            ) : error ? (
                                <Text style={styles.errorText}>Failed to load cards</Text>
                            ) : cards.length === 0 ? (
                                <Text style={styles.noCardsText}>No cards sent yet</Text>
                            ) : (
                                <FlatList
                                    data={cards.cards}
                                    keyExtractor={(item) => item._id}
                                    renderItem={renderCardItem}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ paddingBottom: 10 }}
                                />
                            )}
                        </View>
                    ) : (
                        <Text style={[styles.screenText, { color: '#7F7F7F', marginTop: 5, fontSize: 12 }]}>
                            Tap on arrow to read your sent cards!
                        </Text>
                    )}
                </View>
            </View>
        </GradientScreen>
    );
};

const styles = StyleSheet.create({
    pageBg: {
        padding: 16,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    countText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    dateText: {
        fontSize: 14,
        color: '#FFF8',
        marginTop: 6,
    },
    screenText: {
        fontSize: 14,
        fontWeight: '800',
        lineHeight: 14,
        letterSpacing: 0,
        color: 'black',
    },
    contentContainerStyle: {
        marginTop: 20,
        flex: 1,
    },
    cardItem: {
        backgroundColor: '#F8F8F8',
        padding: 14,
        borderRadius: 10,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    senderName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    recipientText: {
        fontSize: 13,
        color: '#555',
        marginTop: 4,
    },
    sentDate: {
        fontSize: 12,
        color: '#888',
        marginTop: 6,
        fontStyle: 'italic',
    },
    noCardsText: {
        textAlign: 'center',
        color: '#999',
        fontSize: 14,
        marginTop: 20,
    },
    errorText: {
        textAlign: 'center',
        color: 'red',
        marginTop: 20,
    },
    dropDownTextRowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dropDownStyle: {
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backImagePosition: {
        position: 'absolute',
        top: 20,
        left: 16,
        zIndex: 10,
    },
    backIconStyle: {
        width: 38,
        height: 38,
    },
    stackIconStyle: {
        width: 18,
        height: 18,
    },
    arrowIconStyle: {
        height: 10,
        width: 10,
        tintColor: '#7F7F7F',
    },
    bgCard: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 15,
        width: width * 0.85,
        height: height * 0.55,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
    },
});

export default ReadCard;