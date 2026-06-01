import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  UIManager,
  findNodeHandle,
} from 'react-native';
import AppText from '../../../components/AppText';
import AppTextInput from '../../../components/AppTextInput';
import Icon from '@react-native-vector-icons/ionicons';

const AppDropdown = ({
  data = [],
  value,
  onChange,
  labelField = 'label',
  valueField = 'value',
  placeholder = 'Select an option',
  searchPlaceholder = 'Search...',
  search = false,
  disable = false,
  style,
  placeholderStyle,
  selectedTextStyle,
  itemTextStyle,
  maxHeight = 200,
}) => {
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [dropdownLayout, setDropdownLayout] = useState(null);
  const anchorRef = useRef(null);

  const selectedItem = data.find(item => item[valueField] === value);

  const filteredData =
    search && searchText
      ? data.filter(item =>
          item[labelField]?.toLowerCase().includes(searchText.toLowerCase()),
        )
      : data;

  const openDropdown = () => {
    if (disable) return;
    anchorRef.current?.measureInWindow((x, y, width, height) => {
      setDropdownLayout({ x, y, width, height });
      setVisible(true);
    });
  };

  const closeDropdown = () => {
    setVisible(false);
    setSearchText('');
  };

  const handleSelect = item => {
    onChange(item);
    closeDropdown();
  };

  return (
    <View>
      {/* Selected Box */}
      <TouchableOpacity
        ref={anchorRef}
        style={[styles.selector, disable && styles.disabled, style]}
        onPress={openDropdown}
        activeOpacity={disable ? 1 : 0.7}
      >
        {selectedItem ? (
          <AppText
            style={[styles.selectedText, selectedTextStyle]}
            numberOfLines={1}
          >
            {selectedItem[labelField]}
          </AppText>
        ) : (
          <AppText
            style={[styles.placeholder, placeholderStyle]}
            numberOfLines={1}
          >
            {placeholder}
          </AppText>
        )}
        <Icon
          name={visible ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={disable ? '#BDBDBD' : '#333'}
        />
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal
        visible={visible}
        transparent
        animationType="none"
        onRequestClose={closeDropdown}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeDropdown}
        />
        {dropdownLayout && (
          <View
            style={[
              styles.dropdownBox,
              {
                top: dropdownLayout.y + dropdownLayout.height + 4,
                left: dropdownLayout.x,
                width: dropdownLayout.width,
                maxHeight,
              },
            ]}
          >
            {/* Search Input */}
            {search && (
              <View style={styles.searchContainer}>
                <AppTextInput
                  style={styles.searchInput}
                  placeholder={searchPlaceholder}
                  placeholderTextColor="#BDBDBD"
                  value={searchText}
                  onChangeText={setSearchText}
                  autoCorrect={false}
                />
              </View>
            )}

            {/* Items List */}
            <FlatList
              data={filteredData}
              keyExtractor={item => String(item[valueField])}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => {
                const isSelected = item[valueField] === value;
                return (
                  <TouchableOpacity
                    style={[styles.item, isSelected && styles.selectedItem]}
                    onPress={() => handleSelect(item)}
                    activeOpacity={0.7}
                  >
                    <AppText
                      style={[
                        styles.itemText,
                        itemTextStyle,
                        isSelected && styles.selectedItemText,
                      ]}
                    >
                      {item[labelField]}
                    </AppText>
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <AppText style={styles.emptyText}>No results found</AppText>
                </View>
              }
            />
          </View>
        )}
      </Modal>
    </View>
  );
};

export default AppDropdown;

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 43,
    backgroundColor: '#FAFAFA',
    marginTop: 10,
  },
  disabled: {
    backgroundColor: '#F5F5F5',
  },
  selectedText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  placeholder: {
    fontSize: 14,
    color: '#BDBDBD',
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  dropdownBox: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  searchContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  searchInput: {
    fontSize: 14,
    color: '#333',
    height: 36,
    paddingHorizontal: 8,
  },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 11,
    backgroundColor: '#fff',
  },
  selectedItem: {
    backgroundColor: '#F5F0E8',
  },
  itemText: {
    fontSize: 14,
    color: '#333',
  },
  selectedItemText: {
    color: '#E9B243',
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#BDBDBD',
  },
});
