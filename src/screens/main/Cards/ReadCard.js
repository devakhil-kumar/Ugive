import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import AppText from '../../../components/AppText';
import AppTextInput from '../../../components/AppTextInput';

import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import GradientScreen from '../../common/GradientScreen';
import { listCards } from '../../../fetures/getCardListSlice';
import { showMessage } from '../../../fetures/messageSlice'; // adjust path if needed
import { generatePDF } from 'react-native-html-to-pdf';
import RNShare from 'react-native-share';
import QRCode from 'react-native-qrcode-svg';

const { width, height } = Dimensions.get('window');

// ─── The image is now imported directly as base64 to prevent release mode issues ───
import { sendMesgBase64 } from '../../../assets/sendMesgBase64';

// ─────────────────────────────────────────────────────────────
// WEBSITE LINK FOR QR
// ─────────────────────────────────────────────────────────────

const WEBSITE_URL = 'http://ugive.com.au/';

// ─────────────────────────────────────────────────────────────
// PDF CARD TEMPLATE
// ─────────────────────────────────────────────────────────────

const buildCardHTML = (card, envelopeImage, index, total) => {
  const qrUrl =
    'https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=' +
    encodeURIComponent(WEBSITE_URL) +
    '&color=000000&bgcolor=ffffff&margin=4';

  return (
    '<div style="' +
    'background:white;' +
    'position:relative;' +
    'padding:0 0 28px 0;' +
    'margin-bottom:20px;' +
    'page-break-after:' +
    (index < total - 1 ? 'always' : 'avoid') +
    ';' +
    'page-break-inside:avoid;' +
    '-webkit-print-color-adjust:exact;' +
    'print-color-adjust:exact;' +
    '">' +
    // TOP ROW: envelope + logo
    '<div style="display:flex;align-items:center;padding:16px 28px 0 16px;margin-bottom:4px;">' +
    '<img src="' +
    envelopeImage +
    '" width="100" height="100" style="display:block;object-fit:contain;flex-shrink:0;" />' +
    '<div style="flex:1;text-align:center;padding-right:100px;">' +
    '<span style="font-size:52px;font-weight:900;color:#F5A623;letter-spacing:-1px;font-family:Arial,sans-serif;">UGive</span>' +
    '</div>' +
    '</div>' +
    // DIVIDER
    '<div style="height:2px;background:#F0F0F0;margin:12px 28px 24px 28px;"></div>' +
    // MESSAGE
    '<div style="font-size:20px;line-height:36px;color:#333333;padding:0 28px;margin-bottom:36px;">' +
    '<strong>Dear ' +
    (card.recipient_name || 'Friend') +
    ',</strong>' +
    '<br/><br/>' +
    (card.message || 'No message provided.') +
    '</div>' +
    // QR SECTION
    '<div style="display:flex;align-items:center;justify-content:flex-end;gap:16px;padding:20px 28px 0 28px;border-top:2px solid #F0F0F0;">' +
    '<span style="color:#F5A623;font-weight:700;font-size:15px;text-align:right;line-height:24px;font-family:Arial,sans-serif;">Scan the QR code to<br/>send your own message!</span>' +
    '<img src="' +
    qrUrl +
    '" width="110" height="110" style="border:3px solid #E0E0E0;border-radius:4px;display:block;" />' +
    '</div>' +
    '</div>'
  );
};

