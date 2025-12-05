import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GradientScreen from '../../common/GradientScreen';
import CustomModal from '../../common/CustomModal';
import { useState } from 'react';
const { width, height } = Dimensions.get('window');


const ProgressPieChart = ({ percentage = 20 }) => {
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

const RewardStutas = () => {
    const navigation = useNavigation();
    const [open, setOpen] = useState(false);

    const hnadleModal = () => {
        setOpen(true)
    }

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
                    Send 4 more cards to
                    receive a free  <Text style={{ color: "#D99656" }}>Coffee.</Text>
                </Text>
                <ProgressPieChart />
                <TouchableOpacity style={styles.btnLets} onPress={hnadleModal} >
                    <Text style={styles.txtBtn}>Start Writing</Text>
                </TouchableOpacity>
            </View>
            <CustomModal
                visible={open}
                onClose={() => setOpen(false)}
                title="You're on break!"
                buttonLabel='Got it'
            >
                <Text style={[styles.screenTextStyle, { color: 'black', textAlign: 'center' }]}>
                    Thanks for sending last card. You can send another card from{' '}
                    <Text style={[styles.screenTextStyle, { color: '#E9B243', textAlign: 'center' }]}>
                        july 14.
                    </Text>
                </Text>
            </CustomModal>
        </GradientScreen>

    )
}


const styles = StyleSheet.create({
    pageBg: {
        padding: 16,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    screenText: {
        fontSize: 14,
        fontWeight: '800',
        lineHeight: 14,
        letterSpacing: 0,
        color: 'black'
    },
    contentContainerStyle: {
        padding: 16,
        borderWidth: 2,
        borderColor: '#BDBDBD',
        borderRadius: 10,
        marginTop: 20
    },
    dropDownTextRowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dropDownStyle: {
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    backImagePosition: {
        position: 'absolute',
        top: 20,
        left: 16,
    },
    backIconStyle: {
        width: 38,
        height: 38,
        alignSelf: "flex-start",
        marginLeft: 16
    },
    stackIconStyle: {
        width: 18,
        height: 18,
    },
    arrowIconStyle: {
        height: 10,
        width: 10
    },
    bgCard: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 15,
        width: width * 0.8,
        height: height * 0.4
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
        // marginTop: 30
    },
    txtBtn: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500'
    },
    ////paircahrt
    container: {
        width: 365,
        height: 365,
        // backgroundColor: '#8B7FB8',
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
        // fontWeight: 'bold',
        color: '#FFFFFF',
    },
});

export default RewardStutas;