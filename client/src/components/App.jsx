import React, { useEffect, useState } from "react";
import Navbar from "./navbar/Navbar";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./app.less";
import Registration from "./registration/Registration";
import Authorization from "./authorization/Authorization";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../actions/user";
import Disk from "./disk/Disk";

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(auth()).then(() => navigate("/", { replace: true }));
  }, []);

  return (
    <div className="app">
      <Navbar />
      <div className="wrap">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Disk />
              </ProtectedRoute>
            }
          />
          <Route path="/registration" element={<Registration />} />
          <Route path="/autorization" element={<Authorization />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
