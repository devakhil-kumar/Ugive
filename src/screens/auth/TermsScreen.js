import Feather from '@react-native-vector-icons/feather';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TERMS_DATA = [
  {
    id: '1',
    title: '1. Purpose of the App',
    content: 'UGive is a platform designed to enable positive communication, expressions of appreciation, and generosity through the sharing and delivery of physical and/or digital cards, messages and gifts.',
  },
  {
    id: '2',
    title: '2. User Eligibility',
    content: 'By using the App, you confirm that:\n• You are at least 16 years of age (or older if required by local law), and\n• You have the capacity to enter into this agreement.',
  },
  {
    id: '3',
    title: '3. Use of Contact Details',
    content: 'By using UGive, you consent to the collection and use of your contact information (including name, email address, phone number and/or delivery details) for the purposes of:\n\n• Facilitating the delivery of cards and communications between users.\n• Contacting you in relation to activity within the App (including delivery coordination and service updates).\n• Providing support or resolving issues relating to your use of the App.\n\nYour contact details will not be sold or shared with third parties for marketing purposes unrelated to the operation of UGive. We take reasonable steps to protect your personal information in accordance with applicable privacy laws.',
  },
  {
    id: '4',
    title: '4. Acceptable Use',
    content: 'You agree to use UGive in a manner that is respectful, constructive, and lawful. You must not use the App to:\n\n• Post or transmit any abusive, harassing, defamatory, threatening, obscene, or hateful content.\n• Bully, intimidate, or target individuals or groups.\n• Communicate explicit material, profanity, or offensive language.\n• Violate any law or encourage harmful conduct.\n• Misuse the platform to spam or deceive other users.',
  },
  {
    id: '5',
    title: '5. Right to Remove Users',
    content: 'UGive reserves the right to suspend or permanently remove any user from the App, at our sole discretion, without notice, if:\n\n• These Terms are breached.\n• Content or behaviour is deemed harmful, offensive, or inconsistent with the spirit and purpose of the platform.\n• The safety, wellbeing, or dignity of other users is compromised.\n\nAny content associated with removed accounts may also be deleted.',
  },
  {
    id: '6',
    title: '6. Content Responsibility',
    content: 'All content shared within UGive remains the responsibility of the user who creates it. UGive does not endorse or verify messages sent between users and accepts no liability for the content of user communications.',
  },
  {
    id: '7',
    title: '7. App Availability',
    content: 'UGive aims to maintain reliable service but does not guarantee uninterrupted or error-free operation. We may suspend, update or discontinue the App at any time without notice.',
  },
  {
    id: '8',
    title: '8. Limitation of Liability',
    content: 'To the maximum extent permitted by law:\n\n• UGive is not liable for any indirect, incidental or consequential loss arising from your use of the App.\n• UGive does not guarantee delivery timelines or outcomes related to card delivery dependent on user coordination or third-party services.',
  },
  {
    id: '9',
    title: '9. Intellectual Property & Responsible Use',
    content: 'All intellectual property in the UGive App — including our software, branding, designs and content formats — belongs to UGive. Using the App does not give you ownership of any of this — it simply gives you permission to use it as intended.\n\nWe grant you a personal, non-exclusive licence to use the App in line with these Terms. Please don\'t copy, modify, distribute, reverse engineer, scrape data from, or misuse any part of the App or our intellectual property without written permission.\n\nYou are responsible for how you use the App. To the extent allowed by law, UGive isn\'t liable for losses linked to misuse of the platform, and you agree to indemnify UGive against claims arising from breaches of these Terms.',
  },
  {
    id: '10',
    title: '10. Changes to these Terms',
    content: 'We may update these Terms from time to time. Continued use of the App after changes are published constitutes acceptance of the updated Terms.',
  },
  {
    id: '11',
    title: '11. Contact',
    content: 'For questions about these Terms or the operation of the App, please contact:\n\nUGive Support\nhello@ugive.com.au',
  },
];

const TermsScreen = ({ navigation }) => {
  const handleAgree = () => {
    Alert.alert("Success", "You have agreed to the Terms and Conditions.");
  };

  const handleDecline = () => {
     Alert.alert("Notice", "You must accept the terms to use UGive.");
  };

    const handleGoBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    } else {
      console.log('Navigate back');
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
           <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                  {/* <Text style={styles.backButtonText}>←</Text> */}
                  <Feather name='arrow-left' size={20} color={'#000'} />
                </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
        {/* <Text style={styles.headerSubtitle}>UGive</Text> */}
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.introText}>
          Welcome to UGive. By downloading, accessing or using the UGive app ("the App"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use the App. "UGive" for the purpose of these terms and conditions refers to both the app and the host entity, Highlands Church.
        </Text>
        
        <Text style={styles.effectiveDate}>Effective Date: 2 December 2025</Text>

        <View style={styles.divider} />

        {TERMS_DATA.map((item) => (
          <View key={item.id} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            <Text style={styles.sectionContent}>{item.content}</Text>
          </View>
        ))}
        
        <View style={styles.footerSpacing} />
      </ScrollView>

      {/* Sticky Bottom Actions */}
      {/* <View style={styles.footer}>
        <Text style={styles.footerDisclaimer}>
          By clicking "I Agree", you acknowledge that you have read and understood the Terms above.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.declineButton} onPress={handleDecline}>
            <Text style={styles.declineButtonText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.agreeButton} onPress={handleAgree}>
            <Text style={styles.agreeButtonText}>I Agree</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    alignItems: 'center',
    flexDirection:"row",
    justifyContent:'space-between',
    width:'80%'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
    backButton: {
    paddingVertical: 5,
    paddingRight: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000', 
  },
  scrollContent: {
    padding: 20,
  },
  introText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    marginBottom: 10,
  },
  effectiveDate: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  footerSpacing: {
    height: 40,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    padding: 20,
    backgroundColor: '#FFFFFF',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 5,
  },
  footerDisclaimer: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  declineButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  agreeButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#007AFF', // Change this to your UGive brand color
    alignItems: 'center',
    justifyContent: 'center',
  },
  agreeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default TermsScreen;