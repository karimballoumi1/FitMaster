import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Clock, ArrowLeft, Dumbbell } from "lucide-react"; // Corrected import
import Footer from "./Footer";
import { Helmet } from "react-helmet";

const ExerciseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/app1/exercises/${id}/`);
        setExercise(response.data);
      } catch (err) {
        setError("Error fetching exercise details");
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [id]);

  // Helper function to get difficulty level text
  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 1:
        return "Easy";
      case 2:
        return "Medium";
      case 3:
        return "Hard";
      default:
        return "Unknown";
    }
  };

  if (loading) return <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  if (!exercise) return <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center text-gray-500">Exercise not found</div>;

  return (
    <>
           <Helmet>
                <title>ExerciseDetail</title>
                <link rel="icon" href="/logo.png" />
            </Helmet> 
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[30rem] w-full">
        <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=2070&q=80" alt="Fitness Background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-5xl font-bold">{exercise.title}</h1>
          <p className="text-lg mt-4 max-w-2xl">Push Your Limits. Achieve Greatness. Get the best workouts tailored for you.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <button className="flex items-center text-blue-600 hover:underline mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Training
        </button>

        {exercise.image && (
          <img src={exercise.image} alt={exercise.title} className="w-full h-[30rem] object-cover rounded-lg shadow-md mb-6" />
        )}

        <div className="flex items-center text-gray-600 space-x-4 mb-4">
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-1" />
            <span>{exercise.duration} min</span>
          </div>
          <div className="flex items-center">
            <Dumbbell className="w-5 h-5 mr-1" /> {/* Corrected icon name */}
            <span>Difficulty: {getDifficultyText(exercise.difficulty)}</span>
          </div>
        </div>
        
        <p className="text-gray-700 leading-relaxed mb-6">{exercise.description}</p>

        {exercise.benefits && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Benefits:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {exercise.benefits.split(",").map((benefit, index) => (
                <li key={index}>{benefit.trim()}</li>
              ))}
            </ul>
          </div>
        )}

        
        {/* Display additional images if available */}
        <div className="flex justify-center mb-6">
              <img src={exercise.image1} alt={`${exercise.title} - 1`} className="w-[20rem] h-[30rem] object-cover rounded-lg shadow-md " />
            </div>

        
        
            {exercise.video && (
  <div className="mb-6 flex justify-center"> {/* Added flex justify-center for centering */}
    <video
      width="800"
      height="360"
      autoPlay // Add autoplay attribute
      loop // Add loop attribute
      muted // Add muted attribute
      controls // Keep controls if you want
      className="rounded-lg shadow-lg" // Add class for style
    >
      <source src={exercise.video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
)}

        <div className="flex justify-center mb-6">

          {exercise.image2 && (
            <img src={exercise.image2} alt={`${exercise.title} - 2`} className="w-[40rem] h-[30rem] object-cover rounded-lg shadow-md" />
          )}
          </div>
        </div>
      </div>
      <Footer />

      </>
  );
};

export default ExerciseDetail;
