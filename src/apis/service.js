import { getColleges, getUniversities, loginAPI, registerStudent } from "./api"

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
        console.log(error.response?.data?.message, 'resposenbchdfb')
        const errorMessage =
            error.response?.data?.message ||
            error.response?.data?.error;
        return Promise.reject(errorMessage);
    }
};