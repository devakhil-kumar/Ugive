import Feather from '@react-native-vector-icons/feather';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';

const PRIVACY_DATA = [
  {
    id: 'intro',
    title: 'Privacy Policy',
    content: 'Highlands Church (Highlands) as part of Christian Outreach Centre (trading as International Network of Churches), ABN 79 400 419 737 recognises that the right to privacy of all persons is very important. This Privacy Policy sets out the key elements of how we comply with the Australian Privacy Principles, particularly in terms of the treatment of personal information that we collect and/or hold. Highlands must comply with the Australian Privacy Act, and the Australian Privacy Principles, as amended from time to time.',
  },
  {
    id: 'sec_gen',
    title: 'Second Generation Privacy Policy',
    content: 'Highlands has adopted a "whole of organisation" privacy policy. Notwithstanding this, some parts of Highlands operations, particularly our educational and childcare ministries, have developed specific Privacy Policies for their day-to-day operations. As stated previously, all Highlands Privacy Policy documents must comply with the relevant legislation.',
  },
  {
    id: 'legislation',
    title: 'Legislation',
    content: '• Privacy Act 1988 (Cth)\n• Privacy Amendment (Enhancing Privacy Protection) Act 2012\n• Notifiable Data Breaches (NDB) Scheme',
  },
  {
    id: 'ack',
    title: 'Acknowledgement of Our Privacy Policy',
    content: 'Our obligation under the Privacy Amendment (Enhancing Privacy Protection) Act 2012 is to comply with Australian Privacy Principle 1.4 which requires us to set out our policies on the management of personal information in a clearly expressed document which is free of charge to anyone who asks for it.\n\nWithout limiting the generality of the above statement, a person\'s use of the Highlands website constitutes an acknowledgement that they have been made aware of our privacy policy.\n\nWe respect your personal information and your right to privacy. This Privacy Policy describes the information that may be collected by us and how we protect your personal information.\n\nShould there be, in any specific case, any inconsistency between this statement and the Act, this statement shall be interpreted, in respect of that case, to give effect to, and comply with the legislation.',
  },
  {
    id: 'exception',
    title: 'Exception in Relation to Employee Records',
    content: 'Under the Privacy Act, the Australian Privacy Principles do not apply to an employee record held by the employing entity. As a result, this Privacy Policy does not apply to Highlands treatment of an employee record, where the treatment is directly related to a current or former employment relationship between Highlands and an employee.',
  },
  {
    id: 'kind_info',
    title: 'The Kind of Personal Information We Collect and Hold',
    content: 'Personal information is information or an opinion about an identified or reasonably identifiable individual. We may collect non-personal information from you, such as browser type, operating system, and web pages visited to help us manage our web site.\n\nMany of our church services & conference meetings are recorded. Testimonials, song performances, baptism services and leadership meetings are further examples of recordings that may be made by Highlands & ministries.\n\nImages of people attending and participating in our services, events and/or conferences, or other recordings, for example as above, may be used or shown in part for promotional purposes, resource material and commercial activities.\n\nBy attending such church services and / or conference sessions, or being involved in testimonials for example, you agree to Highlands using your image and personal information in these recordings.',
  },
  {
    id: 'how_collect',
    title: 'How We Collect and Hold Personal Information',
    content: 'We use cookies and other Internet technologies to manage our website, social media platforms and certain online products and services. We do not use these technologies to collect or store personal information unless you have opted in to such a feature.\n\nOur Internet server logs the following information which is provided by your browser for statistical purposes only:\n\n• The type of browser and operating system you are using\n• Your Internet Service Provider and top level domain name\n• The address of any referring web site; and\n• Your computer\'s IP address.\n\nAll this information is used by Highlands for aggregated statistical analyses or systems administration purposes only. No attempt will be made to identify users or their browsing activities, except where required by or under law.',
  },
  {
    id: 'cookies',
    title: 'Cookies',
    content: 'A "cookie" is a packet of information that allows Highlands server to identify and interact more effectively with your computer.\n\nWhen you access our web site, we send you a temporary or "session cookie" that gives you a unique identification number. A different identification number is sent each time you use our website. Cookies do not identify individual users, although they do identify a user\'s Internet browser type and your Internet Service Provider. Shortly after you end your interaction with our web site, the cookie expires. This means it no longer exists on your computer and therefore cannot be used for further identification or access to your computer. Without cookies certain personalised services cannot be provided to users of our website, accordingly you may not be able to take full advantage of all of Highlands website features if cookies have been disabled.',
  },
  {
    id: 'links',
    title: 'Links to Other Sites',
    content: 'The Highlands website may contain links to other external sites. We are ultimately not responsible for the privacy practises or the content of such external web sites. We encourage you to read and understand the privacy policies on those websites prior to providing any information to them.',
  },
  {
    id: 'searches',
    title: 'Searches',
    content: 'Search terms that you enter when using our search engine are collected but are not associated with any other information that we collect.',
  },
  {
    id: 'purposes',
    title: 'The Purposes for Which We Collect, Hold, Use and Disclose Personal Information',
    content: 'We use personal information you provide only for purposes consistent with the reason you provided it, or for a directly related purpose. Generally we will not use your personal information to market to you unless we have either your implied or express consent but in situations where it is impractical to obtain your prior consent, we will ensure you have an ability to opt out of such future communications.\n\nWe do not share your personal information with other organisations unless you give us your express consent, or where sharing is otherwise required or permitted by law, or where this is necessary on a temporary basis to enable our contractors to perform specific functions.\n\nGenerally, Highlands will collect personal information directly from you, only to the extent necessary to provide a product or service, or to carry out our internal administrative operations. We may collect personal information from you when you:\n\n• Fill in an application form (expressions of interest, volunteer, etc.)\n• Register for a conference or event\n• Make a donation\n• Open a new account with INC Invest\n• Acquire goods or services\n• Register with Highlands\n• Access social media platforms\n• Participate in local church/ministry activities\n• Participate in surveys\n• Deal with us over the telephone, email or in person.\n\nYou may also be able to transact with us anonymously where this is lawful and practicable.',
  },
  {
    id: 'pastoral',
    title: 'Pastoral Care & Broader Highlands Connectedness',
    content: 'If you provide your personal information to Highlands, you consent to being contacted generally for Pastoral Care and follow-up by Highlands.\n\nIf you provide personal information to Highlands for any other reason, for example those stated above, this information may be shared within Highlands for the development of other products and services of Highlands, and to improve our general ability to assist church attendees and the wider community. The personal information collected through surveys is only used for analytical purposes.',
  },
  {
    id: 'marketing',
    title: 'Direct Marketing and Your Privacy',
    content: 'From time to time, we may use the personal information we collect from you to advise you of, for example, conferences, events, products and/or services, which we believe may be of interest to you. We may then contact you to let you know about these products and services and how they may benefit you. We will generally only do this with your consent and we will always give you a choice to opt out of receiving such information in the future.',
  },
  {
    id: 'photos',
    title: 'Videos/Photographs',
    content: 'Images of individuals in photographs or film are treated as personal information under the Privacy Act where the person\'s identity is clear or can reasonably be worked out from that image. We uphold that all photographs and video footage of individuals will be used solely for Highlands related purposes including at times promotion. Both video and still photography are an active part of the church life, ministries, activities and services. Highlands uses video and still photography for church related purposes or promotions. In accordance with the privacy act an individual\'s consent will be sought if the photograph or video records sensitive information about the individual. Where practically possible Highlands will seek the consent of individuals in other cases. If you would like to have a video or still image removed from any material, please contact us using the contact details set out below.',
  },
  {
    id: 'security',
    title: 'Security',
    content: 'Reasonable steps will be taken to keep secure any personal information which is held.\n\nPersonal information, held electronically, is stored in a secure server or secure files.\n\nSecurity measures are taken to protect your information from unauthorised access and against unlawful processing, accidental loss, destruction and damage.\n\nWhere we have given you, or where you have chosen security codes (username, password, memorable word or PIN), which enable you to use any online service, you are responsible for keeping these security details confidential.\n\nShould Highlands discover a breach of data held, reasonable steps will be taken to notify those affected by the breach as soon as possible including how the breach occurred, possible effect and data affected, time of breach/es and remedies taken in accordance with the Notifiable Data Breaches(NDB) scheme.',
  },
  {
    id: 'contact',
    title: 'Contact Details and Concerns',
    content: 'Highlands is committed to working to obtain a fair resolution of any complaint or concern about privacy. To contact us with a compliment or complaint or a privacy question, you can:\n\nWrite to us at: PO Box 7239, Kearneys Spring QLD 4350 or call our Highlands office (07) 4617 6555.',
  },
];

const PrivacyPolicyScreen = () => {

const navigation = useNavigation();

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
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
       <Feather name='arrow-left' size={20} color={'#000'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.lastUpdated}>Last Updated: Feb 2026</Text>

        {PRIVACY_DATA.map((item) => (
          <View key={item.id} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            <Text style={styles.sectionContent}>{item.content}</Text>
          </View>
        ))}

        <View style={styles.footerSpacing} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.closeButton} onPress={handleGoBack}>
          <Text style={styles.closeButtonText}>Close Privacy Policy</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#fff',
  },
  backButton: {
    paddingVertical: 5,
    paddingRight: 10,
  },
  backButtonText: {
    fontSize:24,
    color: '#000', 
  },
  headerRightPlaceholder: {
    width: 50, 
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
    textAlign: 'center',
  },
  scrollContent: {
    padding: 20,
  },
  lastUpdated: {
    fontSize: 13,
    color: '#888',
    fontStyle: 'italic',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24, 
    textAlign: 'justify',
  },
  footerSpacing: {
    height: 60,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#fff',
  },
  closeButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default PrivacyPolicyScreen;