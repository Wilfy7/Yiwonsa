import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./RestaurantStyles.scss";
import { Link, useNavigate } from "react-router-dom"

interface Restaurant {
    _id: string;
    name: string;
    email: string;
    address: string;
    postalCode: string;
    image: string;
  }

  export const baseUrl = process.env.REACT_APP_API
  
  const Restaurant = () => {
    const [restaurants, setRestaurants] = useState <Restaurant[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
  
    useEffect(() => {
      axios.get(`${baseUrl}/restaurants`) // Update the URL as per your backend route
        .then(response => {
          setRestaurants(response.data.data);
          setLoading(false);
          
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }

    const handleRestaurantClick = (restaurantId: any) => {
      navigate(`/restaurant/${restaurantId}`)
    }
  
    return (
        <div className=" restaurant-list">
          <div className="">
        <h3 className="mb-4">All  Restaurants</h3>
        <ul className="restaurant-grid">
          {restaurants.map((restaurant) => (
            <li key={restaurant._id} 
                className="restaurant-card"
                onClick = {() => handleRestaurantClick(restaurant._id)}
                >
              <div className="">
               <div className="restaurant-details">
               <img src={restaurant.image} className="card-img-top card__img" alt={restaurant.name} />
                <h2 className="card-title text-primary">
                  {restaurant.name}
                  </h2>
               </div>
              </div>
            </li>
          ))}
        </ul>
          <a href="#" className="btn">Load More</a>
        </div>
        <Link to="/create-restaurant">Create New Restaurant</Link>
      </div>
    );
  };
  

export default Restaurant;
