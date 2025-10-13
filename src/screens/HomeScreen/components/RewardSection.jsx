
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { wp, hp, moderateScale, isTablet } from '../../../utils/responsive';

const CircularProgress = ({ percentage, size = 120, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circleCircumference = 2 * Math.PI * radius;
  const strokeDashoffset = circleCircumference - (circleCircumference * percentage) / 100;
  
  return (
    <Svg width={size} height={size}>
      <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5B865"
          strokeWidth={strokeWidth}
          fill="none"
          opacity={0.3}
        />
        {/* Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5B865"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circleCircumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
        {/* Inner Circle */}
        {/* <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius - strokeWidth}
          stroke="#E5B865"
          strokeWidth={strokeWidth / 2}
          fill="none"
          opacity={0.3}
        /> */}
        {/* Inner Progress Circle */}
        {/* <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius - strokeWidth}
          stroke="#E5B865"
          strokeWidth={strokeWidth / 2}
          fill="none"
          strokeDasharray={circleCircumference - strokeWidth * 2}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        /> */}
      </G>
    </Svg>
  );
};

const RewardSection = ({ onPress, cardsRemaining = 5, progressPercentage = 0 }) => {
  const circleSize = isTablet ? moderateScale(140) : moderateScale(120);
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            You're close to{'\n'}a reward!
          </Text>
          
          <Text style={styles.subtitle}>
            Send <Text style={styles.number}>{cardsRemaining} more</Text>{' '}
            <Text style={styles.action}>cards</Text> to{'\n'}
            <Text style={styles.receive}>receive</Text> a free{' '}
            <Text style={styles.item}>coffee.</Text>
          </Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={onPress}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Let's go!</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.progressContainer}>
          <CircularProgress 
            percentage={progressPercentage} 
            size={circleSize}
            strokeWidth={moderateScale(8)}
          />
          <View style={styles.percentageContainer}>
            <Text style={styles.progressText}>{progressPercentage}%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    borderTopStartRadius: moderateScale(24),
    borderTopEndRadius: moderateScale(24),
    padding: isTablet ? moderateScale(32) : moderateScale(28),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: wp(4),
  },
  title: {
    fontSize: isTablet ? moderateScale(28) : moderateScale(24),
    fontWeight: '700',
    color: '#E5B865',
    lineHeight: isTablet ? moderateScale(38) : moderateScale(32),
    marginBottom: hp(1.5),
  },
  subtitle: {
    fontSize: isTablet ? moderateScale(17) : moderateScale(15),
    fontWeight: '400',
    lineHeight: isTablet ? moderateScale(28) : moderateScale(24),
    marginBottom: hp(2.5),
    color: '#333333',
  },
  number: {
    fontWeight: '700',
    color: '#E5B865',
  },
  action: {
    fontWeight: '600',
    color: '#E5B865',
  },
  receive: {
    fontWeight: '400',
    color: '#B8D4E8',
  },
  item: {
    fontWeight: '600',
    color: '#B8D4E8',
  },
  button: {
    backgroundColor: '#E5B865',
    borderRadius: moderateScale(30),
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(8),
    alignSelf: 'flex-start',
    shadowColor: '#E5B865',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  progressContainer: {
    marginLeft: wp(2),
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: isTablet ? moderateScale(48) : moderateScale(40),
    fontWeight: '700',
    color: '#E5B865',
  },
});

export default RewardSection;





// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { wp, hp, moderateScale, isTablet } from '../../../utils/responsive';

// const RewardSection = ({ onPress, cardsRemaining = 5, progressPercentage = 0 }) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.content}>
//         <View style={styles.textContainer}>
//           <Text style={styles.title}>
//             You're close to{'\n'}a reward!
//           </Text>
          
//           <Text style={styles.subtitle}>
//             Send <Text style={styles.number}>{cardsRemaining} more</Text>{' '}
//             <Text style={styles.action}>cards</Text> to{'\n'}
//             <Text style={styles.receive}>receive</Text> a free{' '}
//             <Text style={styles.item}>coffee.</Text>
//           </Text>
          
