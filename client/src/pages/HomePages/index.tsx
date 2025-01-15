import MainLayout from "../../components/layouts/MainLayout";
import AboutSection from "./contents/AboutSection";
import Contact from "./contents/Contact";
import EventSection from "./contents/EventSection";
import Slider from "./contents/Slider";
import TeamSection from "./contents/TeamSection";

const HomePage = () => {
  return (
    <MainLayout>
      <Slider />
      <main>
        <AboutSection />
        <TeamSection />
        <EventSection />
        <Contact />
      </main>
    </MainLayout>
  );
};

export default HomePage;
