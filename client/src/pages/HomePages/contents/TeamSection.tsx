import Title from "../../../components/elements/Title";

const teamItems = [
  {
    name: "Olyzano",
    role: "CEO of SoloFest",
    img: "images/kepin1.jpg",
  },
  {
    name: "Kiki Mahesa ",
    role: "Digital Marketing ",
    img: "images/kepin2.jpg",
  },
  {
    name: "Kezume",
    role: "Data Analyst",
    img: "images/kepin3.jpg",
  },
];

const TeamSection = () => {
  return (
    <section id="teamsection" className="team-section h-1/2 mobile:h-auto flex flex-col justify-center items-center gap-5 py-10">
      <div className="title">
        <Title>SoloFest Team</Title>
      </div>

      <div className="card-wrapper flex flex-wrap justify-center gap-20 my-10">
        {teamItems.map((item, index) => (
          <div className="card flex flex-col items-center gap-5" key={index}>
            <div className="card-img w-[10rem] h-[10rem] bg-gray-300 rounded-full overflow-hidden">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover object-cente" width={300} />
            </div>
            <div className="card-info flex flex-col items-center gap-5">
              <h3 className="text-2xl font-bold">{item.name}</h3>
              <p className="text-lg text-slate-400">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
