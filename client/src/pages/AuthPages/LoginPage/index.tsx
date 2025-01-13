import { useState } from "react";
import AuthLayout from "../../../components/layouts/AuthLayout";
import InputFormFragment from "../../../components/fragments/InputFormFragment";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    data: "",
    password: "",
  });
  const [error, setError] = useState("");

  const loginHandler = async (e: any) => {
    e.preventDefault();
    setError(""); // Reset error message

    // Validate empty fields
    if (!formData.data || !formData.password) {
      setError("Email/Username dan Password harus diisi");
      return;
    }

    try {
      const response = await axios.post("https://solofest.site/server/public/api/auth/login", {
        identifier: formData.data,
        password: formData.password,
      });
      const token = response.data.data.access_token;
      localStorage.setItem("jwtToken", token);
      if (token !== "") {
        window.location.href = "/home";
      }
    } catch (error: any) {
      if (error.response) {
        // Handle specific error messages from backend
        setError(error.response.data.message || "Login gagal. Silakan cek kembali email dan password Anda.");
      } else {
        setError("Terjadi kesalahan. Silakan coba lagi.");
      }
      console.error(error);
    }
  };

  return (
    <AuthLayout onSubmit={loginHandler} title="Login">
      {error && <div style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}>{error}</div>}
      <InputFormFragment type="text" name="email" value={formData.data} onChange={(e) => setFormData({ ...formData, data: e.target.value })} placeholder="">
        Email / Username / No. Handphone
      </InputFormFragment>

      <InputFormFragment type="password" name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="">
        Password
      </InputFormFragment>
    </AuthLayout>
  );
};

export default LoginPage;
