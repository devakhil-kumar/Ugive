import axios from 'axios';
import { API_ROUTES } from './constant';
import { getUserData } from '../utils/asyncStorageManager';
import store from '../fetures/store';
import { logout } from '../fetures/authSlice';
import { showMessage } from '../fetures/messageSlice';

// const BASE_URL = 'https://ugive.com.au/';
// const NEW_BASE_URL = 'https://ugive.com.au/api/';

const BASE_URL = 'http://49.13.70.253:5000/';
const NEW_BASE_URL = 'http://49.13.70.253:5000/api/';

const axiosInstance = axios.create({
  baseURL: NEW_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async config => {
    try {
      const { token } = await getUserData();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.log(err, 'erorr');
    }
    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      console.log('Token Expired or Unauthorized! Force Logging out...');
      store.dispatch(logout());
      store.dispatch(
        showMessage({
          type: 'error',
          text: 'Session expired. Please login again.',
        }),
      );
    }
    return Promise.reject(error);
  },
);

export const getUniversities = () => {
  return axiosInstance.get(`${API_ROUTES.GETUNIVERSITIES}`);
};

export const getColleges = universityId => {
  return axiosInstance.get(API_ROUTES.GETCOLLEGES(universityId));
};

export const registerStudent = userData => {
  return axiosInstance.post(API_ROUTES.STUDENTSIGNUP, userData);
};

export const loginAPI = userData => {
  console.log(`${NEW_BASE_URL}${API_ROUTES.STUDENTLOGIN}`);
  return axiosInstance.post(API_ROUTES.STUDENTLOGIN, userData);
};

export const profileGetData = () => {
  return axiosInstance.get(`${API_ROUTES.GETPROFILE}`);
};

