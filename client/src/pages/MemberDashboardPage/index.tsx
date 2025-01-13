import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axios from "axios";
import InputFormFragment from "../../components/fragments/InputFormFragment";
import Title from "../../components/elements/Title";

interface ProfileData {
  id: number;
  username: string;
  email: string;
  name: string;
  role: string;
  jenis_kelamin: string;
  tanggal_lahir: string;
  no_telp: string;
  provinsi: string;
  kota_kabupaten: string;
  alamat_lengkap: string;
  kode_pos: string;
  created_at: string;
  updated_at: string;
  email_verified_at: string;
}

const MemberDashboardPage = () => {
  const [data, setData] = useState<ProfileData>({} as ProfileData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios("https://solofest.site/server/public/api/users/profile", {
      method: "GET",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then((res) => {
        setData(res.data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="title-wrapper p-5">
        <h3 className="text-xl mb-6">
          Dashboard /<span className="text-primary"> Profile </span>
        </h3>

        <div className="profile-wrapper w-full bg-white shadow-lg my-5 p-6 rounded-lg">
          {/* Account Information */}
          <div className="mb-8">
            <Title titleStyle="font-bold text-xl mb-4">Informasi Akun</Title>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputFormFragment type="text" name="username" value={data.username} isDisabled>
                Username
              </InputFormFragment>
              <InputFormFragment type="email" name="email" value={data.email} isDisabled>
                Email
              </InputFormFragment>
              <InputFormFragment type="text" name="role" value={data.role} isDisabled>
                Role
              </InputFormFragment>
            </div>
          </div>

          {/* Personal Information */}
          <div className="mb-8">
            <Title titleStyle="font-bold text-xl mb-4">Data Pribadi</Title>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputFormFragment type="text" name="name" value={data.name}>
                Nama Lengkap
              </InputFormFragment>
              <InputFormFragment type="text" name="jenis_kelamin" value={data.jenis_kelamin}>
                Jenis Kelamin
              </InputFormFragment>
              <InputFormFragment type="date" name="tanggal_lahir" value={data.tanggal_lahir?.split("T")[0]}>
                Tanggal Lahir
              </InputFormFragment>
              <InputFormFragment type="tel" name="no_telp" value={data.no_telp}>
                No. Telepon
              </InputFormFragment>
            </div>
          </div>

          {/* Address Information */}
          <div className="mb-8">
            <Title titleStyle="font-bold text-xl mb-4">Alamat</Title>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputFormFragment type="text" name="provinsi" value={data.provinsi}>
                Provinsi
              </InputFormFragment>
              <InputFormFragment type="text" name="kota_kabupaten" value={data.kota_kabupaten}>
                Kota/Kabupaten
              </InputFormFragment>
              <InputFormFragment type="text" name="kode_pos" value={data.kode_pos}>
                Kode Pos
              </InputFormFragment>
              <div className="col-span-full">
                <InputFormFragment type="text" name="alamat_lengkap" value={data.alamat_lengkap}>
                  Alamat Lengkap
                </InputFormFragment>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MemberDashboardPage;
