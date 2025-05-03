import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

const stripePromise = loadStripe("pk_test_51RIU5YQ1h8BbuwFsNMr4bQEoeMSdBaXXF5yetR9CGhr8Ujxuo3GHtpuAcNgLQAx0KRNpPWpERBNyXpPpgsA9xaTC00VRLxvgy4");

const CheckoutForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const orderData = location.state || {};
    const totalPrice = parseFloat(orderData.totalPrice);
    const amount = isNaN(totalPrice) ? 0 : Math.round(totalPrice * 100); // cents for Stripe
    const orderId = "ORD-" + Math.floor(Math.random() * 100000);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (amount <= 0) {
            toast.error("Invalid amount. Please review your order.");
            return;
        }

        setLoading(true);

        try {
            const { data } = await axios.post("http://localhost:8086/api/payment/create-payment-intent", {
                amount,
                orderId,
            });

            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                toast.error("Payment Failed: " + result.error.message);
            } else if (result.paymentIntent.status === "succeeded") {
                toast.success("🎉 Payment Successful! Redirecting...");

                // Save order to order-service
                const formData = new FormData();
                formData.append("orderDate", orderData.orderDate);
                formData.append("customerName", orderData.name);
                formData.append("customerAddress", orderData.address);
                formData.append("contactNo", orderData.contact);
                formData.append("totalPrice", orderData.totalPrice);

                const dummyImage = new Blob(["dummy"], { type: "text/plain" });
                formData.append("image", dummyImage, "dummy.txt");

                orderData.orderItems.forEach(item => {
                    formData.append("orderName", item.name);
                    formData.append("quantity", item.quantity.toString());
                    formData.append("price", item.price.toString());
                });

                try {
                    await axios.post("http://localhost:8082/addOrderDetails", formData);
                    console.log("✅ Order saved.");
                } catch (err) {
                    console.error("❌ Failed to send order:", err);
                    toast.error("Order save failed.");
                }

                // Redirect to success page after 3 sec
                setTimeout(() => {
                    navigate("/order-success", { state: { orderData, orderId } });
                }, 3000);
            }

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Try again.");
        }

        setLoading(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Complete Your Payment</h2>
                <div style={styles.amountBox}>
                    <p style={styles.amountLabel}>Amount to Pay</p>
                    <h3 style={styles.amountValue}>Rs. {(amount / 100).toFixed(2)}</h3>
                </div>
                <div style={styles.cardElement}>
                    <CardElement options={{ hidePostalCode: true }} />
                </div>
                <button type="submit" disabled={!stripe || loading} style={styles.payButton}>
                    {loading ? "Processing..." : "Pay Now"}
                </button>
            </form>
            <ToastContainer position="top-center" />
        </>
    );
};

const CheckoutPage = () => {
    return (
        <>
            <Header />
            <div style={styles.checkoutContainer}>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
                <div style={styles.imageContainer}>
                    <img
                        src="/pancake.jpg"
                        alt="Delicious Pancakes"
                        style={styles.image}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CheckoutPage;

// 💅 Styles
const styles = {
    checkoutContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "40px",
        padding: "150px 20px 50px",
        backgroundColor: "#fff",
    },
    form: {
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "10px",
        maxWidth: "400px",
        width: "100%",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        border: "1px solid #f0f0f0",
    },
    title: {
        textAlign: "center",
        marginBottom: "20px",
        fontSize: "26px",
        fontWeight: "700",
        color: "#212529",
    },
    amountBox: {
        textAlign: "center",
        marginBottom: "20px",
    },
    amountLabel: {
        fontSize: "16px",
        color: "#666666",
        marginBottom: "5px",
    },
    amountValue: {
        fontSize: "28px",
        color: "#FF6600",
        fontWeight: "bold",
    },
    cardElement: {
        backgroundColor: "#f9f9f9",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "20px",
        border: "1px solid #ddd",
    },
    payButton: {
        width: "100%",
        padding: "14px",
        backgroundColor: "#FF6600",
        color: "#ffffff",
        fontSize: "16px",
        fontWeight: "bold",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    imageContainer: {
        maxWidth: "400px",
        width: "100%",
        textAlign: "center",
    },
    image: {
        width: "100%",
        borderRadius: "0px",
        objectFit: "cover",
        boxShadow: "none",
        border: "none",
    },
};
