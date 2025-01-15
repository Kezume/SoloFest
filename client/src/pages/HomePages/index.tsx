import MainLayout from "../../components/layouts/MainLayout";
import AboutSection from "./contents/AboutSection";
import Contact from "./contents/Contact";
import EventPopular from "./contents/EventPopular";
import EventSection from "./contents/EventSection";
import Slider from "./contents/Slider";
import TeamSection from "./contents/TeamSection";

const HomePage = () => {
  return (
    <MainLayout>
      <Slider />
      <main>
        <AboutSection />
        <TeamSection/>
        <EventPopular />
        <EventSection />
        <Contact />
      </main>
    </MainLayout>
  );
};

export default HomePage;
