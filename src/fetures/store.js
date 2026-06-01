import { configureStore } from '@reduxjs/toolkit';
import getUniversityReducer from '../fetures/getUniversitySlice';
import messageReducer from '../fetures/messageSlice';
import authSliceReducer from '../fetures/authSlice';
import profileReducer from '../fetures/profileSlice';
import resetPasswordSlice from '../fetures/ResetPasswordSlice';
import deleteAcountSlice from '../fetures/deleteSlice';
import passwordChangeSlice from '../fetures/changepassword';
import rewardsSlice from '../fetures/getRewardsSlice';
import FriendsReducer from '../fetures/friendListSlice';
import friendsReceviedReducer from '../fetures/friendReceviedSlice';
import searchFriendSliceReducer from '../fetures/searchFriendSlice';
import friendsAddDeleteReducer from '../fetures/friendAdddeleteslice';
import eligibilitySliceReducer from '../fetures/eligibilitySlice';
import cardSendSliceReducer from '../fetures/cardSendSlice';
import cardRemainingSlice from '../fetures/CardSendRemainingSlice';
import claimRewardsSliceReducer from '../fetures/claimRewardsSlice';
import SendlistSliceReducer from '../fetures/getCardListSlice';
import sendOtpSignupThunk from '../fetures/sendOtpSignupThunk';
import eventListreducer from '../fetures/eventListSlice';
import calendarReducer from '../fetures/calendarslice';
import rsvpReducer from '../fetures/rsvpslice';
import eventDetailReducer from '../fetures/eventDetailsSlice';
import contactFormReducer from '../fetures/contactformslice';
import leaderboardReducer from '../fetures/leaderBoardSlice';
import friendsReducer from '../fetures/friendsSlice';
import studentReducer from '../fetures/studentSlice';

const store = configureStore({
  reducer: {
    universities: getUniversityReducer,
    message: messageReducer,
    auth: authSliceReducer,
    profile: profileReducer,
    forgetData: resetPasswordSlice,
    delete: deleteAcountSlice,
    password: passwordChangeSlice,
    rewards: rewardsSlice,
    friends: FriendsReducer,
    friendsRecevied: friendsReceviedReducer,
    searchFriend: searchFriendSliceReducer,
    friendsAdd: friendsAddDeleteReducer,
    eligibility: eligibilitySliceReducer,
    cardSend: cardSendSliceReducer,
    cardRemaning: cardRemainingSlice,
    claimRewards: claimRewardsSliceReducer,
    listCards: SendlistSliceReducer,
    OtpVerfication: sendOtpSignupThunk,
    eventList: eventListreducer,
    calendar: calendarReducer,
    rsvp: rsvpReducer,
    eventDetail: eventDetailReducer,
    contactForm: contactFormReducer,
    leaderboard: leaderboardReducer,
    friendsList: friendsReducer,
    student: studentReducer,
  },
});

export default store;
