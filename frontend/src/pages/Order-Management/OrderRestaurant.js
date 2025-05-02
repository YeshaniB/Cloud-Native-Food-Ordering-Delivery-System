import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { Divider } from 'primereact/divider';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const RestaurantList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  // Fetch restaurant data from backend
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://localhost:8082/api/restaurants');
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleClick = (id) => {
    navigate(`/foodDetails/${id}`);
  };

  // Filter restaurants by search query
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.restaurantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-mt-6 p-px-3 md:p-px-6">
      <Header /><br /><br /><br /><br /><br />
      <div className="text-center mb-5">
        <h2 className="text-4xl font-bold text-primary">
          Available Restaurants
        </h2>
      </div>

      {/* Search input */}
      <div className="flex justify-content-center mb-5">
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-inputtext p-component p-3 border-round w-full md:w-6"
        />
      </div>

      <div className="flex flex-column align-items-center gap-5">
        {filteredRestaurants.map((restaurant) => (
          <div key={restaurant.userId} style={{ maxWidth: '900px', width: '100%' }}>
            <Card className="shadow-3 border-round-3xl custom-hover">
              <div className="flex flex-column md:flex-row align-items-center">
                <Image
                  src={restaurant.logoUrl}
                  alt={restaurant.name}
                  className="border-round-left md:w-20rem w-full"
                  imageStyle={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="p-4 flex flex-column justify-content-between w-full">
                  <div>
                    <h3 className="m-0 text-primary">{restaurant.restaurantName}</h3>
                    <p className="m-0 text-gray-600">{restaurant.description}</p>
                    <Divider />
                    <p className="m-0 text-gray-600">{restaurant.restaurantLocation}</p>
                    <p className="m-0 text-gray-600">{restaurant.restaurantContact}</p>
                  </div>
                  <Button
                    label="View Menu"
                    icon="pi pi-arrow-right"
                    className="p-button-rounded p-button-outlined mt-3"
                    onClick={() => handleClick(restaurant.userId)}
                  />
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Smooth hover effect */}
      <style jsx="true">{`
        .custom-hover {
          transition: box-shadow 0.3s ease, transform 0.2s ease;
        }

        .custom-hover:hover {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
      `}</style><br /><br /><br /><br /><br />

      <Footer />
    </div>
  );
};

export default RestaurantList;






