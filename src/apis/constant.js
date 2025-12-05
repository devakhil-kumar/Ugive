export const API_ROUTES = {
    STUDENTLOGIN: "auth/login",
    STUDENTSIGNUP: "auth/register",
    GETUNIVERSITIES: "public/universities",
    GETCOLLEGES: (universityId) =>
        `public/universities/${universityId}/colleges`,

}
