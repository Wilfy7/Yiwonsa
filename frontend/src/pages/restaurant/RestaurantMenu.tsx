import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../service/restaurant.service";
import axios from "axios";


interface MenuItem {
    _id: string;
    name: string;
    price: number;
}

const RestaurantMenu = () => {
    const {restaurantId} = useParams<{restaurantId: string}>();
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        
          const fetchMenu = async () => {
            try {
              const res = await fetch(`${baseUrl}/restauarant/${restaurantId}/menu`)
              const data = await res.json();
              setMenuItems(data.menuItems)
            } catch (error) {
            console.error("Error fetching menu:", error) 
            }
          };

        fetchMenu();
          
    }, [restaurantId]);

    if (loading) {
        return <div>Loading...</div>
    };

    if (error) {
        return <div>Error: {error}</div>
    };

  return (
    <div>
      <h3>Restaurant Menu</h3>
      <ul>
        {menuItems.map((menuItem) => (
          <li key={menuItem._id}>
            {menuItem.name} - ${menuItem.price}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RestaurantMenu;
