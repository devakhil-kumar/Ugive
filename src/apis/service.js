import { CardsRemaningSend, ChangePassword, CheckEligibility, claimRewards, DeleteAcount, editProfileAPI, FriendRequestAccept, FriendRequestDelete, FriendRequestSent, getColleges, GetFriendList, GetListCards, GetReceivedList, GetRewards, GetSearchNameEmail, getUniversities, loginAPI, profileGetData, registerStudent, ResetPassword, SendCardsFriends, VerifyResetCode } from "./api"

export const getUniversitiesSerivce = async () => {
    try {
        const resposne = await getUniversities()
        return resposne.data
    } catch (error) {
        console.log(error);
        throw new Error('Failed to Universities.');
    }
}

export const getCollegesSerivce = async (universityId) => {
    try {
        const resposne = await getColleges(universityId)
        return resposne.data;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to colloges")
    }
}

export const signupService = async userData => {
    try {
        const response = await registerStudent(userData);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            const errorMessage = error.response.data.message ||
                error.response.data.error ||
                'Signup failed. Please try again.';
            throw new Error(errorMessage);
        } else if (error.request) {
            throw new Error('No response from server. Please check your connection.');
        } else {
            throw new Error('Signup failed. Please try again.');
        }
    }
}

export const loginService = async userData => {
    try {
        const response = await loginAPI(userData);
        return response.data;
    } catch (error) {
        const errorMessage =
            error.response?.data?.message ||
            error.response?.data?.error;
        return Promise.reject(errorMessage);
    }
};

export const getProfileService = async () => {
    try {
        const response = await profileGetData()
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch profile.');
    }
}

export const editProfileService = async (formdata) => {
    try {
        const response = await editProfileAPI(formdata);
        return response.data
    } catch (error) {
        console.log(error, 'errorr++++++')
        throw new Error(
            error?.response?.data?.message || "Failed to update profile"
        );
    }
}

export const resetPasswordService = async (email) => {
    try {
        const response = await ResetPassword(email);
        return response.data;
    } catch (error) {
        console.log(error, 'errorr+++++++=')
        console.log(error.response, 'error')
        if (error.response && error.response.data) {
            const errorMessage = error.response.data.message ||
                error.response.data.error ||
                'Failed while Reset Password. Please try again.';
            throw new Error(errorMessage);
        } else if (error.request) {
            throw new Error('No response from server. Please check your connection.');
        } else {
            throw new Error('Failde while Reset Password. Please try again.');
        }
    }
}

export const VerifyResetCodeService = async (data) => {
    try {
        const response = await VerifyResetCode(data);
        console.log("Response from  service :", response);
        return response;
    } catch (error) {
        console.log(error.response, 'error')
        if (error.response && error.response.data) {
            const errorMessage = error.response.data.message ||
                error.response.data.error ||
                'Failed while Verify Reset Code. Please try again.';
            throw new Error(errorMessage);
        } else if (error.request) {
            throw new Error('No response from server. Please check your connection.');
        } else {
            throw new Error('Failde while Verify Reset Code. Please try again.');
        }
    }
}

export const DeleteAcountService = async () => {
    try {
        const response = await DeleteAcount();
        console.log(response, 'response++++++')
        return response.data;
    } catch (error) {
        console.log(error, 'errrorr+++++')
        const errorMessage =
            error.response?.data?.message ||
            error.response?.data?.error;
        return Promise.reject(errorMessage);
    }
};

export const passwordChange = async (UpdatePassword) => {
    try {
        const response = await ChangePassword(UpdatePassword);
        console.log(response, 'response++++')
        return response;
    } catch (error) {
        throw new Error(
            error || "Failed to update profile"
        );
    }
}

export const getRewardsCollages = async () => {
    try {
        const response = await GetRewards()
        return response;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch profile.');
    }
}

export const getFriendList = async () => {
    try {
        const response = await GetFriendList();
        console.log(response, 'response+++++++++')
        return response;
    } catch (error) {
        console.log(error, 'error+++++')
        throw new Error('failed fetch the freand list')
    }
}

export const getFriendRecevied = async () => {
    try {
        const response = await GetReceivedList();
        console.log(response, 'response+++++++++++')
        return response;
    } catch (error) {
        console.log(error, 'errrorrcsdcs')
        throw new Error('failed fetch the freand list')
    }
}

export const AddFriendSent = async (receiverId) => {
    try {
        const response = await FriendRequestSent(receiverId);
        return response;
    } catch (error) {
        throw new Error('failed fetch the freand list')
    }
}

export const ConfirmFriendRequest = async (requestId) => {
    try {
        const response = await FriendRequestAccept(requestId);
        console.log(response, 'response+++++++++')
        return response;
    } catch (error) {
        console.log(error, 'error+++++')
        throw new Error('failed fetch the freand list')
    }
}

export const DeleteFriendRequest = async (requestId) => {
    try {
        const response = await FriendRequestDelete(requestId);
        return response;
    } catch (error) {
        throw new Error(error)
    }
}

export const EligibilityCard = async () => {
    try {
        const response = await CheckEligibility()
        return response;
    } catch (error) {
         throw error;
    }
}

  
export const CardSendRemaining = async () => {
    try{
        const response = await CardsRemaningSend()
        console.log(response, 'response++++')
        return response;
    }catch (error){
        throw error;
    }
}

export const CalimRewards = async (rewardId) => {
    try{
        const response = await claimRewards(rewardId)
        console.log(response, 'response++++')
        return response;
    }catch (error){
        console.log(error, 'errorr +++++')
        throw error;
    }
}

export const listCardSend = async () => {
    try {
        const response = await GetListCards()
        console.log(response, 'responsebvisdufvhbdfkv')
        return response.data;
    } catch (error) {
        console.log(error, 'errorrnbvhdsuvbf')
         throw error;
    }
}
