// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";
import Stock from "./Stock.jsx";
import Batch from "./Batch.jsx";
import Transactions from "./Transactions.jsx";
import Alert from "./Alert.jsx";
import Insights from "./Insights.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/batch" element={<Batch />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/alerts" element={<Alert />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