//           <TouchableOpacity
//             style={styles.button}
//             onPress={onPress}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.buttonText}>Let's go!</Text>
//           </TouchableOpacity>
//         </View>
        
//         <View style={styles.progressContainer}>
//           <View style={styles.progressCircle}>
//             <View style={styles.progressRing} />
//             <Text style={styles.progressText}>{progressPercentage}%</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#F5F5F5',
//     // marginHorizontal: wp(6),
//     borderTopStartRadius: moderateScale(24),
//     borderTopEndRadius: moderateScale(24),
//     padding: isTablet ? moderateScale(32) : moderateScale(28),
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.1,
//     shadowRadiusx: 12,
//     elevation: 6,
//   },
//   content: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   textContainer: {
//     flex: 1,
//     paddingRight: wp(4),
//   },
//   title: {
//     fontSize: isTablet ? moderateScale(28) : moderateScale(24),
//     fontWeight: '700',
//     color: '#E5B865',
//     lineHeight: isTablet ? moderateScale(38) : moderateScale(32),
//     marginBottom: hp(1.5),
//   },
//   subtitle: {
//     fontSize: isTablet ? moderateScale(17) : moderateScale(15),
//     fontWeight: '400',
//     lineHeight: isTablet ? moderateScale(28) : moderateScale(24),
//     marginBottom: hp(2.5),
//     color: '#333333',
//   },
//   number: {
//     fontWeight: '700',
//     color: '#E5B865',
//   },
//   action: {
//     fontWeight: '600',
//     color: '#E5B865',
//   },
//   receive: {
//     fontWeight: '400',
//     color: '#B8D4E8',
//   },
//   item: {
//     fontWeight: '600',
//     color: '#B8D4E8',
//   },
//   button: {
//     backgroundColor: '#E5B865',
//     borderRadius: moderateScale(30),
//     paddingVertical: hp(1.8),
//     paddingHorizontal: wp(8),
//     alignSelf: 'flex-start',
//     shadowColor: '#E5B865',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   buttonText: {
//     fontSize: moderateScale(16),
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   progressContainer: {
//     marginLeft: wp(2),
//   },
//   progressCircle: {
//     width: isTablet ? moderateScale(140) : moderateScale(120),
//     height: isTablet ? moderateScale(140) : moderateScale(120),
//     borderRadius: isTablet ? moderateScale(70) : moderateScale(60),
//     borderWidth: moderateScale(8),
//     borderColor: '#E5B865',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   progressRing: {
//     position: 'absolute',
//     width: isTablet ? moderateScale(124) : moderateScale(104),
//     height: isTablet ? moderateScale(124) : moderateScale(104),
//     borderRadius: isTablet ? moderateScale(62) : moderateScale(52),
//     borderWidth: moderateScale(4),
//     borderColor: '#E5B865',
//   },
//   progressText: {
//     fontSize: isTablet ? moderateScale(48) : moderateScale(40),
//     fontWeight: '700',
//     color: '#E5B865',
//   },
// });

// export default RewardSection;






// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { wp, hp, moderateScale, isTablet } from '../../../utils/responsive';

// const RewardSection = ({ onPress, cardsRemaining = 5, progressPercentage = 0 }) => {
//   const circleSize = isTablet ? moderateScale(140) : moderateScale(120);
//   const strokeWidth = moderateScale(10);

//   // Create segments for the circular progress
//   const renderProgressSegments = () => {
//     const segments = [];
//     const totalSegments = 12; // 12 segments for smoother appearance
//     const segmentAngle = 360 / totalSegments;
//     const filledSegments = Math.floor((progressPercentage / 100) * totalSegments);

//     for (let i = 0; i < totalSegments; i++) {
//       const rotation = i * segmentAngle;
//       const isFilled = i < filledSegments;

//       segments.push(
//         <View
//           key={i}
//           style={[
//             styles.segment,
//             {
//               width: circleSize,
//               height: circleSize,
//               transform: [{ rotate: `${rotation}deg` }],
//             },
//           ]}
//         >
//           <View
//             style={[
//               styles.segmentBar,
//               {
//                 width: strokeWidth,
//                 height: circleSize / 2.5,
//                 backgroundColor: isFilled ? '#E5B865' : '#E0E0E0',
//               },
//             ]}
//           />
//         </View>
//       );
//     }

//     return segments;
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.content}>
//         <View style={styles.textContainer}>
//           <Text style={styles.title}>
//             You're close to{'\n'}a reward!
//           </Text>

