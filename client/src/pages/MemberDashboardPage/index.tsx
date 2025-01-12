import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axios from "axios";

const MemberDashboardPage = () => {
  // const [data, setData] = useState([]);
  useEffect(() => {
    axios("http://localhost:8000/api/users/profile", {
      method: "GET",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, // Jika API memerlukan autentikasi
      },
    }).then((res) => {
      console.log(res.data);
      // setData(res.data);
    });
  }, []);
  return (
    <DashboardLayout>
      <div className="title-wrapper p-5">
        <h3 className="text-xl">
          Dashboard /<span className="text-primary"> Profile </span>
        </h3>

        <div className="profile-wrapper w-full h-[70vh] bg-white shadow-lg my-5 "></div>
      </div>
    </DashboardLayout>
  );
};

export default MemberDashboardPage;
