import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

function Homepage({ onGetStarted }) {
    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>FitMaster - Transform Your Body</title>
                <link rel="icon" href="/logo.png" />
            </Helmet>

            <main className="flex-1">
                {/* Hero Section */}
                <div className="relative h-screen">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=2070&q=80"
                            alt="Fitness Background"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    </div>
                    <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
                        <h1 className="text-5xl md:text-7xl font-bold text-center mb-6">
                            Transform Your Body, Transform Your Life.
                        </h1>
                        <h2 className="text-3xl md:text-5xl font-semibold mb-6">Push Your Limits.</h2>
                        <h2 className="text-3xl md:text-5xl font-semibold mb-8">Achieve Greatness.</h2>
                        <p className="text-xl text-center max-w-3xl mb-8">
                            FitMaster offers you the best workouts and nutritional advice to reach your goals.
                        </p>
                        
                    </div>
                </div>

                {/* Statistics Section */}
                <section className="py-16 bg-[#0d1321] text-white text-center">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-8">Digital fitness coaching trusted by millions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div>
                                <p className="text-4xl font-bold text-blue-400">450M+</p>
                                <p className="text-lg text-gray-400">Training Sessions Completed</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-blue-400">1M+</p>
                                <p className="text-lg text-gray-400">Active Users Worldwide</p>
                            </div>
                            <div>
                                <div className="flex justify-center mb-2">
                                    <span className="text-yellow-400 text-3xl">★★★★★</span>
                                </div>
                                <p className="text-lg text-gray-400">50K+ Five-star reviews</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits of Training Section */}
                <section className="py-16 bg-gray-100 text-center">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-4xl font-bold text-gray-900 mb-8">Why Exercise?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { title: "Improves Health", desc: "Reduces stress, improves sleep, and boosts your energy.", icon: "💪" },
                                { title: "Weight Loss", desc: "Burn fat and tone your body effectively.", icon: "🔥" },
                                { title: "Increases Strength", desc: "Build your endurance and muscle power.", icon: "🏋️" }
                            ].map((benefit, index) => (
                                <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                                    <div className="text-6xl mb-4">{benefit.icon}</div>
                                    <h3 className="text-2xl font-semibold">{benefit.title}</h3>
                                    <p className="text-gray-700 mt-2">{benefit.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Video Section */}
                <section className="py-16 bg-black text-white text-center">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-4xl font-bold mb-8">Watch Our Intro Video</h2>
                        <div className="relative w-full max-w-4xl mx-auto">
                            <iframe
                                className="w-full h-64 md:h-96 rounded-lg shadow-lg"
                                src="https://www.youtube.com/embed/Y5RtQ4cawVk"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </section>


                {/* Types of Workouts */}
                <section className="py-16 bg-gray-100">
                    <div className="max-w-6xl mx-auto px-4 text-center">
                        <h2 className="text-4xl font-bold text-gray-900 mb-8">Types of Workouts</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { title: "Cardio", desc: "Improve your endurance and burn calories.", img: "https://th.bing.com/th/id/R.9f846ca2b029208a00d78beb4effcf1b?rik=vQhAHDPj6QYcEw&pid=ImgRaw&r=0" },
                                { title: "Strength Training", desc: "Build your strength and muscle mass.", img: "https://images.unsplash.com/photo-1594381898411-846e7d193883" },
                                { title: "Yoga", desc: "Increase flexibility and reduce stress.", img: "https://www.livekindlove.com/wp-content/uploads/2021/10/20211013040250-61665a6a73d86.jpg" }
                            ].map((workout, index) => (
                                <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                                    <img src={workout.img} alt={workout.title} className="w-full h-64 object-cover" />
                                    <div className="p-4">
                                        <h3 className="text-2xl font-semibold">{workout.title}</h3>
                                        <p className="text-gray-700 mt-2">{workout.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-16 bg-white text-center">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-4xl font-bold text-gray-900 mb-8">What Our Members Say</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { name: "John Doe", testimonial: "FitMaster has transformed my life! I feel stronger and more energetic.", img: "https://randomuser.me/api/portraits/men/1.jpg" },
                                { name: "Jane Smith", testimonial: "The best decision I made was joining FitMaster. The trainers are amazing!", img: "https://randomuser.me/api/portraits/women/2.jpg" },
                                { name: "Mike Johnson", testimonial: "I've lost 20 pounds in 3 months thanks to FitMaster's programs.", img: "https://randomuser.me/api/portraits/men/3.jpg" }
                            ].map((testimonial, index) => (
                                <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                                    <img src={testimonial.img} alt={testimonial.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                                    <h3 className="text-2xl font-semibold">{testimonial.name}</h3>
                                    <p className="text-gray-700 mt-2">{testimonial.testimonial}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Gallery Section */}
                <section className="py-16 bg-gray-100">
                    <div className="max-w-6xl mx-auto px-4 text-center">
                        <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Gallery</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
                                "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
                                "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5"
                            ].map((img, index) => (
                                <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                                    <img src={img} alt={`Fitness Gallery Image ${index + 1}`} className="w-full h-64 object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-white text-center">
    <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center"> {/* Centrer horizontalement */}
            <video
                autoPlay // Active la lecture automatique
                muted // Désactive le son
                loop // Boucle la vidéo
                controls // Affiche les contrôles de lecture (optionnel)
                width="80%"
                height="auto"
                className="rounded-lg shadow-lg"
            >
                <source src="/vd.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
        </div>
    </div>
</section>
                {/* Nutrition Tips Section */}
                <section className="py-16 bg-white text-center">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-4xl font-bold text-gray-900 mb-8">Nutrition Tips</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { title: "Stay Hydrated", desc: "Drink at least 8 glasses of water a day.", icon: "💧" },
                                { title: "Eat Balanced Meals", desc: "Include a mix of proteins, carbs, and fats in every meal.", icon: "🍽️" },
                                { title: "Limit Processed Foods", desc: "Avoid foods high in sugar and unhealthy fats.", icon: "🚫" }
                            ].map((tip, index) => (
                                <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                                    <div className="text-6xl mb-4">{tip.icon}</div>
                                    <h3 className="text-2xl font-semibold">{tip.title}</h3>
                                    <p className="text-gray-700 mt-2">{tip.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

Homepage.propTypes = {
    onGetStarted: PropTypes.func.isRequired,
};

export default Homepage;