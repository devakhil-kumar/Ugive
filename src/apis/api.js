import axios from 'axios';
import { API_ROUTES } from './constant';
import { getUserData } from '../utils/asyncStorageManager';

const BASE_URL = "https://ugive.com.au/api/"


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const { token } = await getUserData();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.log(err, 'erorr')
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const getUniversities = () => {
  return axiosInstance.get(`${API_ROUTES.GETUNIVERSITIES}`);
};

export const getColleges = (universityId) => {
  return axiosInstance.get(API_ROUTES.GETCOLLEGES(universityId));
};

export const registerStudent = (userData) => {
  return axiosInstance.post(API_ROUTES.STUDENTSIGNUP, userData)
}

export const loginAPI = userData => {
  return axiosInstance.post(API_ROUTES.STUDENTLOGIN, userData)
}

export const profileGetData = () => {
  return axiosInstance.get(`${API_ROUTES.GETPROFILE}`)
}

export const editProfileAPI = async (formData) => {
  const { token } = await getUserData();
  return axios.put(`${BASE_URL}${API_ROUTES.EDITPROFILE}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
}

export const ResetPassword = (email) => {
  return axiosInstance.post(API_ROUTES.RESETPASSWORD, {
    email: email
  });
}

export const VerifyResetCode = (data) => {
  console.log("Data :", data);
  return axiosInstance.post(API_ROUTES.RESETCODE, {
    "email": data?.email,
    "code": data?.code,
    "newPassword": data?.newPassword
  });
}

export const DeleteAcount = () => {
  return axiosInstance.post(API_ROUTES.DELETEACCOUNT);
}

export const ChangePassword = (UpdatePassword) => {
  return axiosInstance.put(`${API_ROUTES.CHANGEPASSWORD}`, UpdatePassword)
}

export const GetRewards = () => {
  return axiosInstance.get(API_ROUTES.GETALLREWARDS)
}

export const GetFriendList = () => {
  return axiosInstance.get(API_ROUTES.FRIENDdLIST)
}

export const GetReceivedList = () => {
  return axiosInstance.get(API_ROUTES.FRIENDSRECEVIED)
}

export const searchUsersByNameEmail = (searchTerm = '') => {
  if (!searchTerm.trim()) {
    throw new Error('Search term is required');
  }
  const url = `${API_ROUTES.SEARCHNAMEEMAIL}${encodeURIComponent(searchTerm.trim())}`;
  return axiosInstance.get(url);
};

export const FriendRequestSent = (receiverId) => {
  return axiosInstance.post(API_ROUTES.ADDFRINED, {
    receiverId: receiverId
  });
}

export const FriendRequestAccept = (requestId) => {
  return axiosInstance.post(API_ROUTES.AcceptFriend, {
    requestId: requestId
  });
}

export const FriendRequestDelete = (requestId) => {
  return axiosInstance.post(API_ROUTES.DeleteRequest, {
    requestId: requestId
  });
}

export const CheckEligibility = () => {
  return axiosInstance.get(API_ROUTES.ELIGIBILITYcheck)
}

export const SendCardsFriends = (CardDetails) => {
  return axiosInstance.post(API_ROUTES.SENDCARD, CardDetails);
};

export const CardsRemaningSend = () => {
  return axiosInstance.get(API_ROUTES.REMAININGCARDS)
}

export const claimRewards = (rewardId) => {
  return axiosInstance.post(API_ROUTES.CLAIMREWARDS, {
    rewardId: rewardId
  });
};

export const GetListCards = () => {
  return axiosInstance.get(API_ROUTES.SENDCARDLIST)
}
