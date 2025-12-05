import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity } from "react-native";
import { useState } from 'react';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GradientScreen from "../../common/GradientScreen";
const { height, width } = Dimensions.get('window');

const ListItem = () => {
    return (
        <View style={styles.listDataItemStyle}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../../assets/person.png')}
                    style={styles.personIconStyle}
                />
            </View>
            <View style={{ marginStart: 16 }}>
                <Text style={styles.nameTextStyle}>John Doe</Text>
                <Text style={styles.emailTextStyle}>@johndoe</Text>
            </View>
        </View>
    )
}

const FriendsSearch = () => {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('People');

    const handleSelectedFilter = (filter) => {
        if (selectedFilter !== filter) {
            setSelectedFilter(filter);
        }
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
            </View>
            <View style={styles.serachBarRowStyle}>
                <View
                    style={styles.searchContainerStyle}
                >
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
                <Text style={styles.cancelTextStyle}>Cancel</Text>
            </View>
            <View style={styles.filterRowStyle}>
                <TouchableOpacity onPress={() => handleSelectedFilter('People')} activeOpacity={0.8}>
                    <Text style={selectedFilter === 'People' ? styles.selectedFilterText : styles.unselectedFilterText}>
                        People
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSelectedFilter('College')} activeOpacity={0.8}>
                    <Text style={selectedFilter === 'College' ? styles.selectedFilterText : styles.unselectedFilterText}>
                        College
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSelectedFilter('University')} activeOpacity={0.8}>
                    <Text style={selectedFilter === 'University' ? styles.selectedFilterText : styles.unselectedFilterText}>
                        University
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={[...Array(5)]}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ index }) => (
                    <ListItem />
                )}
            />
        </View>
        </GradientScreen>
    )
}

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
        textAlign: 'center'
    },
    topBarStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width:'60%'
    },
    searchIconStyle: {
        width: 23,
        height: 23,
    },
    serachBarRowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
    },
    searchContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 40,
        height: 50,
        width: '70%',
        paddingHorizontal: 16
    },
    serachTextInputStyle: {
        flex: 1,
        fontSize: 20,
        fontWeight: '600',
        color: '#6955A5',
        marginStart: 10
    },
    cancelTextStyle: {
        fontWeight: '400',
        fontSize: 18,
        color: 'white',
        marginLeft:15
    },
    //Filter People Row
    filterRowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20
    },
    selectedFilterText: {
        fontWeight: '900',
        fontSize: 18,
        color: 'white'
    },
    unselectedFilterText: {
        fontWeight: '300',
        fontSize: 18,
        color: 'white'
    },
    // List Data item Style
    personIconStyle: {
        width: 45,
        height: 45,
    },
    listDataItemStyle: {
        height: 60,
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
        justifyContent: 'center'
    },
    nameTextStyle: {
        fontWeight: '800',
        fontSize: 18,
        color: 'white'
    },
    emailTextStyle: {
        fontWeight: '400',
        fontSize: 17,
        color: 'white'
    }
});

export default FriendsSearch;