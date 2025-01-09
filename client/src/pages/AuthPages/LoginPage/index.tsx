import { useState } from "react";
import AuthLayout from "../../../components/layouts/AuthLayout";
import InputFormFragment from "../../../components/fragments/InputFormFragment";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    data: "",
    password: "",
  });

  const loginHandler = async (e: any) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:8000/api/login", {
        identifier: formData.data,
        password: formData.password,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AuthLayout onSubmit={loginHandler} title="Login">
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
