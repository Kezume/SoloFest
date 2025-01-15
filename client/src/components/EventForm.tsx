import { useState, useEffect } from "react";
import { Event, Ticket } from "../types/event";

interface EventFormProps {
  event?: Event;
  onSubmit: (eventData: Event) => void;
  onCancel: () => void;
}

const EventForm = ({ event, onSubmit, onCancel }: EventFormProps) => {
  const [formData, setFormData] = useState<Event>({
    name: "",
    description: null,
    start_date: "",
    end_date: "",
    location: "",
    image: null,
    price: 0,
    tickets: [{ type: "", price: 0, quantity: 0 }],
  });

  useEffect(() => {
    if (event) {
      setFormData(event);
    }
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTicketChange = (index: number, field: keyof Ticket, value: string | number) => {
    const newTickets = [...(formData.tickets || [])];
    newTickets[index] = {
      ...newTickets[index],
      [field]: field === "price" || field === "quantity" ? Number(value) : value,
    };
    setFormData({ ...formData, tickets: newTickets });
  };

  const addTicket = () => {
    setFormData({
      ...formData,
      tickets: [...(formData.tickets || []), { type: "", price: 0, quantity: 0 }],
    });
  };

  const removeTicket = (index: number) => {
    const newTickets = formData.tickets?.filter((_, i) => i !== index);
    setFormData({ ...formData, tickets: newTickets });
  };

  const handleUpdateTicket = async (ticketId: string, index: number) => {
    try {
      const eventId = event?.id;
      const token = localStorage.getItem("jwtToken");

      if (!eventId || !ticketId) {
        alert("Missing event or ticket information");
        return;
      }

      if (!token) {
        alert("You must be logged in to update tickets");
        return;
      }

      const response = await fetch(`https://solofest.site/server/public/api/events/${eventId}/tickets/${ticketId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Fixed authorization header
        },
        body: JSON.stringify(formData.tickets?.[index]),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update ticket");
      }

      alert("Ticket updated successfully");
    } catch (error) {
      console.error("Error updating ticket:", error);
      alert(error instanceof Error ? error.message : "Failed to update ticket");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="space-y-6">
        {/* Event Basic Information */}
        <div className="border-b pb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Event Information</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Event Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Start Date *</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">End Date *</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                required
              />
            </div>
          </div>
        </div>

        {/* Description & Image Section */}
        <div className="border-b pb-6">
          <div className="space-y-2 mb-6">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Event Image</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                </div>
                <input
                  type="file"
                  name="image"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setFormData({ ...formData, image: file });
                  }}
                  accept="image/*"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Tickets Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Ticket Types</h2>
            <button type="button" onClick={addTicket} className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              <span className="mr-2">+</span> Add Ticket Type
            </button>
          </div>

          <div className="space-y-4">
            {formData.tickets?.map((ticket, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Type</label>
                    <input
                      type="text"
                      value={ticket.type}
                      onChange={(e) => handleTicketChange(index, "type", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="number"
                      value={ticket.price}
                      onChange={(e) => handleTicketChange(index, "price", Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Quantity</label>
                    <input
                      type="number"
                      value={ticket.quantity}
                      onChange={(e) => handleTicketChange(index, "quantity", Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  {event && ticket.id && (
                    <button key={ticket.id} type="button" onClick={() => handleUpdateTicket(ticket.id!, index)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                      Update Ticket
                    </button>
                  )}
                  {(formData.tickets?.length ?? 0) > 1 && (
                    <button type="button" onClick={() => removeTicket(index)} className="bg-red-500 text-white px-2 py-1 rounded">
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            {event ? "Update" : "Create"} Event
          </button>
        </div>
      </div>
    </form>
  );
};

export default EventForm;
