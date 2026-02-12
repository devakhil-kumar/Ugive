import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';

const IOSRewardDropdown = ({ data, selectedValue, onSelect }) => {
  const [visible, setVisible] = useState(false);

  const selectedLabel =
    data.find(i => i.rewardId === selectedValue)?.rewardName || 'Select Reward';

  return (
    <>
    
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.dropdownText}>{selectedLabel}</Text>
      </TouchableOpacity>


      <Modal visible={visible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modal}>
            <FlatList
              data={data}
              keyExtractor={item => String(item.rewardId)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  disabled={item.isDisabled}
                  style={[
                    styles.item,
                    item.isDisabled && { opacity: 0.4 }
                  ]}
                  onPress={() => {
                    onSelect(item.rewardId);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.itemText}>
                    {item.rewardName}
                    {!item.unlocked && ' (Locked)'}
                    {item.unlocked && !item.claimed && ' (Not Claimed)'}
                    {item.sent && ' (Sent)'}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#FAFAFA',
    marginTop: 5,
    marginBottom: 10,
  },
  dropdownText: {
    color: '#333',
    fontSize: 14,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#fff',
    maxHeight: '50%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 10,
  },
  item: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    height:50
  },
  itemText: {
    fontSize: 15,
    color: '#000',
  },
});

export default IOSRewardDropdown;
