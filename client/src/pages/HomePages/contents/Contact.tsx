import React, { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section className=" text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Let's Connect</h2>
          <p className="mt-4 text-gray-400">Have questions? We'd love to hear from you.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Info Cards */}
          <div className="lg:w-1/3 space-y-6">
            <div className="group bg-gray-800 p-6 rounded-2xl hover:bg-gray-700 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="bg-blue-500/20 p-4 rounded-full">
                  <FiMapPin className="text-2xl text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Visit Us</h3>
                  <p className="text-gray-400 mt-1">Solo, Central Java, Indonesia</p>
                </div>
              </div>
            </div>

            <div className="group bg-gray-800 p-6 rounded-2xl hover:bg-gray-700 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="bg-purple-500/20 p-4 rounded-full">
                  <FiPhone className="text-2xl text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Call Us</h3>
                  <p className="text-gray-400 mt-1">+62 123 456 789</p>
                </div>
              </div>
            </div>

            <div className="group bg-gray-800 p-6 rounded-2xl hover:bg-gray-700 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="bg-pink-500/20 p-4 rounded-full">
                  <FiMail className="text-2xl text-pink-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Email Us</h3>
                  <p className="text-gray-400 mt-1">hello@solofest.com</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-4 mt-8">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
                <a key={index} href="#" className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-all duration-300">
                  <Icon className="text-xl hover:text-blue-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                  <input type="text" className="w-full bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Your Email</label>
                  <input type="email" className="w-full bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                <input type="text" className="w-full bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea rows={6} className="w-full bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
              </div>

              <button type="submit" className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2">
                <FiSend />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
