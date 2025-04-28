import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';

import Header from '../components/Header';
import Footer from '../components/Footer';
import backgroundmain from '../images/main_img.png';
import logoB from '../images/logo.jpg';
import restaurant1 from '../images/images.png';
import restaurant2 from '../images/kfc.png';
import restaurant3 from '../images/burgerking.png';
import restaurant4 from '../images/tacobell.png';
import section1img from '../images/onlinebg.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

import '../styles/Home.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';

function Home() {
    const navigate = useNavigate();

    const handleInquiryClick = () => {
        navigate('/Inquiry');
    }

    return (
        <div className="Home">
            <Header />

            {/* Home Section */}
            <section className="home-section" id="home">
                <div className="home-text">
                    <h3>Welcome to Crave Express</h3>
                    <h1 className='h1Home'>Satisfy Your Cravings, Instantly</h1>
                    <p>Discover mouthwatering dishes from your favorite restaurants. Order online and enjoy fast, fresh deliveries – anytime, anywhere!</p>
                    <Button label="Order Now" className="p-button-rounded p-button-warning" onClick={() => navigate('/Online')} />
                </div>

                <div className="home-img">
                    <img src={backgroundmain} alt="Food Delivery Background" />
                </div>
            </section>


            {/* About Us Section */}
            <section className="about" id="about">
                <div className="about-img">
                    <img src={logoB} alt="Crave Express Logo" />
                </div>

                <div className="about-text">
                    <h3>About Us</h3>
                    <h2>Crave Express</h2>
                    <p>
                        Founded with the vision to transform the way you experience food delivery, Crave Express connects you with the best local restaurants in just a few taps. Our platform brings an extensive range of cuisines straight to your doorstep — fresh, hot, and delicious.
                        <br /><br />
                        Whether you're craving a juicy burger, spicy tacos, or a gourmet meal, we are committed to delivering your favorites faster and fresher than ever before. Our cloud-native technology ensures seamless orders, real-time tracking, and top-notch customer service to guarantee your satisfaction every time.
                        <br /><br />
                        At Crave Express, we believe food is more than just a meal — it's a connection, a celebration, and a comfort. Join us and enjoy a delivery experience that matches your lifestyle: fast, reliable, and full of flavor!
                    </p>
                </div>
            </section>

            {/* Registered Restaurants Section */}
            <div className="restaurant_catalog">
                <h1>Choose Your Restaurant</h1>
                <div className="catalog_box">
                    {[
                        { img: restaurant1 },
                        { img: restaurant2 },
                        { img: restaurant3 },
                        { img: restaurant4 }
                    ].map((item, index) => (
                        <Card key={index} className="product-card">
                            <img src={item.img} alt="Restaurant" className="product-img" />
                        </Card>
                    ))}
                </div>
            </div>

            <Divider />

            {/*/!* Newsletter and Inquiry Section *!/*/}
            {/*<section className="newsletter-section">*/}
            {/*    <div className="newsletter-content">*/}
            {/*        <div className="news-text">*/}
            {/*            <h3>Get Exclusive Deals!</h3>*/}
            {/*            <h2>Sign up for Special Offers</h2>*/}
            {/*            <p>Enter your email to receive the latest offers, deals, and restaurant updates directly to your inbox!</p>*/}
            {/*            <div className="email-subscription">*/}
            {/*                <InputText placeholder="Your Email" className="email-input" />*/}
            {/*                <Button label="Subscribe" className="p-button-success" />*/}
            {/*            </div>*/}
            {/*            <Button label="Place Inquiry" className="p-button-outlined p-button-info inquiry-btn" onClick={handleInquiryClick} />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}

            <Divider />
            <Footer/>
        </div>
    );
}

export default Home;
