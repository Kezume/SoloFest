import Paragraph from "../../../components/elements/paragraph";

const AboutSection = () => {
  return (
    <section className="about-section py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="content-inner flex flex-col justify-center space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary ">Apa itu SoloFest?</h1>
          <Paragraph className="text-base md:text-lg leading-relaxed text-slate-700">
            SoloFest adalah platform penyedia informasi event berbasis web yang dirancang untuk mendukung pengelolaan acara di Kota Solo dan sekitarnya. Kami hadir untuk mempermudah masyarakat dalam menemukan event terkini serta membantu
            penyelenggara acara mempromosikan kegiatan mereka secara lebih efektif.
          </Paragraph>
        </div>
        <div className="content-img flex justify-center items-center">
          <div className="w-full max-w-md flex items-center justify-center aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm shadow-xl transform hover:scale-105 transition-transform duration-300">
            <img src="images/logo.png" alt="logo" width={200} />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="content-img flex justify-center items-center">
          <div className="w-full flex items-center justify-center max-w-md aspect-square rounded-2xl bg-gradient-to-bl from-secondary/10 to-primary/10 backdrop-blur-sm shadow-xl transform hover:scale-105 transition-transform duration-300">
            <img src="images/about-2.png" alt="logo" width={300} />
          </div>
        </div>
        <div className="content-inner flex flex-col justify-center space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary ">Kenapa Harus Memilih SoloFest?</h1>
          <Paragraph className="text-base md:text-lg leading-relaxed text-slate-700">
            SoloFest adalah platform penyedia informasi event berbasis web yang dirancang untuk mendukung pengelolaan acara di Kota Solo dan sekitarnya. Kami hadir untuk mempermudah masyarakat dalam menemukan event terkini serta membantu
            penyelenggara acara mempromosikan kegiatan mereka secara lebih efektif.
          </Paragraph>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
