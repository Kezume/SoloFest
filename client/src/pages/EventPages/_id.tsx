import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Event {
  id: number;
  name: string;
  description: string;
  start_date: string;
  time: string;
  location: string;
  category: string;
  ageRestriction: string;
  image_url: string;
  price: number;
}

interface EventTicket {
  id: number;
  event_id: number;
  type: string;
  description: string;
  price: string;
  quantity: number;
  status: string;
}

// Add interface for JWT token payload
interface JWTPayload {
  sub: number;
}

const SinglePageEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [eventTickets, setEventTickets] = useState<EventTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<EventTicket | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const resetPurchaseForm = () => {
    setPurchaseSuccess(false);
    setPurchaseError(null);
    setQuantity(1);
  };

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://solofest.site/server/public/api/events/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        });
        if (!response.data.data) {
          navigate("/404");
          return;
        }
        setEvent(response.data.data);
      } catch (err) {
        // Redirect to 404 page if event not found
        navigate("/404");
        setError("Failed to load event details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetail();
  }, [id, navigate]);

  const fetchEventDetailTicket = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://solofest.site/server/public/api/events/${id}/tickets`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      setEventTickets(response.data.data);
    } catch (err) {
      setError("Failed to load ticket details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventDetailTicket();
  }, [id]);

  const getLowestTicketPrice = () => {
    if (!eventTickets || eventTickets.length === 0) return "0";
    const prices = eventTickets.map((ticket) => parseInt(ticket.price));
    return Math.min(...prices).toString();
  };

  const getUserIdFromToken = (): number | null => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      toast.error("Please login first");
      return null;
    }

    try {
      const decoded = jwtDecode<JWTPayload>(token);
      if (!decoded.sub) {
        toast.error("Invalid user session");
        return null;
      }
      return decoded.sub;
    } catch (error) {
      console.error("Error decoding token:", error);
      toast.error("Session expired. Please login again");
      localStorage.removeItem("jwtToken"); // Clear invalid token
      return null;
    }
  };

  const handlePurchaseTicket = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get userId first before proceeding
    const userId = getUserIdFromToken();
    if (!userId) {
      setPurchaseError("Please login to purchase tickets");
      setTimeout(() => {
        navigate("/login"); // Redirect to login page
      }, 2000);
      return;
    }

    if (!selectedTicket || !quantity) {
      setPurchaseError("Please select quantity");
      return;
    }

    try {
      setIsPurchasing(true);
      setPurchaseError(null);

      const purchaseData = {
        user_id: userId,
        quantity: quantity,
        ticket_id: selectedTicket.id,
      };

      console.log("Sending purchase data:", purchaseData); // Debug log

      const response = await axios.post(`https://solofest.site/server/public/api/tickets/${selectedTicket.id}/purchase`, purchaseData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        // Store purchase info before redirect
        sessionStorage.setItem(
          "lastPurchaseState",
          JSON.stringify({
            quantity: quantity,
            userId: userId, // Store userId in session
          })
        );
      }
      const snapToken = response.data.data.snap_token;
      // Redirect to Midtrans payment page
      window.open(`https://app.sandbox.midtrans.com/snap/v2/vtweb/${snapToken}`, "_blank");
    } catch (err: any) {
      console.error("Purchase error:", err);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || "Failed to purchase ticket";

      if (err.response?.status === 401) {
        // Handle unauthorized error
        localStorage.removeItem("jwtToken");
        navigate("/login");
        toast.error("Session expired. Please login again");
      } else {
        setPurchaseError(errorMessage);
        toast.error(errorMessage);
      }
    } finally {
      setIsPurchasing(false);
    }
  };

  useEffect(() => {
    const lastPurchase = sessionStorage.getItem("lastPurchaseState");
    if (lastPurchase) {
      const purchaseData = JSON.parse(lastPurchase);
      // Only refresh if the purchase was made in the last 5 minutes
      if (new Date().getTime() - purchaseData.timestamp < 300000) {
        fetchEventDetailTicket();
        sessionStorage.removeItem("lastPurchaseState");
      }
    }
  }, []);

  const handleOpenModal = () => {
    // Set the first available ticket as default
    const firstAvailableTicket = eventTickets.find((ticket) => ticket.quantity > 0);
    setSelectedTicket(firstAvailableTicket || eventTickets[0]);
    setIsModalOpen(true);
  };

  const PurchaseModal = () => {
    if (!selectedTicket) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Purchase Ticket</h2>
            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>

          <form onSubmit={handlePurchaseTicket} className="space-y-4">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Select Ticket Type</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={selectedTicket.id}
                onChange={(e) => {
                  const ticket = eventTickets.find((t) => t.id === parseInt(e.target.value));
                  setSelectedTicket(ticket || null);
                }}
              >
                {eventTickets.map((ticket) => (
                  <option key={ticket.id} value={ticket.id} disabled={ticket.quantity === 0}>
                    {ticket.type} - Rp {parseInt(ticket.price).toLocaleString("id-ID")}
                    {ticket.quantity === 0 ? " (Sold Out)" : ` (${ticket.quantity} left)`}
                  </option>
                ))}
              </select>

              <div className="mt-2">
                <div className="text-sm text-gray-600">
                  <p className="font-medium">Ticket Details:</p>
                  <p>{selectedTicket.description}</p>
                  <p className="mt-1 font-semibold text-blue-600">Price: Rp {parseInt(selectedTicket.price).toLocaleString("id-ID")}</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))} className="p-2 border rounded-lg hover:bg-gray-50">
                  -
                </button>
                <input type="number" min="1" max={selectedTicket.quantity} value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} className="w-20 text-center px-3 py-2 border rounded-lg" />
                <button type="button" onClick={() => setQuantity((prev) => Math.min(selectedTicket.quantity, prev + 1))} className="p-2 border rounded-lg hover:bg-gray-50">
                  +
                </button>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>Rp {(parseInt(selectedTicket.price) * quantity).toLocaleString("id-ID")}</span>
              </div>
            </div>

            {purchaseSuccess && (
              <div className="text-green-500 text-sm font-medium p-3 bg-green-50 rounded-lg flex justify-between items-center">
                <span>Ticket purchase successful!</span>
                <button type="button" onClick={resetPurchaseForm} className="text-green-700 text-xs underline">
                  Purchase More
                </button>
              </div>
            )}

            {purchaseError && <div className="text-red-500 text-sm p-3 bg-red-50 rounded-lg">{purchaseError}</div>}

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={selectedTicket.quantity === 0 || isPurchasing}
                className={`flex-1 py-2 rounded-lg ${selectedTicket.quantity === 0 || isPurchasing ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
              >
                {isPurchasing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : purchaseSuccess ? (
                  "Purchase More"
                ) : (
                  "Confirm Purchase"
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  resetPurchaseForm();
                }}
                className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!event) return <div className="min-h-screen flex items-center justify-center">Event not found</div>;

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Image */}
        <div className="relative h-[50vh] w-full">
          <div className="absolute top-4 left-4 z-10">
            <button onClick={() => navigate(-1)} className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white transition-all">
              <span>←</span> Kembali
            </button>
          </div>
          <img src={event.image_url} alt={event.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{event.category}</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{event.ageRestriction}</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.name}</h1>

                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-2">Tentang Event</h3>
                  <p className="text-gray-600 whitespace-pre-line">{event.description}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Lokasi Event</h3>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600">{event.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-lg sticky top-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tanggal & Waktu</p>
                      <p className="font-semibold">{event.start_date}</p>
                      <p className="font-semibold">{event.time}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 mb-2">Harga Tiket</p>
                    <p className="text-3xl font-bold text-blue-600">{getLowestTicketPrice() === "0" ? "Gratis" : `Mulai dari Rp ${parseInt(getLowestTicketPrice()).toLocaleString("id-ID")}`}</p>
                    {eventTickets.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <div className="space-y-2">
                          {eventTickets.map((ticket) => (
                            <div key={ticket.id} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                              <div className="flex-1">
                                <p className="font-medium">{ticket.type}</p>
                                <p className="text-gray-600">Rp {parseInt(ticket.price).toLocaleString("id-ID")}</p>
                                <p className="text-sm text-gray-500">{ticket.quantity === 0 ? "Sold Out" : `${ticket.quantity} tickets available`}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={handleOpenModal}
                          disabled={eventTickets.every((ticket) => ticket.quantity === 0)}
                          className={`w-full py-3 rounded-lg font-semibold mt-4
                            ${eventTickets.every((ticket) => ticket.quantity === 0) ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                        >
                          {eventTickets.every((ticket) => ticket.quantity === 0) ? "Sold Out" : "Buy Ticket"}
                        </button>
                      </div>
                    )}
                  </div>

                  <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">Bagikan Event</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && <PurchaseModal />}
      </div>
      <ToastContainer />
    </>
  );
};

export default SinglePageEvent;
