// import React, { useState, useRef } from 'react';
// import axios from 'axios';
// import Burger from './Images/Burger.jpg';
// import Pizza from './Images/Pizza.jpg';
// import {
//   Container,
//   Typography,
//   Grid,
//   Button,
//   Card,
//   CardContent,
//   CardMedia,
//   IconButton,
//   Box,
//   Divider,
//   Paper,
//   Chip,
//   AppBar,
//   Toolbar
// } from '@mui/material';
// import {
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions
//   } from '@mui/material';
// import { Add, Remove, ShoppingCart } from '@mui/icons-material';
// import { Badge } from '@mui/material';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


// const menuItems = [
//   {
//     id: 1,
//     name: 'Burger',
//     price: 5.99,
//     image: Burger,
//   },
//   {
//     id: 2,
//     name: 'Pizza',
//     price: 8.99,
//     image: Pizza,
//   },
//   {
//     id: 3,
//     name: 'Pasta',
//     price: 7.49,
//     image: Burger,
//   },
//   {
//     id: 4,
//     name: 'Pizza',
//     price: 8.99,
//     image: Pizza,
//   },
//   {
//     id: 5,
//     name: 'Burger',
//     price: 5.99,
//     image: Burger,
//   },
// ];

// const AddToCart = () => {
// const [openCart, setOpenCart] = useState(false);
//   const [cart, setCart] = useState([]);
//   const cartRef = useRef(null); // Reference for smooth scroll

//   const orderDate = new Date().toISOString().split('T')[0];
//   const customerName = 'John Doe';
//   const customerAddress = '123 Main St';

//   const addToCart = (item) => {
//     const itemExists = cart.find((cartItem) => cartItem.id === item.id);
//     if (itemExists) {
//       setCart(
//         cart.map((cartItem) =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         )
//       );
//     } else {
//       setCart([...cart, { ...item, quantity: 1 }]);
//     }
//   };

//   const removeFromCart = (id) => {
//     setCart(cart.filter((item) => item.id !== id));
//   };

//   const updateQuantity = (id, quantity) => {
//     setCart(
//       cart.map((item) =>
//         item.id === id ? { ...item, quantity: quantity } : item
//       )
//     );
//   };

//   const getTotalPrice = () => {
//     return cart.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const getCartCount = () => {
//     return cart.reduce((total, item) => total + item.quantity, 0);
//   };

//   const scrollToCart = () => {
//     cartRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };


//   const handleCheckout = async () => {
//     try {
//       const formData = new FormData();

//       formData.append('orderDate', orderDate);
//       formData.append('customerName', customerName);
//       formData.append('customerAddress', customerAddress);

//       cart.forEach((item, index) => {
//         formData.append('orderName', item.name);
//         formData.append('quantity', item.quantity.toString());
//         formData.append('price', item.price.toString());
//       });
//       formData.append('totalPrice', getTotalPrice().toString());
//       // formData.append('orderStatus', 'Pending'); // Set initial status

//       // ✅ Add first item's image as example
//       const response = await fetch(cart[0].image);
//       const blob = await response.blob();
//       const file = new File([blob], "image.jpg", { type: blob.type });

//       formData.append('image', file);
//       for (const pair of formData.entries()) {
//         console.log(pair[0]+ ': ' + pair[1]);
//       }
      

//       // ✅ POST to backend
//       const res = await axios.post('http://localhost:8081/addOrderDetails', formData);
//       alert('Order submitted: ' + res.data);
//       setCart([]); // Clear cart on success
//       setOpenCart(false);

//     } catch (err) {
//       console.error('Checkout error:', err);
//       alert('Failed to submit order');
      
//     }
//   };

//   return (
//     <>
//       {/* Add AppBar or Top Section with Cart Icon */}
//       <AppBar position="static" color="default" elevation={1}>
//         <Toolbar sx={{ justifyContent: 'flex-end' }}>
//           <IconButton color="primary" onClick={scrollToCart}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             {/* <Typography variant="h4" gutterBottom>
//                 Add to Cart
//             </Typography> */}
//             <IconButton color="primary" onClick={() => setOpenCart(true)}>
//             <Badge badgeContent={cart.length} color="error">
//                 <ShoppingCartIcon />
//             </Badge>
//             </IconButton>
//             </Box>
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="lg" sx={{ mt: 5 }}>
//         <Typography variant="h4" gutterBottom>
//           Diyons Restaurant
//         </Typography>

