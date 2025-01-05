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
    <header>
      <SliderFragment>
        {SliderItems.map((item, index) => (
          <div className="slideBox w-full h-96 flex" key={index}>
            <div className="left-content w-full h-full flex flex-col justify-center px-40 gap-5">
              <Title>{item.title}</Title>
              <Paragraph>{item.description}</Paragraph>
              <div>
                <Button type="button">Read More</Button>
              </div>
            </div>
            <div className="right-content  w-full h-full">
              <img src={`/images/slider/${item.image}`} alt="ima" />
            </div>
          </div>
        ))}
      </SliderFragment>
    </header>
  );
};

export default Slider;
