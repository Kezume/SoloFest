import { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { Event } from "../../types/event";
import EventForm from "../../components/EventForm";

const EOPages = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const getAuthHeaders = () => ({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
    withCredentials: true,
  });

  const fetchEventTickets = async (eventId: number) => {
    try {
      const response = await axios.get(`https://solofest.site/server/public/api/events/${eventId}/tickets`, getAuthHeaders());
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching tickets for event ${eventId}:`, error);
      return [];
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get("https://solofest.site/server/public/api/events", getAuthHeaders());
      const eventsData = response.data.data;

      // Fetch tickets for each event
      const eventsWithTickets = await Promise.all(
        eventsData.map(async (event: Event) => {
          const tickets = await fetchEventTickets(event.id!);
          return { ...event, tickets };
        })
      );

      setEvents(eventsWithTickets);
    } catch (error: any) {
      setError(error.response?.data?.message || "Error fetching events");
      if (error.response?.status === 403) {
        // Handle unauthorized access
        localStorage.removeItem("jwtToken");
        window.location.href = "/login";
      }
    }
  };

  const handleCreate = async (eventData: Event) => {
    setIsLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", eventData.name);
      formData.append("description", eventData.description || "");
      formData.append("start_date", eventData.start_date);
      formData.append("end_date", eventData.end_date);
      formData.append("location", eventData.location);
      if (eventData.image) {
        formData.append("image", eventData.image);
      }

      // First create the event
      const eventResponse = await axios.post("https://solofest.site/server/public/api/events", formData, {
        ...getAuthHeaders(),
        headers: {
          ...getAuthHeaders().headers,
          "Content-Type": "multipart/form-data",
        },
      });

      // Then create tickets if they exist
      if (eventData.tickets && eventResponse.data.data.id) {
        const eventId = eventResponse.data.data.id;
        await Promise.all(eventData.tickets.map((ticket) => axios.post(`https://solofest.site/server/public/api/events/${eventId}/tickets`, ticket, getAuthHeaders())));
      }

      setSuccessMessage("Event and tickets created successfully!");
      await fetchEvents();
      setShowForm(false);
    } catch (error: any) {
      setError(error.response?.data?.message || "Error creating event");
      if (error.response?.status === 403) {
        localStorage.removeItem("jwtToken");
        window.location.href = "/login";
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleUpdate = async (id: number, eventData: Event) => {
    setIsLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", eventData.name);
      formData.append("description", eventData.description || "");
      formData.append("start_date", eventData.start_date);
      formData.append("end_date", eventData.end_date);
      formData.append("location", eventData.location);
      formData.append("_method", "POST");
      if (eventData.image) {
        formData.append("image", eventData.image);
      }

      await axios.post(`https://solofest.site/server/public/api/events/${id}`, formData, {
        ...getAuthHeaders(),
        headers: {
          ...getAuthHeaders().headers,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("Event updated successfully!");
      await fetchEvents();
      setIsEditing(false);
      setSelectedEvent(undefined);
    } catch (error: any) {
      setError(error.response?.data?.message || "Error updating event");
      if (error.response?.status === 403) {
        localStorage.removeItem("jwtToken");
        window.location.href = "/login";
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      // Use axios.delete with the proper headers and request config
      await axios.delete(`https://solofest.site/server/public/api/events/${id}`, {
        ...getAuthHeaders(),
        data: { id }, // Send id in request body
      });

      setSuccessMessage("Event deleted successfully!");
      await fetchEvents();
    } catch (error: any) {
      setError(error.response?.data?.message || "Error deleting event");
      if (error.response?.status === 403) {
        localStorage.removeItem("jwtToken");
        window.location.href = "/login";
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        {/* Messages */}
        {error && <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded animate-fade-in">{error}</div>}
        {successMessage && <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded animate-fade-in">{successMessage}</div>}

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                <span className="text-gray-700">Processing...</span>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Event Management</h1>
          <button
            onClick={() => setShowForm(true)}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg 
                     transition duration-200 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Event
          </button>
        </div>

        {/* Form Modals */}
        {(showForm || (isEditing && selectedEvent)) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">{isEditing ? "Edit Event" : "Create New Event"}</h2>
                <EventForm
                  event={selectedEvent}
                  onSubmit={isEditing ? (data) => handleUpdate(selectedEvent!.id!, data) : handleCreate}
                  onCancel={() => {
                    setShowForm(false);
                    setIsEditing(false);
                    setSelectedEvent(undefined);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="relative">
                {event.image && <img src={`https://solofest.site/server/public/storage/${event.image}`} alt={event.name} className="w-full h-48 object-cover rounded-t-lg" />}
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedEvent(event);
                      setIsEditing(true);
                    }}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button onClick={() => event.id && handleDelete(event.id)} className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.name}</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(event.start_date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Tickets</h4>
                  {event.tickets && event.tickets.length > 0 ? (
                    <div className="space-y-2">
                      {event.tickets.map((ticket, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                          <span className="font-medium text-gray-700">{ticket.type}</span>
                          <div className="text-right">
                            <div className="text-blue-600 font-semibold">Rp {ticket.price.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">{ticket.quantity} available</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No tickets available</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EOPages;
