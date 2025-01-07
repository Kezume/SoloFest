import { useState } from "react";
import AuthLayout from "../../../components/layouts/AuthLayout";
import InputFormFragment from "../../../components/fragments/InputFormFragment";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  return (
    <AuthLayout onSubmit={() => {}} title="Login">
      <InputFormFragment type="text" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="">
        Email / Username / No. Handphone
      </InputFormFragment>

      <InputFormFragment type="password" name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="">
        Password
      </InputFormFragment>
    </AuthLayout>
  );
};

export default LoginPage;
