import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import Icon from 'react-native-vector-icons/Ionicons';
import GradientScreen from '../../common/GradientScreen';
const { width, height } = Dimensions.get('window');


const Home = () => {
    // Top Stats
    const stats = [
        { icon: '💬', value: 99, color: '#8B7BF7' },
        { icon: '🎁', value: 99, color: '#FF9F43' },
        { icon: '👥', value: 99, color: '#54A0FF' },
        { icon: '🔥', value: 99, color: '#FF6B6B' },
    ];

    const rewards = [
        {
            id: 1,
            label: 'Pizza',
            image: require('../../../assets/pizzaone.png'),
            color: '#FFB800',
            progress: 45,
            stars: 8,
        },
        {
            id: 2,
            label: 'Coffee',
            image: require('../../../assets/coffeCupOne.png'),
            color: '#8B7BF7',
            progress: 75,
            stars: 5,
        },
        {
            id: 3,
            label: 'Flowers',
            image: require('../../../assets/flowerone.png'),
            color: '#FFB800',
            progress: 25,
            stars: 6, // Star number
        },
    ];

    const renderPieChart = (progress, color) => {
        const pieData = [
            {
                value: progress,
                color: color,
            },
            {
                value: 100 - progress,
                color: '#E8E8E8',
            },
        ];

        return (
            <View>
                <PieChart
                    data={pieData}
                    donut
                    radius={70}
                    innerRadius={65}
                    innerCircleColor="#F5F5F5"
                    showText={false}
                    startAngle={40}
                    initialAngle={40}
                />
            </View>
        );
    };

    const renderRewardItem = (item) => (
        <View key={item.id} style={styles.rewardItem}>

            <View style={styles.pieChartContainer}>

                {renderPieChart(item.progress, item.color)}
                <View style={styles.iconContainer}>

                    <Image source={item.image} style={{ width: width / 5, height: height / 10, resizeMode: 'contain', zIndex: 1 }} />
                </View>
                {/* Star with number */}
                <View style={styles.starContainer}>
                    <View style={styles.starBadge}>
                        <Text style={styles.starNumber}>{item.stars}</Text>
                        <Image
                            source={require('../../../assets/star.png')}
                            style={styles.starImage}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={{ position: 'absolute', top: -142, right:45 }}>
                        <Icon name='close-outline' color={'#F5F5F5'} size={220} />
                    </View>
                </View>
            </View>

            <Text style={styles.label}>{item.label}</Text>

        </View>
    );

    return (
        <GradientScreen colors={['#fff']}>
            <View style={styles.container}>
                <View style={styles.statsContainer}>
                    {stats.map((stat, index) => (
                        <View key={index} style={styles.statItem}>
                            <Text style={styles.statIcon}>{stat.icon}</Text>
                            <Text style={styles.statValue}>{stat.value}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.title}>Rewards</Text>

                <View style={styles.rewardsContainer}>
                    <View style={styles.topReward}>
                        {renderRewardItem(rewards[0])}
                    </View>
                    <View style={styles.bottomRow}>
                        {renderRewardItem(rewards[1])}
                        {renderRewardItem(rewards[2])}
                    </View>
                </View>
            </View>
        </GradientScreen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingTop: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 15,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    statIcon: {
        fontSize: 20,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFB800',
        marginLeft: 20,
        marginTop: 25,
        marginBottom: 20,
    },
    rewardsContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    topReward: {
        alignItems: 'center',
        marginBottom: 30,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    rewardItem: {
        alignItems: 'center',
        marginTop: 20
    },
    pieChartContainer: {
        position: 'relative',
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emoji: {
        fontSize: 36,
    },
    starContainer: {
        position: 'absolute',
        // right: -100,
        bottom: -25,
        left: -25,
    
    },
    starBadge: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1
    },
    starNumber: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
        // backgroundColor: '#FFFFFF',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'absolute',
        top: 10,
        zIndex: 1,
    },
    starImage: {
        width: width / 1.6,
        height: height / 18,
    },
    star: {
        fontSize: 28,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#8B7BF7',
        marginTop: 20,
    },
});

export default Home;