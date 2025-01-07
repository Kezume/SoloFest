import MainLayout from "../../components/layouts/MainLayout";
import Contact from "./contents/Contact";
import EventPopular from "./contents/EventPopular";
import EventSection from "./contents/EventSection";
import Slider from "./contents/Slider";

const HomePage = () => {
  return (
    <MainLayout>
      <Slider />
      <main>
        <EventPopular />
        <EventSection />
        <Contact />
      </main>
    </MainLayout>
  );
};

export default HomePage;
