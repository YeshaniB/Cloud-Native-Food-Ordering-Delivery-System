import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const OrderSuccessPage = () => {
    const location = useLocation();
    const { orderData, orderId } = location.state || {};

    return (
        <>
            <Header />
            <div style={styles.wrapper}>
                <div style={styles.card}>
                    <div style={styles.icon}>✔</div>
                    <h1 style={styles.title}>Payment Successful!</h1>
                    <p style={styles.subtitle}>
                        Thank you for your order. We've received your payment.
                    </p>

                    <div style={styles.details}>
                        <p><strong>Order ID:</strong> {orderId}</p>
                        <p><strong>Customer Name:</strong> {orderData?.name}</p>
                        <p><strong>Contact:</strong> {orderData?.contact}</p>
                        <p><strong>Address:</strong> {orderData?.address}</p>
                        <p><strong>Order Date:</strong> {orderData?.orderDate}</p>
                        <p><strong>Total Price:</strong> Rs. {orderData?.totalPrice}</p>
                    </div>

                    <p style={styles.footerNote}>
                        🍽️ Your food will be prepared and delivered shortly.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default OrderSuccessPage;

const styles = {
    wrapper: {
        backgroundColor: "#fffaf0", // soft cream-orange
        minHeight: "calc(100vh - 160px)", // less height (Header + Footer estimate)
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "80px 15px",
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "30px 25px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        maxWidth: "480px",
        width: "100%",
        textAlign: "center",
        border: "1px solid #ffe8cc",
    },
    icon: {
        fontSize: "40px",
        color: "#ff6600",
        marginBottom: "10px",
    },
    title: {
        fontSize: "26px",
        fontWeight: "bold",
        color: "#222",
        marginBottom: "8px",
    },
    subtitle: {
        fontSize: "15px",
        color: "#555",
        marginBottom: "20px",
    },
    details: {
        backgroundColor: "#fff8f1",
        padding: "15px",
        borderRadius: "10px",
        textAlign: "left",
        fontSize: "15px",
        color: "#333",
        marginBottom: "20px",
        lineHeight: "1.6",
        border: "1px solid #ffe0b3",
    },
    footerNote: {
        fontSize: "13px",
        color: "#888",
        marginTop: "10px",
    },
};

