export const LoginStart = (userCredentials) => ({
     type: "LOGIN_START"
});

export const LoginSuccess = (user, token) => ({
     type: "LOGIN_SUCCESS",
     payload: user,
     token: token
});

export const LoginFailure = (user) => ({
     type: "LOGIN_FAILURE"
});

export const Logout = (user) => ({
     type: "LOGOUT"
});

export const UpdateSuccess = (user) => ({
  type: "UPDATE_SUCCESS",
  payload: user,
});