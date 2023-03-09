import axios from "axios";
import { setUser } from "../reduser/userReduser";

export const registration = async (email, password) => {
  try {
    const response = await axios.post(
      `http://localhost:4000/api/auth/registration`,
      {
        email,
        password,
      }
    );
    alert(response.data.message);
    return true;
  } catch (e) {
    alert(e.response ? e.response.data.message : "Error server connect");
    return false;
  }
};

export const autorization = (email, password) => {
  return async (dispatch) =>
    await axios
      .post(`http://localhost:4000/api/auth/login`, {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        dispatch(setUser(response.data.user));
      })
      .catch((e) => {
        alert(e.response ? e.response.data.message : "Error server connect");
      });
};

export const auth = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const response = await axios.get(
          `http://localhost:4000/api/auth/auth`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        localStorage.setItem("token", response.data.token);
        dispatch(setUser(response.data.user));
      }
    } catch (e) {
      alert(e.response ? e.response.data.message : "Error server connect");
      localStorage.removeItem("token");
    }
  };
};
