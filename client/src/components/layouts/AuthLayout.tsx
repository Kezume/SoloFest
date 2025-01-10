import { Form, Link } from "react-router-dom";
import MainLayout from "./MainLayout";
import Title from "../elements/Title";
import Button from "../elements/Button";
import Paragraph from "../elements/paragraph";

interface AuthLayoutProps {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  title: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, onSubmit, title }) => {
  return (
    <MainLayout>
      <div className={`flex justify-center items-center ${title != "Login" ? "h-auto" : "h-[60vh]"} p-10`}>
        <Form
          className="w-[50rem] h-full p-5 flex flex-col gap-5 bg-white rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.19),_0_6px_6px_rgba(0,0,0,0.23)] transition-shadow duration-300 ease-in-out"
          onSubmit={onSubmit}
        >
          <div className="textbox w-[20rem] flex flex-col gap-2">
            <Title>Selamat Datang {title === "register" ? "👋 Kenalan Dulu Yuk" : "Kembali Bolo"}</Title>
            <Paragraph>Silahkan isi data berikut </Paragraph>
          </div>

          {children}
          <p className="flex items-center gap-1">
            Kamu {title === "register" ? "sudah" : "belum"} punya akun?
            <Link to={title === "register" ? "/login" : "/register"} className="font-bold hover:text-violet-500">
              {title === "register" ? "Masuk lagi yuk!" : "Kenalan dulu yuk!"}
            </Link>
          </p>
          <Button type="submit" buttonStyle="bg-primary py-2 px-6 rounded text-white">
            {title === "register" ? "Daftar" : "Masuk"}
          </Button>
        </Form>
      </div>
    </MainLayout>
  );
};

export default AuthLayout;
