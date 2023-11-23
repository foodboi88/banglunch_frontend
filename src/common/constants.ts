const SYSTEM_CONSTANTS = {
    API: {
        LISTHOTEL: {
            DEPARTMENT: "api/Employee/me",
            HOTEL: "api/OperationCenter/me",
        },
        IDENTITY: {
            CONNECT_TOKEN: "identity/clients/publicKey",
            LOGIN: "users/login",
            FORGOT: "license_manager/users",
            REGISTER: "users/register",
            GETUSERINFO: "users/getuserinfo",
            CHECKEMAIL: "users/checkemail",
            ACTIVE_ACCOUNT: "users/active-account",
        },
        MEETINGS: {
            CREATE_MEETINGS: "meeting",
            FILTER_MEETINGS: "meeting/multiMember",
            UPDATE_MEETINGS: "meeting/{meetingId}",
            DELETE_MEETINGS: "meeting/{meetingId}",
            GET_MEETING_BY_ID: "meeting/{meetingId}",
        },
        MEMBER: {
            GET_ALL: "member/getAll",
            GET_ALL_WITH_ROLE: "member/getAllWithRole",
            CREATE_MEMBER: "member",
        },
        ROLE: {
            GET_ALL: "role/getAll",
        },
        TASK: {
            GET_ALL: "task/getAll",
            CREATE_TASK: "task",
        },
        MAIL_SERVICE: {
            MEETING_INVITATION: "meetingInvitation",
        },
        CRITERIA: {
            GET_ALL: "criteria",
        },
        QUESTION: {
            GET_ALL: "questions/criteria",
        },
        ANSWER: {
            GET_ALL: "answers",
        },
        POSITIONS: {
            GET_ALL: "positions",
        },
        FACILITIES: {
            GET_ALL: "facilities",
            GET_BY_DESCRIPTION: "facilities/byDescription",
        },
        ADDRESSES: {
            GET_ALL: "addresses",
        },
        RESULT: {
            CACULATE: "results/answers",
        },
        SKETCHS: {
            NEWEST_SKETCHS: "",
        },
    },
    IMAGE: {
        IMAGE_HOTEL: "dms/Document/file",
    },
};

export default SYSTEM_CONSTANTS;
