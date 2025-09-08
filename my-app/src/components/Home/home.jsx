import "./home.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/footer";
import Blue_waves from "./Blue_waves";
import bgImage from "./bg.svg";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const onClickBookService=()=>{
    navigate("/bookservice");
  }
  const reviews = [
  {
    name: "John Doe",
    feedback: "Amazing service! Highly recommended 🚗✨",
    rating: 5,
    profileImg: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Sarah Smith",
    feedback: "Very professional and quick service.",
    rating: 4,
    profileImg: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "David Johnson",
    feedback: "Good experience overall, will book again.",
    rating: 4,
    profileImg: "https://i.pravatar.cc/150?img=3",
  },
];

  const featureds = [
    {
      icon: "/svg/hand_washing.svg",
      title: "100% Hand Washing",
      discription: `Our full service wash and detailing treatments cover every surface of your vehicle`,
    },
    {
      icon: "/svg/interior_detailing.svg",
      title: "Interior Detailing",
      discription: `Interior detailing treatments bring life to your interior surfaces and remove dust, dirt, and stains.`,
    },
    {
      icon: "/svg/coffee_shop.svg",
      title: "Healthy Coffee Shop",
      discription: `Enjoy organic and fresh meals with a delicious cup of coffee, tea or any other drinks.`,
    },
    {
      icon: "/svg/full_service_dry.svg",
      title: "Full Service Dry",
      discription: `Using compressed air and specialized microfiber hand towels, our team clears every crevice for a spotless finish.`,
    },
    {
      icon: "/svg/express_detailing.svg",
      title: "Express Detailing",
      discription: `Our express detailing treatments not only look great, they protect and extend the life of your vehicle's surfaces.`,
    },
    {
      icon: "/svg/comfortable_waiting_area.svg",
      title: "Comfortable Waiting Area",
      discription: `Relax and enjoy the fresh air, picturesque view, and free WiFi while we make your vehicle look new again.`,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="nav-rights">
          {/* Call Section */}
          <div className="nav-item call">
            <span className="call-title">Call Us:</span>
            <a href="tel:+18805556580" className="call-number">+1 880 555 6580</a>
          </div>

          <div className="main-heding-container">
              <h1 className="text-heading">Welcome to Premium Car Services</h1>
          </div>

          {/* Hours Section */}
          <div className="nav-item hours">
            <span className="hours-title">Hours:</span>
            <p>Mon-Sat: 7:00am - 6:00pm</p>
            <p>Sun: 7:00am - 6:00pm</p>
          </div>
        </div>

        {/* Carousel */}
        <div className="carousel-container">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            {/* Indicators */}
            <div className="carousel-indicators">
              {[0, 1, 2, 3, 4].map((index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : undefined}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>

            {/* Carousel Items */}
            <div className="carousel-inner">
              {[1, 2, 3, 4, 5].map((num, idx) => (
                <div
                  key={num}
                  className={`carousel-item ${idx === 0 ? "active" : ""}`}
                >
                  <img
                    src={`/images/img${num}.png`}
                    className="d-block w-100 carousel-img"
                    alt="car Service"
                  />
                  
                  <div className="carousel-caption">

                    <h2 className="carousel-head">Premium Car Wash Service</h2>
                    <p className="carousel-text-paragraph">
                      Keep your car clean, shiny, and spotless with our expert
                      car wash solutions.
                    </p>
                    <p className="carousel-text-para">“Your car, our priority.”</p>
                    <button className="carousel-btn" onClick={onClickBookService}>Book Service</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/* Explore Section */}
        <div className="explore-more-container">
          <section className="features-section">
            <div className="features-content">
              <h2 className="features-title">
                Most Popular Features & Services
              </h2>
              <p className="features-description">
                Experience a spotless shine with our top-rated services—express
                washes, premium detailing, eco-friendly products, and convenient
                online booking. Whether it’s a quick clean or a full-service
                pampering, we’ve got your car covered, inside and out.
              </p>
              <button className="explore-btn">Explore More</button>
            </div>
          </section>

          {/* Service Section */}
          <section className="service-boxx">
            <div className="service-content">
              <h2 className="service-title">
                Best Full-Service Hand Car Wash
              </h2>
              <p className="service-description">
                We strive to give you the best customer experience and the best
                care for your vehicle. From our excellent full-service car wash
                treatments, to our best-in-class express detailing services.
              </p>
              <button className="service-btn" onClick={onClickBookService}>Book an Appointment</button>
            </div>
          </section>
        </div>

        {/* FIXED FEATURED SECTION */}
        <div className="featured-services">
          <div className="relative">
            <Blue_waves />
            <div className="featured-bg">
              <img
                className="featured-bg-img"
                src={bgImage}
                alt="background"
              />

              <div className="featured-container">
                <h3 className="featured-heading">
                  Full-Service While You Wait
                </h3>

                <div className="featured-grid">
                  {featureds.map((item, i) => (
                    <div key={i} className="featured-card">
                      <img
                        className="featured-icon"
                        src={item.icon}
                        alt={item.title}
                      />
                      <div className="featured-text">
                        <h4>{item.title}</h4>
                        <p>{item.discription}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="rotate-180">
              <Blue_waves />
            </div>
          </div>
        </div>
      </div>

       <div className="review-section"style={{fontFamily: 'serif'}}>
          <h2 className="review-title">What Our Clients Say</h2>
          <div className="review-cards">
            {reviews.map((review, index) => (
              <div className="review-card" key={index}>
                <img
                  src={review.profileImg}
                  alt={review.name}
                  className="review-img"
                />
                <h3 className="review-name">{review.name}</h3>
                <p className="review-feedback">"{review.feedback}"</p>
                <div className="review-stars">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
              </div>
          </div>
          ))}
      </div>
    </div>
    <Footer />
      </>
  );
}

export default Home;
