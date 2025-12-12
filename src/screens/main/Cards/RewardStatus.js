import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import GradientScreen from '../../common/GradientScreen';
import { fetchCardSendRemaining } from '../../../fetures/CardSendRemainingSlice';

const { width, height } = Dimensions.get('window');

export const ProgressPieChart = ({ percentage = 20 }) => {
    const pieData = [
        {
            value: percentage,
            color: '#FFFFFF',
            focused: false,
        },
        {
            value: 100 - percentage,
            color: 'transparent',
            strokeColor: '#FFFFFF',
            strokeWidth: 2,
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.chartContainer}>
                <PieChart
                    data={pieData}
                    donut
                    radius={136}
                    innerRadius={120}
                    innerCircleColor="#6D5B98"
                    strokeColor="#FFFFFF"
                    strokeWidth={3}
                    showText={false}
                    showGradient={false}
                    innerCircleBorderWidth={3}
                    innerCircleBorderColor={'#fff'}
                />
                <View style={styles.centerTextContainer}>
                    <Text style={styles.percentageText}>{percentage}%</Text>
                </View>
            </View>
        </View>
    );
};

const RewardStatus = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    
    const { currentReward, loading, error } = useSelector(state => state.cardRemaning);
    console.log(currentReward, 'current')

    const handleModal = () => {
        navigation.navigate('GiftCard');
    };

    if (loading) {
        return (
            <GradientScreen colors={['#6D5B98']}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FFFFFF" />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            </GradientScreen>
        );
    }

    if (error) {
        return (
            <GradientScreen colors={['#6D5B98']}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../../../assets/backIcon.png')}
                        style={styles.backIconStyle}
                    />
                </TouchableOpacity>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Error loading rewards</Text>
                    <TouchableOpacity 
                        style={styles.retryButton}
                        onPress={() => dispatch(fetchCardSendRemaining())}
                    >
                        <Text style={styles.retryText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            </GradientScreen>
        );
    }

    const remainingCards = currentReward 
        ? currentReward.totalPoints - currentReward.completedPoints 
        : 0;
    const percentage = currentReward?.percentage || 0;
    const rewardName = currentReward?.rewardName || 'Reward';

    console.log(percentage,currentReward, 'perscantge+++++++++++')
    return (
        <GradientScreen colors={['#6D5B98']}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    source={require('../../../assets/backIcon.png')}
                    style={styles.backIconStyle}
                />
            </TouchableOpacity>
            <View style={styles.pageBg}>
                <Text style={styles.header}>
                    Send {remainingCards} more {remainingCards === 1 ? 'card' : 'cards'} to
                    receive a free <Text style={{ color: "#D99656" }}>{rewardName}.</Text>
                </Text>
                <ProgressPieChart percentage={percentage} />
                <TouchableOpacity style={styles.btnLets} onPress={handleModal}>
                    <Text style={styles.txtBtn}>Start Writing</Text>
                </TouchableOpacity>
            </View>
        </GradientScreen>
    );
};

const styles = StyleSheet.create({
    pageBg: {
        padding: 16,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    backIconStyle: {
        width: 38,
        height: 38,
        alignSelf: "flex-start",
        marginLeft: 16
    },
    header: {
        fontSize: 22,
        color: '#fff',
        fontWeight: '600',
        textAlign: "center",
        lineHeight: 24,
        width: width * 0.7,
    },
    btnLets: {
        backgroundColor: "#E9B243",
        borderRadius: 25,
        width: '50%',
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderWidth: 1,
        borderColor: '#fff',
    },
    txtBtn: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500'
    },
    container: {
        width: 365,
        height: 365,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    centerTextContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    percentageText: {
        fontSize: 84,
        fontWeight: '800',
        color: '#FFFFFF',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: '#FFFFFF',
        fontSize: 16,
        marginTop: 10,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: "#E9B243",
        borderRadius: 25,
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#fff',
    },
    retryText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default RewardStatus;