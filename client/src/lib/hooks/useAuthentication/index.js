import React from "react";
import { useDispatch } from "react-redux";
import * as Realm from "realm-web";
import { realmApp } from "../../../lib/service/mongoDB-sdk";
import { addUsers, getUser } from "../../service";
import {
  handleAuthenticationErrors,
  handleLogin,
  handleLogout,
} from "../../state/actions/authentication";

const useAuthentication = () => {
  const dispatch = useDispatch();
  const handleUserRegistration = (newUser) => {
    return new Promise((resolve) => {
      const userProfile = {
        ...newUser,
        password: undefined,
        confirm_password: undefined,
      };
      realmApp.emailPasswordAuth
        .registerUser(newUser.email, newUser.password)
        .then(() => {
          const credential = Realm.Credentials.emailPassword(
            newUser.email,
            newUser.password
          );
          realmApp.logIn(credential).then((user) => {
            addUsers(userProfile);
            dispatch(handleLogin(userProfile));
            resolve(user);
          });
        })
        .catch((err) => dispatch(handleAuthenticationErrors(err)));
    });
  };

  const handleUserLogin = (email, password) => {
    return new Promise((resolve) => {
      const credentials = Realm.Credentials.emailPassword(email, password);
      realmApp
        .logIn(credentials)
        .then(async () => {
          const currentUser = await realmApp.currentUser;
          getUser(currentUser).then((userProfile) => {
            dispatch(handleLogin(userProfile));
            resolve(userProfile);
          });
        })
        .catch((err) => err && dispatch(handleAuthenticationErrors(err)));
    });
  };

  const handleUserLogout = async () => {
    console.dir(realmApp.currentUser);
    await realmApp.currentUser
      ?.logOut()
      .then(() => {
        console.log("user successfully log out");
        dispatch(handleLogout);
      })
      .catch((err) => console.log("error", err));
  };

  const handleAuthentification = async () => {
    const currentUser = await realmApp.currentUser;
    return new Promise((resolve) => {
      getUser(currentUser?._profile.data.email)
        .then((userProfile) => {
          dispatch(handleLogin(userProfile));
          resolve(userProfile);
        })
        .catch((err) => dispatch(handleAuthenticationErrors(err)));
    });
  };

  return {
    handleUserRegistration,
    handleUserLogout,
    handleAuthentification,
    handleUserLogin,
  };
};

export default useAuthentication;

// async function loginEmailPassword(email, password) {
//     // Create an anonymous credential
//     const credentials = Realm.Credentials.emailPassword(email, password);
//     try {
//       // Authenticate the user
//       const user = await app.logIn(credentials);
//       // `App.currentUser` updates to match the logged in user
//       assert(user.id === app.currentUser.id)
//       return user
//     } catch(err) {
//       console.error("Failed to log in", err);
//     }
//   }
//   loginEmailPassword("joe.jasper@example.com", "passw0rd").then(user => {
//     console.log("Successfully logged in!", user)
//   })