export const editProfileAPI = async formData => {
  const { token } = await getUserData();
  return axios.put(`${NEW_BASE_URL}${API_ROUTES.EDITPROFILE}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const ResetPassword = email => {
  return axiosInstance.post(API_ROUTES.RESETPASSWORD, {
    email: email,
  });
};

export const VerifyResetCode = data => {
  console.log('Data :', data);
  return axiosInstance.post(API_ROUTES.RESETCODE, {
    email: data?.email,
    code: data?.code,
    newPassword: data?.newPassword,
  });
};

export const DeleteAcount = () => {
  return axiosInstance.post(API_ROUTES.DELETEACCOUNT);
};

export const ChangePassword = UpdatePassword => {
  return axiosInstance.put(`${API_ROUTES.CHANGEPASSWORD}`, UpdatePassword);
};

export const GetRewards = () => {
  return axiosInstance.get(API_ROUTES.GETALLREWARDS);
};

export const GetFriendList = () => {
  return axiosInstance.get(API_ROUTES.FRIENDdLIST);
};

export const GetReceivedList = () => {
  return axiosInstance.get(API_ROUTES.FRIENDSRECEVIED);
};

export const searchUsersByNameEmail = (searchTerm = '') => {
  if (!searchTerm.trim()) {
    throw new Error('Search term is required');
  }
  const url = `${API_ROUTES.SEARCHNAMEEMAIL}${encodeURIComponent(
    searchTerm.trim(),
  )}`;
  return axiosInstance.get(url);
};

export const FriendRequestSent = receiverId => {
  return axiosInstance.post(API_ROUTES.ADDFRINED, {
    receiverId: receiverId,
  });
};

export const FriendRequestAccept = requestId => {
  return axiosInstance.post(API_ROUTES.AcceptFriend, {
    requestId: requestId,
  });
};

export const FriendRequestDelete = requestId => {
  return axiosInstance.post(API_ROUTES.DeleteRequest, {
    requestId: requestId,
  });
};

export const CheckEligibility = () => {
  return axiosInstance.get(API_ROUTES.ELIGIBILITYcheck);
};

export const SendCardsFriends = CardDetails => {
  return axiosInstance.post(API_ROUTES.SENDCARD, CardDetails);
};

export const CardsRemaningSend = () => {
  return axiosInstance.get(API_ROUTES.REMAININGCARDS);
};

export const claimRewards = rewardId => {
  return axiosInstance.post(API_ROUTES.CLAIMREWARDS, {
    rewardId: rewardId,
  });
};

export const GetListCards = () => {
  return axiosInstance.get(API_ROUTES.SENDCARDLIST);
};

export const checkBanWordsApi = async message => {
  console.log('Data from api :', message);
  const { token } = await getUserData();
  return axios.post(`${BASE_URL}${API_ROUTES.CHECKBANWORDS}`, message, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  // return axiosInstance.post(API_ROUTES.CHECKBANWORDS, message);
};

export const OtpVerfication = (email, name) => {
  return axiosInstance.post(API_ROUTES.REGISTER_OTP, {
    email: email,
    name: name,
  });
};

export const GetNote = () => {
  return axiosInstance.get(API_ROUTES.GETNOTE);
};

export const registerFCMToken = (fcmToken, platform) => {
  return axiosInstance.post(API_ROUTES.REGISTER_FCM_TOKEN, {
    token: fcmToken,
    platform: platform,
  });
};

export const logoutDevice = fcmToken => {
  return axiosInstance.delete(API_ROUTES.LOGOUT_DEVICE, {
    data: { token: fcmToken },
  });
};

export const getAllEventList = ({ page, limit, category } = {}) => {
  return axiosInstance.get(API_ROUTES.GETALL_EVENT_LIST, {
    params: {
      page,
      limit,
      category,
    },
  });
};

export const getALLEventCalander = async (month, year) => {
  try {
    const response = await axiosInstance.get(API_ROUTES.CALENDER_EVENT_API, {
      params: { month, year },
    });
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data?.message ??
      error.message ??
      'Failed to fetch calendar events'
    );
  }
};

export const postRsvpStatus = async (eventId, status) => {
  try {
    const response = await axiosInstance.post(
      `${API_ROUTES.RSVP_STUTAS}/${eventId}`,
      { status },
    );
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data?.message ?? error.message ?? 'Failed to update RSVP'
    );
  }
};

export const EventDetailsStatus = async eventId => {
  console.log(eventId, 'eventid----');
  try {
    const response = await axiosInstance.get(
      `${API_ROUTES.DEATILS_BY_ID}/${eventId}`,
    );
    return response.data;
  } catch (error) {
    console.log(error, 'errorr++_+_+==-');
    throw (
      error?.response?.data?.message ?? error.message ?? 'Failed to update RSVP'
    );
  }
};

export const ContactFromData = async data => {
  try {
    const response = await axiosInstance.post(API_ROUTES.CONTACT_FROM, data);
    return response.data;
  } catch (error) {
    console.log(error, 'errorr++_+_+==-');
    throw (
      error?.response?.data?.message ?? error.message ?? 'Failed to update RSVP'
    );
  }
};

export const getLeaderboard = async ({ page = 1, limit = 50, period } = {}) => {
  try {
    const response = await axiosInstance.get(
      API_ROUTES.GET_LEADERBOARD(page, limit, period),
    );
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data?.message ?? error.message ?? 'Failed to update RSVP'
    );
  }
};

export const getFriendsList = async (searchQuery = '') => {
  const params = searchQuery ? { search: searchQuery } : {};
  try {
    const response = await axiosInstance.get(API_ROUTES.STUDENT_FRIEND, {
      params,
    });
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data?.message ?? error.message ?? 'Failed to update RSVP'
    );
  }
};

export const StudentGetData = async ({ period } = {}) => {
  try {
    return axiosInstance.get(API_ROUTES.STUDENT_FETCH, {
      params: {
        ...(period && { period }),
      },
    });
  } catch (error) {
    throw (
      error?.response?.data?.message ??
      error.message ??
      'Failed to fetch student data'
    );
  }
};
