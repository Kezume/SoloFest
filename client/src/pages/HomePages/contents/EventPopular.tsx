import EventCard from "../../../components/fragments/EventCard";

const EventPopular = () => {
  const popularEvents = [
    {
      id: 1,
      title: "Solo Jazz Festival 2024",
      date: "March 15, 2024",
      location: "Solo",
      place: "Balai Soedjatmoko Solo",
      price: "Rp 150.000",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Solo Culinary Festival",
      date: "April 20, 2024",
      location: "Solo",
      place: "Sriwedari Park",
      price: "Rp 75.000",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Javanese Art Exhibition",
      date: "May 5, 2024",
      location: "Solo",
      place: "Mangkunegaran Palace",
      price: "Rp 100.000",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Popular Events</h2>
        <p className="text-gray-600 text-center mb-12">Temukan acara yang paling dinantikan di Solo</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularEvents.map((event) => (
            <EventCard key={event.id} title={event.title} date={event.date} location={event.location} place={event.place} price={event.price} image={event.image} onBookClick={() => console.log(`Booking event: ${event.title}`)} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventPopular;
