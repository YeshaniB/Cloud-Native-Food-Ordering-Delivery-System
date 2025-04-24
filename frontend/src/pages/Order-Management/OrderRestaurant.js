import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { Divider } from 'primereact/divider';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import pizzahut from "./Images/Pizzahut.jpg";
import tacoBell from './Images/Taco-Bell.png';
import burgerKing from './Images/Burger King.png';

const restaurants = [
  {
    id: 'res1',
    name: 'Pizza Hut',
    image: pizzahut,
    description: 'Spicy and flavorful Indian dishes.',
  },
  {
    id: 'res2',
    name: 'Taco Bell',
    image: tacoBell,
    description: 'Mexican street food and tacos.',
  },
  {
    id: 'res3',
    name: 'Burger King',
    image: burgerKing,
    description: 'Traditional Chinese meals and fast service.',
  },
];

const RestaurantList = () => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/foodDetails/${id}`);
  };

  return (
    <div className="p-mt-6 p-px-3 md:p-px-6">
      <div className="text-center mb-5">
        <h2 className="text-4xl font-bold text-primary">
          🍔 Select a Restaurant
        </h2>
        <p className="text-gray-500">Explore a variety of cuisines</p>
      </div>

      <div className="flex flex-column align-items-center gap-5">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} style={{ maxWidth: '900px', width: '100%' }}>
            <Card className="shadow-3 border-round-3xl custom-hover">
              <div className="flex flex-column md:flex-row align-items-center">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="border-round-left md:w-20rem w-full"
                  imageStyle={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="p-4 flex flex-column justify-content-between w-full">
                  <div>
                    <h3 className="m-0 text-primary">{restaurant.name}</h3>
                    <Divider />
                    <p className="m-0 text-gray-600">{restaurant.description}</p>
                  </div>
                  <Button
                    label="View Menu"
                    icon="pi pi-arrow-right"
                    className="p-button-rounded p-button-outlined mt-3"
                    onClick={() => handleClick(restaurant.id)}
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
      `}</style>
    </div>
  );
};

export default RestaurantList;