//         <Grid container spacing={3} sx={{ margin: 'auto' }}>
//           {menuItems.map((item) => (
//             <Grid item xs={20} sm={4} sx={{ padding: 0, marginLeft: 7 }} key={item.id}>
//               <Card>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={item.image}
//                   alt={item.name}
//                 />
//                 <CardContent>
//                   <Typography variant="h6">{item.name}</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     ${item.price.toFixed(2)}
//                   </Typography>
//                   <Box sx={{ marginTop: 2 }}>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       fullWidth
//                       onClick={() => addToCart(item)}
//                     >
//                       Add to Cart
//                     </Button>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Cart Section */}
//         <div ref={cartRef}>
//         <Dialog open={openCart} onClose={() => setOpenCart(false)} maxWidth="md" fullWidth>
//           <DialogTitle>Your Cart</DialogTitle>
//           <DialogContent>
//             {cart.length === 0 ? (
//               <Typography variant="body1">Your cart is empty.</Typography>
//             ) : (
//               <>
//                 <Grid container spacing={10}>
//                   {cart.map((item) => (
//                     <Grid item xs={12} sm={20} key={item.id}>
//                       <Box sx={{ justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', width: "100", marginLeft: 1, paddingLeft: 5 }}>
//                         <CardMedia component="img" height="80" width={"100"} image={item.image} alt={item.name} />
//                         <Typography variant="body1">{item.name} - ${item.price.toFixed(2)} x {item.quantity}</Typography>
//                         <Box>
//                           <IconButton onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}><Remove /></IconButton>
//                           <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)}><Add /></IconButton>
//                           <IconButton onClick={() => removeFromCart(item.id)}><Chip label="Remove" color="error" size="small" /></IconButton>
//                         </Box>
//                       </Box>
//                     </Grid>
//                   ))}
//                 </Grid>

//                 <Divider sx={{ my: 2 }} />
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                   <Typography variant="h6">Total: ${getTotalPrice().toFixed(2)}</Typography>
//                 </Box>
//               </>
//             )}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenCart(false)} color="secondary">Close</Button>
//             {cart.length > 0 && (
//               <Button variant="contained" color="primary" onClick={handleCheckout}>
//                 Checkout
//               </Button>
//             )}
//           </DialogActions>
//         </Dialog>
//       </div>
//       </Container>
//     </>
//   );
// };

// export default AddToCart;






  // const getLocationAndAddress = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     async (position) => {
  //       const { latitude, longitude } = position.coords;

  //       const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAlylaEx5-go5FqepdUypQX3g56HEnbUB0`;
  //       const response = await fetch(geocodeUrl);
  //       const data = await response.json();

  //       if (data.status === 'OK') {
  //         const address = data.results[0]?.formatted_address || '';
  //         setCustomerAddress(address);
  //       } else {
  //         alert("Failed to retrieve address");
  //       }
  //     },
  //     (error) => {
  //       alert("Location access denied or error occurred");
  //       console.error(error);
  //     }
  //   );
  // };



    // useEffect(() => {
  //     if (status !== 'Offline') {
  //         if (navigator.geolocation) {
  //             navigator.geolocation.watchPosition((position) => {
  //                 setLocation({
  //                     lat: position.coords.latitude,
  //                     lng: position.coords.longitude
  //                 });
  //             });
  //         }
  //     } else {
  //         setLocation(null);
  //     }
  // }, [status]);

//   useEffect(() => {
//     if (status !== "Offline") {
//         if (navigator.geolocation) {
//             navigator.geolocation.watchPosition((position) => {
//                 const lat = position.coords.latitude;
//                 const lng = position.coords.longitude;

//                 setLocation({ lat, lng });

//                 // Reverse Geocode
//                 const apiKey = "AIzaSyAlylaEx5-go5FqepdUypQX3g56HEnbUB0";
//                 const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

//                 axios.get(geocodeUrl)
//                     .then((response) => {
//                         if (response.data.results.length > 0) {
//                             setAddress(response.data.results[0].formatted_address);
//                         } else {
//                             setAddress("No address found");
//                         }
//                     })
//                     .catch((error) => {
//                         console.error("Geocoding error:", error);
//                     });
//             });
//         }
//     } else {
//         setLocation(null);
//         setAddress("");
//     }
// }, [status]);

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Image } from 'primereact/image';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Badge } from 'primereact/badge';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';

import Burger from './Images/Burger.jpg';
import Pizza from './Images/Pizza.jpg';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';

// Define menu and restaurant name mappings
const restaurantMenus = {
  res1: [
    { id: 1, name: 'Burger', price: 500.0, image: Burger },
    { id: 2, name: 'Pizza', price: 1100.0, image: Pizza },
    { id: 3, name: 'Burger', price: 500.0, image: Burger },
  ],
  res2: [
    { id: 4, name: 'Pasta', price: 650.0, image: Burger },
    { id: 5, name: 'Taco', price: 400.0, image: Pizza },
  ],
  res3: [
    { id: 6, name: 'Fried Rice', price: 850.0, image: Burger },
    { id: 7, name: 'Dumplings', price: 1000.0, image: Pizza },
  ],
};

