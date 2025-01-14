import React from "react";
import { motion } from "framer-motion";
import { FaCalendar, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

interface EventCardProps {
  name: string;
  start_date: string;
  location: string;
  place: string;
  image_url: string;
  id: number;
}

const EventCard: React.FC<EventCardProps> = ({ name, start_date, location, image_url, id }) => {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10" />
        <img src={image_url} alt={name} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
      </div>

      <div className="p-5 space-y-4">
        <div className="w-full h-12">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors">{name}</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-gray-600 hover:text-blue-500 transition-colors">
            <FaCalendar className="w-4 h-4 mr-3 text-blue-500" />
            <span className="text-sm">{start_date}</span>
          </div>

          <div className="flex items-center text-gray-600 hover:text-blue-500 transition-colors">
            <FaMapMarkerAlt className="w-4 h-4 mr-3 text-blue-500" />
            <span className="text-sm line-clamp-1">{location}</span>
          </div>
        </div>

        <Link
          to={`/event/${id}`}
          className="block w-full mt-4 bg-blue-600 text-white text-center py-3 px-4 rounded-xl 
                   hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 
                   font-medium shadow-md hover:shadow-lg"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default EventCard;
