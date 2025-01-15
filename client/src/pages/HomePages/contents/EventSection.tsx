import { useEffect, useState } from "react";
import EventCard from "../../../components/fragments/EventCard";
import axios, { AxiosError } from "axios";

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  selesai_date: string;
  time: string;
  location: string;
  category: string;
  ageRestriction: string;

  image: string;
  price: string; // Changed from number to string
  place: string;
}

const EventSection = () => {
  const [event, setEvent] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async (retryCount = 0) => {
    try {
      const response = await axios("https://solofest.site/server/public/api/events", {
        method: "GET",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      setEvent(response.data.data);
      setError(null);
    } catch (err: unknown) {
      if ((err as AxiosError)?.response?.status === 429 && retryCount < 3) {
        // Wait for 2 seconds before retrying
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return fetchEvents(retryCount + 1);
      }
      setError("Failed to load events. Please try again later.");
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = event.filter((evt) => {
    const matchesSearch = evt.name.toLowerCase().includes(searchQuery.toLowerCase()) || evt.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          {error}
        </div>
      )}
      {/* Search Bar */}
      <div className="mb-6">
        <input type="text" placeholder="Cari event..." className="w-full p-2 border rounded-lg" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => <EventCard key={index} start_date={event.date} image_url={event.image} {...event} />)
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">Tidak ada event yang ditemukan</div>
        )}
      </div>
    </div>
  );
};

export default EventSection;
