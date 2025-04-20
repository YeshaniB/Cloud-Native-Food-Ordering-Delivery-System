import React, { useState, useRef } from 'react';
import axios from 'axios';
import Burger from './Images/Burger.jpg';
import Pizza from './Images/Pizza.jpg';
import {
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Box,
  Divider,
  Paper,
  Chip,
  AppBar,
  Toolbar
} from '@mui/material';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
  } from '@mui/material';
import { Add, Remove, ShoppingCart } from '@mui/icons-material';
import { Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const menuItems = [
  {
    id: 1,
    name: 'Burger',
    price: 5.99,
    image: Burger,
  },
  {
    id: 2,
    name: 'Pizza',
    price: 8.99,
    image: Pizza,
  },
  {
    id: 3,
    name: 'Pasta',
    price: 7.49,
    image: Burger,
  },
  {
    id: 4,
    name: 'Pizza',
    price: 8.99,
    image: Pizza,
  },
  {
    id: 5,
    name: 'Burger',
    price: 5.99,
    image: Burger,
  },
];

const AddToCart = () => {
const [openCart, setOpenCart] = useState(false);
  const [cart, setCart] = useState([]);
  const cartRef = useRef(null); // Reference for smooth scroll

  const orderDate = new Date().toISOString().split('T')[0];
  const customerName = 'John Doe';
  const customerAddress = '123 Main St';

  const addToCart = (item) => {
    const itemExists = cart.find((cartItem) => cartItem.id === item.id);
    if (itemExists) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const scrollToCart = () => {
    cartRef.current?.scrollIntoView({ behavior: 'smooth' });
  };


  const handleCheckout = async () => {
    try {
      const formData = new FormData();

      formData.append('orderDate', orderDate);
      formData.append('customerName', customerName);
      formData.append('customerAddress', customerAddress);

      cart.forEach((item, index) => {
        formData.append('orderName', item.name);
        formData.append('quantity', item.quantity.toString());
      });
      formData.append('orderTotal', getTotalPrice().toString());
      // formData.append('orderStatus', 'Pending'); // Set initial status

      // ✅ Add first item's image as example
      const response = await fetch(cart[0].image);
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: blob.type });

      formData.append('image', file);

      // ✅ POST to backend
      const res = await axios.post('http://localhost:8081/addOrderDetails', formData);
      alert('Order submitted: ' + res.data);
      setCart([]); // Clear cart on success
      setOpenCart(false);
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Failed to submit order');
    }
  };

  return (
    <>
      {/* Add AppBar or Top Section with Cart Icon */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <IconButton color="primary" onClick={scrollToCart}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* <Typography variant="h4" gutterBottom>
                Add to Cart
            </Typography> */}
            <IconButton color="primary" onClick={() => setOpenCart(true)}>
            <Badge badgeContent={cart.length} color="error">
                <ShoppingCartIcon />
            </Badge>
            </IconButton>
            </Box>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Diyons Restaurant
        </Typography>

        <Grid container spacing={3} sx={{ margin: 'auto' }}>
          {menuItems.map((item) => (
            <Grid item xs={20} sm={4} sx={{ padding: 0, marginLeft: 7 }} key={item.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image}
                  alt={item.name}
                />
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${item.price.toFixed(2)}
                  </Typography>
                  <Box sx={{ marginTop: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Cart Section */}
        <div ref={cartRef}>
        <Dialog open={openCart} onClose={() => setOpenCart(false)} maxWidth="md" fullWidth>
          <DialogTitle>Your Cart</DialogTitle>
          <DialogContent>
            {cart.length === 0 ? (
              <Typography variant="body1">Your cart is empty.</Typography>
            ) : (
              <>
                <Grid container spacing={10}>
                  {cart.map((item) => (
                    <Grid item xs={12} sm={20} key={item.id}>
                      <Box sx={{ justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', width: "100", marginLeft: 1, paddingLeft: 5 }}>
                        <CardMedia component="img" height="80" width={"100"} image={item.image} alt={item.name} />
                        <Typography variant="body1">{item.name} - ${item.price.toFixed(2)} x {item.quantity}</Typography>
                        <Box>
                          <IconButton onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}><Remove /></IconButton>
                          <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)}><Add /></IconButton>
                          <IconButton onClick={() => removeFromCart(item.id)}><Chip label="Remove" color="error" size="small" /></IconButton>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total: ${getTotalPrice().toFixed(2)}</Typography>
                </Box>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCart(false)} color="secondary">Close</Button>
            {cart.length > 0 && (
              <Button variant="contained" color="primary" onClick={handleCheckout}>
                Checkout
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
      </Container>
    </>
  );
};

export default AddToCart;
