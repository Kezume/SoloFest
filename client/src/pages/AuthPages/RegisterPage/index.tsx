import React, { useState, useEffect } from "react";
import Button from "../../../components/elements/Button";
import InputFormFragment from "../../../components/fragments/InputFormFragment";
import AuthLayout from "../../../components/layouts/AuthLayout";

const provinces = [
  { value: "jakarta", label: "DKI Jakarta" },
  { value: "jawa_barat", label: "Jawa Barat" },
  { value: "jawa_tengah", label: "Jawa Tengah" },
  { value: "jawa_timur", label: "Jawa Timur" },
  { value: "yogyakarta", label: "DI Yogyakarta" },
  // Add more provinces as needed
];

const citiesByProvince: Record<string, Array<{ value: string; label: string }>> = {
  jakarta: [
    { value: "jakarta_pusat", label: "Jakarta Pusat" },
    { value: "jakarta_utara", label: "Jakarta Utara" },
    { value: "jakarta_selatan", label: "Jakarta Selatan" },
    { value: "jakarta_timur", label: "Jakarta Timur" },
    { value: "jakarta_barat", label: "Jakarta Barat" },
  ],
  jawa_barat: [
    { value: "bandung", label: "Bandung" },
    { value: "bogor", label: "Bogor" },
    { value: "depok", label: "Depok" },
    { value: "bekasi", label: "Bekasi" },
    // Add more cities
  ],
  // Add more cities for other provinces
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  kon: string;
  fullName: string;
  birthDate: string;
  gender: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
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
    name: "",
    email: "",
    phone: "",
    password: "",
    kon: "",
    // Section 2
    fullName: "",
    birthDate: "",
    gender: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",

    // section 3
    otpCode: "",
  });

  // Add API related states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cityOptions, setCityOptions] = useState<Array<{ value: string; label: string }>>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "province") {
      setCityOptions(citiesByProvince[value] || []);
      setFormData((prev) => ({ ...prev, city: "" })); // Reset city when province changes
    }
  };

  const validateSection = (section: number): boolean => {
    setError(null);

    switch (section) {
      case 1:
        if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.kon) {
          setError("Semua field harus diisi");
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
        if (!formData.fullName || !formData.birthDate || !formData.gender || !formData.province || !formData.city || !formData.address || !formData.postalCode) {
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

      if (!validateSection(formSection)) {
        return;
      }

      // Save current section data
      const currentData = JSON.stringify(formData);
      localStorage.setItem(`registerStep${formSection}`, currentData);

      if (formSection < 3) {
        setFormSection((prev) => prev + 1);
      } else {
        // Final submission
        const allData = {
          ...JSON.parse(localStorage.getItem("registerStep1") || "{}"),
          ...JSON.parse(localStorage.getItem("registerStep2") || "{}"),
          ...JSON.parse(localStorage.getItem("registerStep3") || "{}"),
        };

        // Here you would make your API call
        // await apiRegister(allData);

        setIsSuccess(true);

        // Clean up stored data
        localStorage.removeItem("registerStep1");
        localStorage.removeItem("registerStep2");
        localStorage.removeItem("registerStep3");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  const formSections: Record<number, FormField[]> = {
    1: [
      { name: "name", label: "Nama Pengguna", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "phone", label: "No. Telp", type: "text" },
      { name: "password", label: "Password", type: "password" },
      { name: "kon", label: "Konfirmasi Password", type: "password" },
    ],
    2: [
      { name: "fullName", label: "Nama Lengkap" },
      { name: "birthDate", label: "Tanggal Lahir", type: "date" },
      {
        name: "gender",
        label: "Jenis Kelamin",
        type: "select",
        options: [
          { value: "male", label: "Laki-laki" },
          { value: "female", label: "Perempuan" },
        ],
      },
      {
        name: "province",
        label: "Provinsi",
        type: "select",
        options: provinces,
      },
      {
        name: "city",
        label: "Kota/Kabupaten",
        type: "select",
        options: cityOptions,
      },
      { name: "postalCode", label: "Kode Pos" },
      { name: "address", label: "Alamat Lengkap", type: "textarea" },
    ],

    3: [{ name: "otpCode", label: "OTP Code" }],
  };

  const renderControlButtons = () => {
    return (
      <div className="flex gap-4">
        {formSection > 1 && (
          <Button type="button" buttonStyle="bg-gray-500 py-2 px-6 rounded text-white" onClick={() => setFormSection((prev) => prev - 1)} disabled={isLoading}>
            Sebelumnya
          </Button>
        )}
        <Button type="button" buttonStyle="bg-primary py-2 px-6 rounded text-white" onClick={handleNextStep} disabled={isLoading}>
          {formSection === 3 ? "Selesai" : "Selanjutnya"}
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
            ${element.name === "address" ? "md:col-span-2" : ""}
            ${element.name === "fullName" ? "md:col-span-2" : ""}
            ${element.name === "birthDate" ? "md:col-span-2" : ""}
            ${element.name === "city" ? "md:col-span-2" : ""}
            ${element.name === "postalCode" ? "md:col-span-2" : ""}
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
      <div className="w-full max-w-4xl mx-auto space-y-6">
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
