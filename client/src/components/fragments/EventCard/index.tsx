import React from "react";
import { motion } from "framer-motion";
import { FaCalendar, FaMapMarkerAlt, FaTicketAlt } from "react-icons/fa";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  place: string;
  price: string;
  image: string;
  onBookClick?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ title, date, location, price, image, onBookClick, place }) => {
  return (
    <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>

        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <FaCalendar className="mr-2" />
            <span>{date}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2" />
            <span>
              {location} ({place})
            </span>
          </div>

          <div className="flex items-center text-gray-600">
            <FaTicketAlt className="mr-2" />
            <span>{price}</span>
          </div>
        </div>

        <button onClick={onBookClick} className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
          Book Now
        </button>
      </div>
    </motion.div>
  );
};

export default EventCard;
