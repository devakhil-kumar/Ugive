import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const CustomModal = ({
    visible,
    onClose,
    title,
    buttonLabel,
    children,
    showClose = true,
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>

                    {/* Title */}
                    {title && <Text style={styles.title}>{title}</Text>}

                    {/* Content */}
                    <View style={{ marginVertical: 10, width: width * 0.5, alignSelf: 'center' }}>
                        {children}
                    </View>

                    {/* Close Button */}
                    {showClose && (
                        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                            <Text style={styles.closeText}>{buttonLabel}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: '900',
        marginBottom: 10,
        lineHeight:21,
        letterSpacing:0,
        color: '#000',
        alignSelf: 'center'
    },
    closeBtn: {
        height: 40,
        backgroundColor:'#E9B243',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        borderWidth:1,
        borderColor:'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 4,
        marginTop: 10
    },
    closeText: {
        color: 'white',
        fontWeight: '800',
        fontSize:14,
        lineHeight:14,
        letterSpacing:0.2,
    }
});

export default CustomModal;
