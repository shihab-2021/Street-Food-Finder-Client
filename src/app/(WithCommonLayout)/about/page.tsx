import React from "react";
import SlideImg5 from "@/assets/hero5.jpg";
import { Utensils, Map, Award } from "lucide-react";
import Image from "next/image";

const AboutUs: React.FC = () => {
  return (
    <div className="bg-white min-h-screen font-sansita">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 to-yellow-500 text-white pt-24 pb-40 md:pb-52">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Street Food
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Connecting food lovers with authentic street food experiences
              around the world
            </p>
          </div>
        </div>
        <div className="absolute -bottom-1 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,176C384,192,480,192,576,170.7C672,149,768,107,864,90.7C960,75,1056,85,1152,85.3C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Street Food started in 2023 with a simple mission: to celebrate
                the diverse world of street food and connect food enthusiasts
                with authentic culinary experiences.
              </p>
              <p>
                Our founder, a passionate street food lover, often struggled to
                find reliable information about local food vendors while
                traveling. This frustration sparked the idea for a platform
                dedicated solely to street food discovery.
              </p>
              <p>
                Today, Street Food has grown into a vibrant community of food
                lovers and vendors, mapping out delicious corners of cities
                worldwide and sharing the stories behind every dish.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-w-3 aspect-h-2 rounded-xl overflow-hidden shadow-xl">
              <Image
                height={500}
                width={500}
                src={SlideImg5}
                alt="Street food vendors"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-yellow-400 -z-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-orange-400 -z-10"></div>
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              We{"'"}re on a mission to preserve and promote street food culture
              by connecting vendors with food lovers and providing a platform
              for authentic culinary experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Utensils className="h-10 w-10 text-orange-500" />,
                title: "Celebrate Food Diversity",
                description:
                  "We showcase the incredible diversity of street food from around the world, highlighting unique flavors and traditions.",
              },
              {
                icon: <Map className="h-10 w-10 text-orange-500" />,
                title: "Connect Food Lovers",
                description:
                  "We bring together a community passionate about discovering authentic street food experiences in their city or while traveling.",
              },
              {
                icon: <Award className="h-10 w-10 text-orange-500" />,
                title: "Support Local Vendors",
                description:
                  "We help street food vendors increase their visibility and connect with new customers who appreciate their craft.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-center">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We{"'"}re a passionate group of food enthusiasts committed to
            connecting people with authentic street food experiences
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {[
            {
              name: "S. M. Mubasshir AL Kasshaf",
              role: "Founder & CEO",
              image: "/api/placeholder/300/300",
              bio: "Street food enthusiast with a passion for discovering hidden culinary gems.",
            },
            {
              name: "Shajibul Alam Shihab",
              role: "Lead Developer",
              image: "/api/placeholder/300/300",
              bio: "Tech wizard making sure our platform runs smoothly for all users.",
            },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-orange-500 mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Numbers Section */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10k+", label: "Street Food Spots" },
              { number: "150+", label: "Cities Covered" },
              { number: "50k+", label: "Active Users" },
              { number: "100k+", label: "Reviews Shared" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Join Us Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Join Our Community
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Become part of our mission to celebrate street food culture around
            the world. Share your discoveries, connect with fellow food
            enthusiasts, and support local vendors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium">
              Sign Up Now
            </button>
            <button className="bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3 rounded-full font-medium">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
