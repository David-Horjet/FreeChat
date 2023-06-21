// export const host = 'https://freechat-api.onrender.com';
export const host = 'http://localhost:5000';
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setImageRoute = `${host}/api/auth/setImage`;
export const usersRoute = `${host}/api/user/all/e-user`;
export const userRoute = `${host}/api/user/profile`;
export const profileSettingRoute = `${host}/api/user/settings`;
export const passwordSettingRoute = `${host}/api/user/settings/password`;
export const deleteUserRoute = `${host}/api/user/delete`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const getAllMessagesRoute = `${host}/api/messages/getmsg`;