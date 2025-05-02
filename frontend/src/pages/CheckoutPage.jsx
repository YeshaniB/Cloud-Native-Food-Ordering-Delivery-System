import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

import Header from '../components/Header';
import Footer from '../components/Footer';



const stripePromise = loadStripe("pk_test_51RIU5YQ1h8BbuwFsNMr4bQEoeMSdBaXXF5yetR9CGhr8Ujxuo3GHtpuAcNgLQAx0KRNpPWpERBNyXpPpgsA9xaTC00VRLxvgy4");

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const amount = 1000; // 10 dollars

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post('http://localhost:8082/api/payment/create-payment-intent', {
                amount: amount,
                orderId: "ORDER123"
            });

            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                console.error(result.error.message);
                alert("Payment Failed: " + result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    alert("Payment Successful! 🎉");
                }
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        }

        setLoading(false);
    };

    return (
        <>
            <Header/>

        <form onSubmit={handleSubmit} style={styles.form}>
            <h2 style={styles.title}>Complete Your Payment</h2>

            <div style={styles.amountBox}>
                <p style={styles.amountLabel}>Amount to Pay</p>
                <h3 style={styles.amountValue}>${(amount / 100).toFixed(2)}</h3>
            </div>

            <div style={styles.cardElement}>
                <CardElement options={{ hidePostalCode: true }} />
            </div>

            <button type="submit" disabled={!stripe || loading} style={styles.payButton}>
                {loading ? "Processing..." : "Pay Now"}
            </button>
        </form>
            <Footer/>
</>


    );


};

const CheckoutPage = () => {
    return (
        <div style={styles.container}>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
            <div style={styles.imageContainer}>
                <img src="/pancakescheckout.png" alt="Checkout Visual" style={{ width: "400px", borderRadius: "20px" }} />
            </div>
        </div>
    );
};

export default CheckoutPage;

// 💻 Styles
const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#fff",
        padding: "40px",
        gap: "50px",
        flexWrap: "wrap", // responsive for mobile
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
    },
    image: {
        width: "100%",
        borderRadius: "12px",
        objectFit: "cover",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    },
};
