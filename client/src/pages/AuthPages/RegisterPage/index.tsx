import React, { useState, useEffect } from "react";
import Button from "../../../components/elements/Button";
import InputFormFragment from "../../../components/fragments/InputFormFragment";
import AuthLayout from "../../../components/layouts/AuthLayout";
import axios from "axios";

interface Province {
  id: string;
  name: string;
}

interface City {
  id: string;
  province_id: string;
  name: string;
}

interface FormData {
  username: string;
  email: string;
  no_telp: string;
  password: string;
  kon: string;
  full_name: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  alamat_lengkap: string;
  kota_kabupaten: string;
  provinsi: string;
  kode_pos: string;
  otpCode: string;
}

interface FormField {
  name: keyof FormData;
  label: string;
  type?: string;
  options?: { value: string; label: string }[];
}

const RegisterPage = () => {
  const [formSection, setFormSection] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    // Section 1
    username: "",
    email: "",
    no_telp: "",
    password: "",
    kon: "",
    // Section 2
    full_name: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    alamat_lengkap: "",
    kota_kabupaten: "",
    provinsi: "",
    kode_pos: "",
    // Section 3
    otpCode: "",
  });

  // Add API related states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json");
        setProvinces(response.data);
      } catch (error) {
        console.error("Failed to fetch provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  const fetchCities = async (provinceId: string) => {
    try {
      const response = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`);
      setCities(response.data);
    } catch (error) {
      console.error("Failed to fetch cities:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "provinsi") {
      fetchCities(value);
      setFormData((prev) => ({ ...prev, kota_kabupaten: "" })); // Reset city when province changes
    }
  };

  const validateSection = (section: number): boolean => {
    setError(null);

    switch (section) {
      case 1:
        if (!formData.username || !formData.email || !formData.no_telp || !formData.password || !formData.kon) {
          setError("Semua field harus diisi");
          return false;
        }

        // Password validation rules
        const passwordRegex = {
          capital: /^[A-Z]/, // Starts with capital letter
          number: /\d/, // Contains at least one number
          symbol: /[!@#$%^&*(),.?":{}|<>]/, // Contains at least one symbol
        };

        if (!passwordRegex.capital.test(formData.password)) {
          setError("Password harus diawali dengan huruf besar");
          return false;
        }

        if (!passwordRegex.number.test(formData.password)) {
          setError("Password harus mengandung minimal 1 angka");
          return false;
        }

        if (!passwordRegex.symbol.test(formData.password)) {
          setError("Password harus mengandung minimal 1 simbol");
          return false;
        }

        if (formData.password.length < 8) {
          setError("Password harus minimal 8 karakter");
          return false;
        }

        if (formData.password !== formData.kon) {
          setError("Password tidak cocok");
          return false;
        }

        if (!formData.email.includes("@")) {
          setError("Email tidak valid");
          return false;
        }
        break;

      case 2:
        if (!formData.full_name || !formData.tanggal_lahir || !formData.jenis_kelamin || !formData.provinsi || !formData.kota_kabupaten || !formData.alamat_lengkap || !formData.kode_pos) {
          setError("Semua field harus diisi");
          return false;
        }
        break;

      case 3:
        if (!formData.otpCode) {
          setError("Masukkan kode OTP");
          return false;
        }
        break;
    }

    return true;
  };

  const handleNextStep = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!validateSection(formSection)) {
        setIsLoading(false);
        return;
      }

      // When completing section 2, send registration data
      if (formSection === 2) {
        try {
          const registerData = {
            username: formData.username,
            email: formData.email,
            no_telp: formData.no_telp,
            password: formData.password,
            password_confirmation: formData.kon,
            full_name: formData.full_name,
            tanggal_lahir: formData.tanggal_lahir,
            jenis_kelamin: formData.jenis_kelamin,
            alamat_lengkap: formData.alamat_lengkap,
            kota_kabupaten: formData.kota_kabupaten,
            provinsi: formData.provinsi,
            kode_pos: formData.kode_pos,
            role: "member",
          };

          const registerResponse = await axios.post("https://solofest.site/server/public/api/auth/register", registerData);

          if (registerResponse.data.message) {
            setFormSection(3);
            // Show registration success message
            setError(registerResponse.data.message);
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 422) {
              const validationErrors = error.response.data.data;
              const errorMessages = Object.values(validationErrors).flat().join("\n");
              setError(errorMessages);
            } else {
              setError(error.response.data.message || "Ada Kesalahan!");
            }
          }
          return;
        }
      }

      // Handle OTP verification on final step
      if (formSection === 3) {
        try {
          const verifyResponse = await axios.post("https://solofest.site/server/public/api/auth/verify-otp", {
            email: formData.email,
            otp: formData.otpCode,
          });

          if (verifyResponse.data.message === "Email berhasil diverifikasi.") {
            setIsSuccess(true);
            // Optionally redirect to login page
            setTimeout(() => {
              window.location.href = "/login";
            }, 2000);
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            setError(error.response.data.message || "OTP tidak valid.");
          }
          return;
        }
      }

      // Only proceed to next section for step 1
      if (formSection === 1) {
        setFormSection(2);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  // Update refresh OTP functionality
  const handleRefreshOtp = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const refreshResponse = await axios.post("https://solofest.site/server/public/api/auth/refresh-otp", {
        email: formData.email, // Change to use email instead of user_id
      });

      if (refreshResponse.data.message) {
        setError(refreshResponse.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 429) {
          setError("Anda hanya dapat merefresh OTP setiap 5 menit.");
        } else if (error.response.status === 400) {
          setError("Akun sudah diverifikasi. Tidak perlu OTP lagi.");
        } else {
          setError(error.response.data.message || "Gagal memperbarui OTP");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formSections: Record<number, FormField[]> = {
    1: [
      { name: "username", label: "Nama Pengguna", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "no_telp", label: "No. Telp", type: "text" },
      { name: "password", label: "Password", type: "password" },
      { name: "kon", label: "Konfirmasi Password", type: "password" },
    ],
    2: [
      { name: "full_name", label: "Nama Lengkap" },
      { name: "tanggal_lahir", label: "Tanggal Lahir", type: "date" },
      {
        name: "jenis_kelamin",
        label: "Jenis Kelamin",
        type: "select",
        options: [
          { value: "Laki-laki", label: "Laki-laki" },
          { value: "Perempuan", label: "Perempuan" },
        ],
      },
      {
        name: "provinsi",
        label: "Provinsi",
        type: "select",
        options: provinces.map((province) => ({
          value: province.id,
          label: province.name,
        })),
      },
      {
        name: "kota_kabupaten",
        label: "Kota/Kabupaten",
        type: "select",
        options: cities.map((city) => ({
          value: city.id,
          label: city.name,
        })),
      },
      { name: "kode_pos", label: "Kode Pos" },
      { name: "alamat_lengkap", label: "Alamat Lengkap", type: "textarea" },
    ],

    3: [{ name: "otpCode", label: "Masukkan Kode OTP" }],
  };

  const renderControlButtons = () => {
    return (
      <div className="flex gap-4">
        {formSection > 1 && (
          <Button type="button" buttonStyle="bg-gray-500 py-2 px-6 rounded text-white" onClick={() => setFormSection((prev) => prev - 1)} disabled={isLoading}>
            Sebelumnya
          </Button>
        )}
        {formSection === 3 && (
          <Button type="button" buttonStyle="bg-blue-500 py-2 px-6 rounded text-white" onClick={handleRefreshOtp} disabled={isLoading}>
            Kirim Ulang OTP
          </Button>
        )}
        <Button type="button" buttonStyle={`bg-primary py-2 px-6 rounded text-white`} onClick={handleNextStep} disabled={isLoading}>
          {formSection === 3 ? "Verifikasi" : "Selanjutnya"}
        </Button>
      </div>
    );
  };

  const renderFormFields = () => {
    const fields = formSections[formSection];
    return (
      <div className={`grid ${formSection === 1 ? "grid-cols-1 md:grid-cols-2 gap-6" : "grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"} w-full`}>
        {fields.map((element) => (
          <div
            key={element.name}
            className={`
            ${element.type === "textarea" ? "md:col-span-2" : ""} 
            ${element.name === "alamat_lengkap" ? "md:col-span-2" : ""}
            ${element.name === "full_name" ? "md:col-span-2" : ""}
            ${element.name === "tanggal_lahir" ? "md:col-span-2" : ""}
            ${element.name === "kota_kabupaten" ? "md:col-span-2" : ""}
            ${element.name === "kode_pos" ? "md:col-span-2" : ""}
          `}
          >
            <InputFormFragment type={element.type || "text"} name={element.name} placeholder="" value={formData[element.name]} onChange={handleInputChange} options={element.options}>
              {element.label}
            </InputFormFragment>
          </div>
        ))}

        {error && <div className="md:col-span-2 text-red-500 text-sm">{error}</div>}
        {isSuccess && <div className="md:col-span-2 text-green-500 text-sm">Registration successful!</div>}
      </div>
    );
  };

  return (
    <AuthLayout
      title="register"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="w-full max-w-4xl  space-y-6">
        {renderFormFields()}
        <div className="w-full flex justify-between items-center mt-8">
          <div className="flex gap-2">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${i + 1 === formSection ? "bg-primary" : "bg-gray-300"}`} />
            ))}
          </div>
          {renderControlButtons()}
        </div>
        {isLoading && <div className="text-center text-primary">Memproses...</div>}
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
