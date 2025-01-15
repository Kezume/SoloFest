import SliderFragment from "../../../components/fragments/SliderFragments";
import Title from "../../../components/elements/Title";
import Paragraph from "../../../components/elements/paragraph";
import Button from "../../../components/elements/Button";

const Slider = () => {
  const SliderItems = [
    {
      title: "Grebeg Sudiro",
      description: "Perayaan akulturasi budaya China dan Jawa dalam rangka menyambut Tahun Baru Imlek, dengan kirab gunungan kue keranjang dan pertunjukan barongsai di kawasan Pasar Gede.",
      image: "slider-1.png",
    },
    {
      title: "Grebeg Sudiro 1",
      description: "Perayaan akulturasi budaya China dan Jawa dalam rangka menyambut Tahun Baru Imlek, dengan kirab gunungan kue keranjang dan pertunjukan barongsai di kawasan Pasar Gede.",
      image: "slider-1.png",
    },
    {
      title: "Grebeg Sudiro 2",
      description: "Perayaan akulturasi budaya China dan Jawa dalam rangka menyambut Tahun Baru Imlek, dengan kirab gunungan kue keranjang dan pertunjukan barongsai di kawasan Pasar Gede.",
      image: "slider-1.png",
    },
  ];

  return (
    <header className="w-full overflow-hidden">
      <SliderFragment>
        {SliderItems.map((item, index) => (
          <div className="slideBox w-full min-h-[24rem] flex flex-col md:flex-row" key={index}>
            <div className="left-content w-full md:w-1/2 h-full flex flex-col justify-center gap-5 p-4 md:p-8">
              <Title titleStyle="text-2xl md:text-4xl">{item.title}</Title>
              <Paragraph className="text-sm md:text-base">{item.description}</Paragraph>
              <div>
                <Button type="button">Read More</Button>
              </div>
            </div>
            <div className="right-content w-full md:w-1/2 h-full">
              <img src={`/images/slider/${item.image}`} alt={item.title} className="w-full h-full object-cover rounded-md" />
            </div>
          </div>
        ))}
      </SliderFragment>
    </header>
  );
};

export default Slider;