const restaurantNames = {
  res1: 'Pizza Hut',
  res2: 'Taco Bell',
  res3: 'Burger King',
};



const OrderFood = () => {
  const { restaurantId } = useParams();
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const toast = useRef(null);
  const [customerName, setCustomerName] = useState('John Doe');
  const [customerAddress, setCustomerAddress] = useState('');

  const [restaurantItems, setRestaurantItems] = useState([]);

  const menuItems = restaurantMenus[restaurantId] || [];
  const restaurantName = restaurantNames[restaurantId] || 'Unknown Restaurant';
  const orderDate = new Date().toISOString().split('T')[0];

  const mapRef = useRef(null);         // Reference to map div
  const googleMapRef = useRef(null);   // Google Map instance
  const markerRef = useRef(null);      // Marker instance
  const [address, setAddress] = useState('');


  const [showMap, setShowMap] = useState(false);
  const [status, setStatus] = useState('Select Option');

  const [location, setLocation] = useState(null);

  const statusOptions = ['Select Option','Current Location', 'Enter Location'];



  const increasePricesBy20 = () => {
    // Iterate over each restaurant menu and update the price
    Object.keys(restaurantMenus).forEach((restaurantId) => {
      restaurantMenus[restaurantId] = restaurantMenus[restaurantId].map((item) => ({
        ...item,
        price: item.price * 1.2, // Increase the price by 20%
      }));
    });
  
    // After the increase, log the updated menu (optional)
    console.log(restaurantMenus);
  };

useEffect(() => {
  let watchId;

  if (status !== "Select Option" && status !== "Enter Location") {
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          console.log("Live position:", position);

          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          setLocation({ lat, lng });

          const apiKey = "AIzaSyBAAu_9NQjq6m33d7_STIOiOHfC6ZuaEqg";
          const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

          axios.get(geocodeUrl)
            .then((response) => {
              console.log("Geocode full response:", response.data);
              if (response.data.status === "OK" && response.data.results.length > 0) {
                setAddress(response.data.results[0].formatted_address);
              } else {
                console.warn("No address found");
                setAddress("No address found");
              }
            })
            .catch((error) => {
              console.error("Geocoding error:", error);
              setAddress("Error fetching address");
            });
        },
        (error) => {
          console.error("Geolocation error:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000000,
          maximumAge: 0,
        }
      );
    }
  } else {
    setLocation(null);
    setAddress("");
    if (watchId) navigator.geolocation.clearWatch(watchId);
  }

  return () => {
    if (watchId) navigator.geolocation.clearWatch(watchId);
  };
}, [status]);

