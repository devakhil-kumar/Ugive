// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { wp, hp, moderateScale, isTablet } from '../../../utils/responsive';

// const SendCardSection = ({ onStartWriting }) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.content}>
//         <View style={styles.textContainer}>
//           <Text style={styles.title}>
//             Send a card{'\n'}to a friend{'\n'}on campus!
//           </Text>
          
//           <TouchableOpacity
//             style={styles.button}
//             onPress={onStartWriting}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.buttonText}>Start Writing</Text>
//           </TouchableOpacity>
//         </View>
        
//         <View style={styles.illustrationContainer}>
//           <View style={styles.illustrationBox}>
//             <View style={styles.cardIllustration}>
//               <View style={styles.blueSection} />
//               <View style={styles.yellowCircle} />
//               <View style={styles.purpleTriangle} />
//               <View style={styles.heartIcon} />
//               <View style={styles.orangeShape} />
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: wp(6),
//     borderRadius: moderateScale(24),
//     padding: isTablet ? moderateScale(32) : moderateScale(28),
//     marginBottom: hp(2),
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.15,
//     shadowRadius: 12,
//     elevation: 8,
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
//     fontSize: isTablet ? moderateScale(26) : moderateScale(22),
//     fontWeight: '600',
//     color: '#6B5B95',
//     lineHeight: isTablet ? moderateScale(38) : moderateScale(32),
//     marginBottom: hp(2.5),
//   },
//   button: {
//     backgroundColor: '#9B8AC4',
//     borderRadius: moderateScale(30),
//     paddingVertical: hp(1.8),
//     paddingHorizontal: wp(8),
//     alignSelf: 'flex-start',
//     shadowColor: '#9B8AC4',
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
//   illustrationContainer: {
//     marginLeft: wp(2),
//   },
//   illustrationBox: {
//     width: isTablet ? moderateScale(140) : moderateScale(120),
//     height: isTablet ? moderateScale(140) : moderateScale(120),
//     borderRadius: moderateScale(12),
//     borderWidth: 4,
//     borderColor: '#4A9FD8',
//     backgroundColor: '#E8F4F8',
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   cardIllustration: {
//     flex: 1,
//     position: 'relative',
//   },
//   blueSection: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: '50%',
//     backgroundColor: '#5B7FA8',
//   },
//   yellowCircle: {
//     position: 'absolute',
//     top: moderateScale(10),
//     right: moderateScale(10),
//     width: moderateScale(30),
//     height: moderateScale(30),
//     borderRadius: moderateScale(15),
//     backgroundColor: '#F5A623',
//   },
//   purpleTriangle: {
//     position: 'absolute',
//     top: moderateScale(30),
//     left: moderateScale(15),
//     width: 0,
//     height: 0,
//     borderLeftWidth: moderateScale(20),
//     borderRightWidth: moderateScale(20),
//     borderBottomWidth: moderateScale(35),
//     borderStyle: 'solid',
//     backgroundColor: 'transparent',
//     borderLeftColor: 'transparent',
//     borderRightColor: 'transparent',
//     borderBottomColor: '#6B5B95',
//   },
//   heartIcon: {
//     position: 'absolute',
//     bottom: '55%',
//     right: '35%',
//     width: moderateScale(24),
//     height: moderateScale(24),
//     backgroundColor: '#5B7FA8',
//     borderRadius: moderateScale(12),
//   },
//   orangeShape: {
//     position: 'absolute',
//     bottom: moderateScale(10),
//     right: moderateScale(10),
//     width: moderateScale(35),
//     height: moderateScale(35),
//     backgroundColor: '#F5A623',
//     borderTopLeftRadius: moderateScale(20),
//     borderTopRightRadius: moderateScale(20),
//     borderBottomRightRadius: moderateScale(20),
//   },
// });

// export default SendCardSection;




import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { wp, hp, moderateScale, isTablet } from '../../../utils/responsive';

const SendCardSection = ({ onStartWriting }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={3}>
            Send a card{'\n'}to a friend{'\n'}on campus!
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={onStartWriting}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText} numberOfLines={1} adjustsFontSizeToFit>
              Start Writing
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationBox}>
            <View style={styles.cardIllustration}>
              <View style={styles.blueSection} />
              <View style={styles.yellowCircle} />
              <View style={styles.purpleTriangle} />
              <View style={styles.heartIcon} />
              <View style={styles.orangeShape} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: wp(5),
    borderRadius: moderateScale(24),
    padding: isTablet ? moderateScale(28) : moderateScale(20),
    marginBottom: hp(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: wp(3),
  },
  title: {
    fontSize: isTablet ? moderateScale(24) : moderateScale(20),
    fontWeight: '700',
    color: '#6B5B95',
    lineHeight: isTablet ? moderateScale(34) : moderateScale(28),
    marginBottom: hp(2),
    letterSpacing: 0.3,
  },
  button: {
    backgroundColor: '#9B8AC4',
    borderRadius: moderateScale(25),
    paddingVertical: hp(1.6),
    paddingHorizontal: wp(7),
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: wp(32),
    shadowColor: '#9B8AC4',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    fontSize: isTablet ? moderateScale(15) : moderateScale(14),
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  illustrationContainer: {
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationBox: {
    width: isTablet ? moderateScale(130) : moderateScale(110),
    height: isTablet ? moderateScale(130) : moderateScale(110),
    borderRadius: moderateScale(16),
    borderWidth: 3,
    borderColor: '#4A9FD8',
    backgroundColor: '#E8F4F8',
    overflow: 'hidden',
  },
  cardIllustration: {
    flex: 1,
  },
  blueSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#5B7FA8',
  },
  yellowCircle: {
    position: 'absolute',
    top: moderateScale(12),
    right: moderateScale(12),
    width: moderateScale(26),
    height: moderateScale(26),
    borderRadius: moderateScale(13),
    backgroundColor: '#F5A623',
  },
  purpleTriangle: {
    position: 'absolute',
    top: moderateScale(28),
    left: moderateScale(12),
    width: 0,
    height: 0,
    borderLeftWidth: moderateScale(18),
    borderRightWidth: moderateScale(18),
    borderBottomWidth: moderateScale(32),
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#6B5B95',
  },
  heartIcon: {
    position: 'absolute',
    bottom: '58%',
    right: '38%',
    width: moderateScale(20),
    height: moderateScale(20),
    backgroundColor: '#FF6B9D',
    borderRadius: moderateScale(10),
  },
  orangeShape: {
    position: 'absolute',
    bottom: moderateScale(12),
    right: moderateScale(12),
    width: moderateScale(30),
    height: moderateScale(30),
    backgroundColor: '#F5A623',
    borderTopLeftRadius: moderateScale(18),
    borderTopRightRadius: moderateScale(18),
    borderBottomRightRadius: moderateScale(18),
  },
});

export default SendCardSection;
