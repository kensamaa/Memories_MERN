import * as api from "../api";
import { AUTH } from "../constants/actionTypes";
export const signin = (formData, history) => async (dispatch) => {
  try {
    //log in the user

    history.push("/");
  } catch (e) {
    console.error(e);
  }
};
export const signup = (formData, history) => async (dispatch) => {
  try {
    //sign up  in the user

    history.push("/");
  } catch (e) {
    console.error(e);
  }
};
