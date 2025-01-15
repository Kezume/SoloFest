import { FaTicketAlt, FaUserCircle, FaQuestionCircle, FaEnvelope } from "react-icons/fa";
import MainLayout from "../../components/layouts/MainLayout";

const HelpPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Pusat Bantuan</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pembelian Tiket */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <FaTicketAlt className="text-2xl text-blue-500 mr-3" />
                <h2 className="text-xl font-semibold">Pembelian Tiket</h2>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li>• Pilih event yang Anda inginkan</li>
                <li>• Pilih kategori tiket yang tersedia</li>
                <li>• Isi formulir pemesanan dengan data yang valid</li>
                <li>• Lakukan pembayaran sesuai metode yang dipilih</li>
              </ul>
            </div>

            {/* Akun */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <FaUserCircle className="text-2xl text-blue-500 mr-3" />
                <h2 className="text-xl font-semibold">Informasi Akun</h2>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li>• Daftar akun menggunakan email valid</li>
                <li>• Lengkapi profil untuk kemudahan transaksi</li>
                <li>• Simpan tiket di menu riwayat pembelian</li>
                <li>• Jaga kerahasiaan akun Anda</li>
              </ul>
            </div>

            {/* FAQ */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <FaQuestionCircle className="text-2xl text-blue-500 mr-3" />
                <h2 className="text-xl font-semibold">FAQ</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <div>
                  <p className="font-medium">Bagaimana cara refund tiket?</p>
                  <p className="text-sm mt-1">Refund dapat dilakukan maksimal 3 hari sebelum event berlangsung.</p>
                </div>
                <div>
                  <p className="font-medium">Apakah tiket bisa ditransfer?</p>
                  <p className="text-sm mt-1">Ya, tiket dapat ditransfer ke pengguna lain melalui fitur transfer tiket.</p>
                </div>
              </div>
            </div>

            {/* Kontak */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <FaEnvelope className="text-2xl text-blue-500 mr-3" />
                <h2 className="text-xl font-semibold">Hubungi Kami</h2>
              </div>
              <div className="space-y-3 text-gray-600">
                <p>Solo, Central Java, Indonesia</p>
                <p>Email: info@solofest.com</p>
                <p>Phone: +62 123 456 789</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HelpPage;