//           <Text style={styles.subtitle}>
//             Send <Text style={styles.number}>{cardsRemaining} more</Text>{' '}
//             <Text style={styles.action}>cards</Text> to{'\n'}
//             <Text style={styles.receive}>receive</Text> a free{' '}
//             <Text style={styles.item}>coffee.</Text>
//           </Text>

//           <TouchableOpacity
//             style={styles.button}
//             onPress={onPress}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.buttonText}>Let's go!</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.progressContainer}>
//           <View style={[styles.progressCircle, { width: circleSize, height: circleSize }]}>
//             {/* Background Circle */}
//             <View
//               style={[
//                 styles.circleBackground,
//                 {
//                   width: circleSize,
//                   height: circleSize,
//                   borderRadius: circleSize / 2,
//                   borderWidth: strokeWidth,
//                 },
//               ]}
//             />

//             {/* Progress Circle Ring */}
//             <View
//               style={[
//                 styles.circleProgress,
//                 {
//                   width: circleSize,
//                   height: circleSize,
//                   borderRadius: circleSize / 2,
//                   borderWidth: strokeWidth,
//                   borderColor: 'transparent',
//                   borderTopColor: progressPercentage > 0 ? '#E5B865' : 'transparent',
//                   borderRightColor: progressPercentage > 25 ? '#E5B865' : 'transparent',
//                   borderBottomColor: progressPercentage > 50 ? '#E5B865' : 'transparent',
//                   borderLeftColor: progressPercentage > 75 ? '#E5B865' : 'transparent',
//                   transform: [{ rotate: '-90deg' }],
//                 },
//               ]}
//             />

//             <Text style={styles.progressText}>{progressPercentage}%</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#F5F5F5',
//     borderTopStartRadius: moderateScale(24),
//     borderTopEndRadius: moderateScale(24),
//     padding: isTablet ? moderateScale(32) : moderateScale(28),
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 12,
//     elevation: 6,
//   },
//   content: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   textContainer: {
//     flex: 1,
//     paddingRight: wp(4),
//   },
//   title: {
//     fontSize: isTablet ? moderateScale(28) : moderateScale(24),
//     fontWeight: '700',
//     color: '#E5B865',
//     lineHeight: isTablet ? moderateScale(38) : moderateScale(32),
//     marginBottom: hp(1.5),
//   },
//   subtitle: {
//     fontSize: isTablet ? moderateScale(17) : moderateScale(15),
//     fontWeight: '400',
//     lineHeight: isTablet ? moderateScale(28) : moderateScale(24),
//     marginBottom: hp(2.5),
//     color: '#333333',
//   },
//   number: {
//     fontWeight: '700',
//     color: '#E5B865',
//   },
//   action: {
//     fontWeight: '600',
//     color: '#E5B865',
//   },
//   receive: {
//     fontWeight: '400',
//     color: '#B8D4E8',
//   },
//   item: {
//     fontWeight: '600',
//     color: '#B8D4E8',
//   },
//   button: {
//     backgroundColor: '#E5B865',
//     borderRadius: moderateScale(30),
//     paddingVertical: hp(1.8),
//     paddingHorizontal: wp(8),
//     alignSelf: 'flex-start',
//     shadowColor: '#E5B865',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   buttonText: {
//     fontSize: moderateScale(16),
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   progressContainer: {
//     marginLeft: wp(2),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   progressCircle: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   circleBackground: {
//     position: 'absolute',
//     borderColor: '#E0E0E0',
//   },
//   circleProgress: {
//     position: 'absolute',
//   },
//   segment: {
//     position: 'absolute',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//   },
//   segmentBar: {
//     borderRadius: moderateScale(5),
//   },
//   progressText: {
//     fontSize: isTablet ? moderateScale(40) : moderateScale(34),
//     fontWeight: '700',
//     color: '#E5B865',
//     zIndex: 10,
//   },
// });

// export default RewardSection;