useEffect(() => {
  if (mapRef.current && location) {
    const map = new window.google.maps.Map(mapRef.current, {
      center: location,
      zoom: 15,
    });

    googleMapRef.current = map;
    markerRef.current = new window.google.maps.Marker({
      position: location,
      map,
      title: 'Your Location',
    });
  }
}, [location]);


  const handleFindLocation = () => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;

        googleMapRef.current.setCenter(location);
        googleMapRef.current.setZoom(15);
        markerRef.current.setPosition(location);
      } else {
        alert('Location not found! Check the address and try again.');
      }
    });
  };

  
  

  const addToCart = (item) => {
    const exists = cart.find((i) => i.id === item.id);
    if (exists) {
      setCart(
        cart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((i) => i.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const getTotalPrice = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const formData = new FormData();
      formData.append('orderDate', orderDate);
      formData.append('customerName', customerName);
      formData.append('customerAddress', address);

      cart.forEach((item) => {
        formData.append('orderName', item.name);
        formData.append('quantity', item.quantity.toString());
        formData.append('price', item.price.toString());
      });
      formData.append('totalPrice', getTotalPrice().toString());

      const response = await fetch(cart[0].image);
      const blob = await response.blob();
      const file = new File([blob], 'image.jpg', { type: blob.type });
      formData.append('image', file);

      await axios.post('http://localhost:8081/addOrderDetails', formData);
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Order submitted!' });
      setCart([]);
      setOpenCart(false);
    } catch (err) {
      console.error('Checkout error:', err);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to submit order' });
    }
  };

  const cartFooter = (
    <div className="p-d-flex p-jc-end">
      <Button label="Close" icon="pi pi-times" className="p-button-text" onClick={() => setOpenCart(false)} />
      {cart.length > 0 && (
        <Button label="Checkout" icon="pi pi-check" className="p-button-success" onClick={handleCheckout} />
      )}
    </div>
  );

  return (
    <div className="p-p-4">
      <Toast ref={toast} />
      <Toolbar
        left={
          <div>
            <h2 style={{ margin: 0 }}>{restaurantName}</h2>
            <span style={{ color: '#7f8c8d' }}>Restaurant Menu</span>
          </div>
        }
        right={
          <Button
            icon="pi pi-shopping-cart"
            className="p-button-rounded p-button-info"
            onClick={() => setOpenCart(true)}
          >
            <Badge value={cart.length} severity="danger" />
          </Button>
        }
      />

      <div style={{ display: 'flex', overflowX: 'auto', gap: '150px', paddingTop: '50px', marginLeft: "150px" }}>
        {menuItems.map((item) => (
          <div key={item.id} style={{ flex: '0 0 auto', width: '300px' }}>
            <div
              className="p-card"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s ease',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <Image
                src={item.image}
                alt={item.name}
                imageStyle={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                }}
                preview
              />
              <div className="p-p-3">
                <h3 style={{ marginBottom: '0.5rem', color: '#2c3e50', fontWeight: '600', marginLeft: '10px' }}>{item.name}</h3>
                <p style={{ margin: '0 0 0.75rem', color: '#7f8c8d', fontSize: '15px', marginLeft: '10px' }}>
                  A delicious choice that will satisfy your cravings.
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', color: '#2980b9', fontSize: '16px', marginLeft: '10px' }}>
                    Rs. {item.price.toFixed(2)}
                  </span>
                  <Button
                    label="Add to Cart"
                    icon="pi pi-shopping-cart"
                    className="p-button-sm custom-cart-button"
                    style={{
                      backgroundColor: '#3498db',
                      borderColor: '#3498db',
                      color: 'white',
                      borderRadius: '20px',
                      marginBottom: '10px',
                      marginRight: '10px',
                      transition: 'all 0.3s ease',
                    }}
                    onClick={() => addToCart(item)}
                  />
                  <style>
                    {`
                      .custom-cart-button:hover {
                        background-color: #2980b9 !important;
                        border-color: #2980b9 !important;
                        transform: scale(1.05);
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                      }
                    `}
                  </style>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        header="Your Cart"
        visible={openCart}
        style={{ width: '60vw' }}
        footer={cartFooter}
        onHide={() => setOpenCart(false)}
      >
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.id} className="p-d-flex p-ai-center p-mb-3">
                <Image src={item.image} alt={item.name} width="60" preview className="p-mr-2" />
                <div className="p-d-flex p-jc-between p-ai-center" style={{ width: '100%' }}>
                <span>
              {item.name} - Rs. {item.price.toFixed(2)} x {item.quantity} = Rs. {(item.price * item.quantity).toFixed(2)}
            </span>
                  <div>
                    <Button
                      icon="pi pi-minus"
                      className="p-button-rounded p-button-text"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    />
                    <Button
                      icon="pi pi-plus"
                      className="p-button-rounded p-button-text"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    />
                    <Button
                      label="Remove"
                      icon="pi pi-trash"
                      className="p-button-text p-button-danger"
                      onClick={() => removeFromCart(item.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <Divider />
            <h4>Total: Rs. {getTotalPrice().toFixed(2)}</h4>
            <div className="p-field p-mt-3">
              <label htmlFor="customerName">Customer Name</label>
              <InputText
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="p-inputtext-sm"
                fullWidth
              />
            </div>
            <div className="p-field">
            <div className="p-field">
              <label htmlFor="customerAddress">Customer Address</label>
              <div className="p-d-flex p-ai-center" style={{ flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', width: '100%' }}>
                  <InputText
                    id="customerAddress"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="p-inputtext-sm"
                    style={{ flex: 1 }}
                    readOnly={status === 'Current Location'}
                  />
                <div>
                <Dropdown
                  value={status}
                  options={statusOptions}
                  onChange={(e) => {
                    setStatus(e.value);
                    setShowMap(e.value === 'Current Location'); // 👈 show map only for 'Current Location'
                  }}
                  placeholder="Select Status"
                />
              </div>         

             </div>

  {/* Conditionally render the map only when showMap is true */}
  {showMap && (
  <div
    id="map"
    ref={mapRef}
    style={{ height: '400px', width: '100%', marginTop: '1rem' }}
  ></div>
)}
</div>

            </div>
      </div>
          </div>
        )}
      </Dialog>
      <Card></Card>
    </div>
  );
};

export default OrderFood;