const buildFullHTML = pages => {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<style>
  * { margin:0; padding:0; box-sizing:border-box; -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; color-adjust:exact !important; }
  html, body { background:#6D56A5 !important; -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; color-adjust:exact !important; font-family:Arial,sans-serif; padding:32px 28px; }
  @page { size:A4 portrait; margin:0; }
</style>
</head>
<body>${pages.join('')}</body>
</html>`;
};

const ReadCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { cards = [], loading, error } = useSelector(state => state.listCards);

  const [showContent, setShowContent] = useState(true);

  // SELECTED IDS
  const [selectedIds, setSelectedIds] = useState(new Set());

  // EXPORT LOADING
  const [exportLoading, setExportLoading] = useState(false);

  useEffect(() => {
    dispatch(listCards());
  }, [dispatch]);

  // ─────────────────────────────────────────────────────────────
  // SELECT / UNSELECT CARD
  // ─────────────────────────────────────────────────────────────

  const toggleSelect = id => {
    setSelectedIds(prev => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  // ─────────────────────────────────────────────────────────────
  // SELECT ALL
  // ─────────────────────────────────────────────────────────────

  const selectAll = () => {
    const ids = cards.cards.map(item => item._id);
    setSelectedIds(new Set(ids));
  };

  // ─────────────────────────────────────────────────────────────
  // CLEAR ALL
  // ─────────────────────────────────────────────────────────────

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  // ─────────────────────────────────────────────────────────────
  // EXPORT PDF
  // ─────────────────────────────────────────────────────────────

  const handleExportPDF = async () => {
    try {
      if (selectedIds.size === 0) {
        dispatch(
          showMessage({
            type: 'error',
            text: 'Please select at least one card',
          }),
        );
        return;
      }

      setExportLoading(true);

      // FILTER SELECTED CARDS
      const selectedCards = cards.cards.filter(item =>
        selectedIds.has(item._id),
      );

      // USE PRE-LOADED BASE64 ENVELOPE IMAGE
      const envelopeBase64 = sendMesgBase64;

      // BUILD PDF PAGES — pass envelopeBase64 to each card
      const pages = selectedCards.map((card, index) =>
        buildCardHTML(card, envelopeBase64, index, selectedCards.length),
      );

      // FULL HTML
      const html = buildFullHTML(pages);

      // GENERATE PDF
      // NOTE: Do NOT pass directory on Android — causes filePath to be null
      const file = await generatePDF({
        html,
        fileName: `UGive_Cards_${Date.now()}`,
        ...(Platform.OS === 'ios' && { directory: 'Documents' }),
      });

      console.log('PDF result:', JSON.stringify(file));

      // NULL CHECK — if filePath is null, generation failed
      if (!file || !file.filePath) {
        dispatch(
          showMessage({
            type: 'error',
            text: 'PDF generation failed. Please try again.',
          }),
        );
        return;
      }

      // ─── SHARE PDF FILE ───
      await RNShare.open({
        title: 'UGive Cards PDF',
        url: `file://${file.filePath}`,
        type: 'application/pdf',
        subject: 'UGive Cards PDF',
        failOnCancel: false,
      });

      dispatch(
        showMessage({ type: 'success', text: 'PDF exported successfully!' }),
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showMessage({
          type: 'error',
          text: 'Failed to export PDF. Please try again.',
        }),
      );
    } finally {
      setExportLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // CARD ITEM
  // ─────────────────────────────────────────────────────────────

  const renderCardItem = ({ item }) => {
    const selected = selectedIds.has(item._id);

    return (
      <TouchableOpacity
        style={[styles.cardItem, selected && styles.selectedCard]}
        activeOpacity={0.8}
        onPress={() => toggleSelect(item._id)}
      >
        {/* CHECKBOX */}
        <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
          {selected && <AppText style={styles.checkmark}>✓</AppText>}
        </View>

        {/* CARD INFO */}
        <View style={{ flex: 1 }}>
          <AppText style={styles.senderName}>{item.sender_name}</AppText>

          <AppText style={styles.receiverText}>To: {item.recipient_name}</AppText>

          <AppText style={styles.messageText}>{item.message}</AppText>

          <AppText style={styles.dateTextCard}>{item.date}</AppText>
        </View>
      </TouchableOpacity>
    );
  };

  const cardList = cards.cards ?? [];

  const allSelected =
    cardList.length > 0 && selectedIds.size === cardList.length;

  return (
    <GradientScreen colors={['#EAB344']}>
      <View style={styles.container}>
        {/* BACK BUTTON */}
        <TouchableOpacity
          style={styles.backImagePosition}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require('../../../assets/backIcon.png')}
            style={styles.backIconStyle}
          />
        </TouchableOpacity>

        {/* MAIN CARD */}
        <View style={styles.mainCard}>
          {/* TITLE */}
          <View style={styles.headerRow}>
            <AppText style={styles.title}>Read Cards</AppText>
            {selectedIds.size > 0 && (
              <TouchableOpacity
                style={styles.exportBtn}
                onPress={handleExportPDF}
              >
                {exportLoading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <AppText style={styles.exportText}>
                    Export PDF ({selectedIds.size})
                  </AppText>
                )}
              </TouchableOpacity>
            )}
          </View>

          {/* SELECT ALL */}
          {cardList.length > 0 && (
            <View style={styles.selectRow}>
              <TouchableOpacity
                onPress={allSelected ? clearSelection : selectAll}
              >
                <AppText style={styles.selectAll}>
                  {allSelected ? 'Deselect All' : 'Select All'}
                </AppText>
              </TouchableOpacity>

              <AppText style={styles.selectedCount}>
                {selectedIds.size} Selected
              </AppText>
            </View>
          )}

          {/* LIST */}
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#6D56A5"
              style={{ marginTop: 40 }}
            />
          ) : error ? (
            <AppText style={styles.errorText}>Failed to load cards</AppText>
          ) : cards.count === 0 ? (
            <View style={{ height: 200, justifyContent: 'center' }}>
              <AppText style={styles.emtyText}>No Card Send Yet</AppText>
            </View>
          ) : (
            <FlatList
              data={cardList}
              keyExtractor={item => item._id}
              renderItem={renderCardItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 30,
              }}
            />
          )}
        </View>
      </View>
    </GradientScreen>
  );
};

export default ReadCard;

// ─────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    justifyContent: 'center',
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

  backBtn: {
    marginBottom: 20,
  },

  backText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  mainCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    height: height * 0.75,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#222',
  },

  exportBtn: {
    backgroundColor: '#6D56A5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },

  exportText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },

  selectRow: {
    marginTop: 14,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  selectAll: {
    color: '#6D56A5',
    fontWeight: '700',
  },

  selectedCount: {
    color: '#999',
    fontSize: 12,
  },

  cardItem: {
    backgroundColor: '#F8F8F8',
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1.5,
    borderColor: '#E4E4E4',
  },

  selectedCard: {
    borderColor: '#6D56A5',
    backgroundColor: '#F2EDFF',
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  checkboxSelected: {
    backgroundColor: '#6D56A5',
    borderColor: '#6D56A5',
  },

  checkmark: {
    color: '#fff',
    fontWeight: '900',
  },

  senderName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#222',
  },

  receiverText: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },

  messageText: {
    marginTop: 6,
    color: '#6D56A5',
    lineHeight: 18,
    fontSize: 12,
  },

  dateTextCard: {
    marginTop: 6,
    color: '#999',
    fontSize: 11,
  },

  errorText: {
    textAlign: 'center',
    marginTop: 40,
    color: 'red',
  },
  emtyText: {
    textAlign: 'center',
    // marginTop: 40,
    color: '#000',
  },
});
