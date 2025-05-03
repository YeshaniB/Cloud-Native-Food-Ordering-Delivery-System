import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewPaymentsPage = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8086/api/payment/all")
            .then((res) => {
                setPayments(res.data);
            })
            .catch((err) => {
                console.error("Error fetching payments:", err);
            });
    }, []);

    return (
        <div style={styles.wrapper}>
            <h2 style={styles.title}>💳 All Payments</h2>
            <table style={styles.table}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Order ID</th>
                    <th>Intent ID</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Currency</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {payments.map((p) => (
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.orderId}</td>
                        <td>{p.paymentIntentId}</td>
                        <td>Rs. {(p.amount / 100).toFixed(2)}</td>
                        <td>{p.status}</td>
                        <td>{p.currency.toUpperCase()}</td>
                        <td>{new Date(p.createdAt).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewPaymentsPage;

const styles = {
    wrapper: {
        padding: "80px 20px",
        background: "#fffaf0",
        minHeight: "100vh",
    },
    title: {
        fontSize: "28px",
        marginBottom: "20px",
        color: "#ff6600",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        background: "#ffffff",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    },
    th: {
        backgroundColor: "#ffecd2",
        padding: "12px",
        textAlign: "left",
    },
    td: {
        padding: "10px",
        borderBottom: "1px solid #f0f0f0",
    }
};
