import { useState } from "react";
import EventCard from "../../../components/fragments/EventCard";

interface FilterState {
  location: string;
  category: string;
  date: string;
  ageRestriction: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  ageRestriction: string;
  image: string;
  price: string; // Changed from number to string
  place: string;
}

const EventSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    location: "",
    category: "",
    date: "",
    ageRestriction: "",
  });

  const categories = ["Kebudayaan dan Pendidikan", "Musik", "Kuliner"];
  const ageOptions = ["Semua Umur", "13+", "17+", "21+"];
  const locations = ["Solo (Surakarta)", "Karanganyar", "Sukoharjo", "Wonogiri", "Sragen", "Klaten", "Boyolali", "Kartasura", "Grogol", "Palur", "Colomadu"];

  // Dummy data for events
  const events: Event[] = [
    {
      id: 1,
      title: "Festival Keraton Surakarta",
      description: "Pameran budaya dan pertunjukan seni tradisional Jawa",
      date: "2024-02-15",
      time: "09:00",
      location: "solo",
      place: "Keraton Kasunanan Surakarta",
      category: "kebudayaan dan pendidikan",
      ageRestriction: "semua umur",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1000&auto=format&fit=crop",
      price: "50.000", // Changed to string format
    },
    {
      id: 2,
      title: "Solo Jazz Festival",
      description: "Konser jazz dengan musisi lokal dan internasional",
      date: "2024-02-20",
      time: "19:00",
      location: "solo",
      category: "musik",
      place: "Keraton Kasunanan Surakarta",
      ageRestriction: "13+",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1000&auto=format&fit=crop",

      price: "150.000",
    },
    {
      id: 3,
      title: "Festival Kuliner Nusantara",
      description: "Pameran dan bazar makanan tradisional Indonesia",
      date: "2024-02-25",
      time: "10:00",
      location: "sukoharjo",
      category: "kuliner",
      place: "Keraton Kasunanan Surakarta",
      ageRestriction: "semua umur",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1000&auto=format&fit=crop",

      price: "25.000",
    },
    {
      id: 4,
      title: "Workshop Batik Solo",
      description: "Belajar membuat batik dengan pengrajin profesional",
      date: "2024-03-01",
      time: "13:00",
      location: "solo",
      place: "Keraton Kasunanan Surakarta",
      category: "kebudayaan dan pendidikan",
      ageRestriction: "13+",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1000&auto=format&fit=crop",

      price: "100.000",
    },
    {
      id: 5,
      title: "Rock in Solo",
      description: "Festival musik rock terbesar di Solo",
      date: "2024-03-05",
      time: "18:00",
      place: "Keraton Kasunanan Surakarta",

      location: "solo",
      category: "musik",
      ageRestriction: "17+",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1000&auto=format&fit=crop",
      price: "200.000",
    },
    {
      id: 6,
      title: "Rock in Solo",
      description: "Festival musik rock terbesar di Solo",
      date: "2024-03-05",
      time: "18:00",
      place: "Keraton Kasunanan Surakarta",

      location: "solo",
      category: "musik",
      ageRestriction: "17+",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1000&auto=format&fit=crop",
      price: "200.000",
    },
    {
      id: 7,
      title: "Rock in Solo",
      description: "Festival musik rock terbesar di Solo",
      date: "2024-03-05",
      time: "18:00",
      place: "Keraton Kasunanan Surakarta",

      location: "solo",
      category: "musik",
      ageRestriction: "17+",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1000&auto=format&fit=crop",
      price: "200.000",
    },

    {
      id: 8,
      title: "Rock in Solo",
      description: "Festival musik rock terbesar di Solo",
      date: "2024-03-05",
      time: "18:00",
      location: "solo",
      place: "Keraton Kasunanan Surakarta",

      category: "musik",
      ageRestriction: "17+",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1000&auto=format&fit=crop",
      price: "200.000",
    },
  ];

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="mb-6">
        <input type="text" placeholder="Cari event..." className="w-full p-2 border rounded-lg" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <select className="p-2 border rounded-lg" value={filters.location} onChange={(e) => handleFilterChange("location", e.target.value)}>
          <option value="">Pilih Lokasi</option>
          {locations.map((location) => (
            <option key={location} value={location.toLowerCase()}>
              {location}
            </option>
          ))}
        </select>

        <select className="p-2 border rounded-lg" value={filters.category} onChange={(e) => handleFilterChange("category", e.target.value)}>
          <option value="">Pilih Kategori</option>
          {categories.map((category) => (
            <option key={category} value={category.toLowerCase()}>
              {category}
            </option>
          ))}
        </select>

        <input type="date" className="p-2 border rounded-lg" value={filters.date} onChange={(e) => handleFilterChange("date", e.target.value)} />

        <select className="p-2 border rounded-lg" value={filters.ageRestriction} onChange={(e) => handleFilterChange("ageRestriction", e.target.value)}>
          <option value="">Batasan Umur</option>
          {ageOptions.map((age) => (
            <option key={age} value={age.toLowerCase()}>
              {age}
            </option>
          ))}
        </select>
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </div>
  );
};

export default EventSection;
