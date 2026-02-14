import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Clock, Star } from "lucide-react";
import { Helmet } from "react-helmet";
import Footer from "./Footer";
import Modelai from "./Modelai";

const Training = () => {
  const [exercises, setExercises] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("All Exercises");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/app1/exercise-categories/");
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Error fetching categories");
      }
    };

    fetchCategories();
  }, []);

  // Fetch exercises
  useEffect(() => {
    if (categories.length === 0) return;

    const fetchExercises = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/app1/exercises/");
        const exercisesWithCategoryName = response.data.map((exercise) => ({
          ...exercise,
          categoryName: exercise.category
            ? categories.find((cat) => cat.id === exercise.category)?.name || "No category"
            : "No category",
        }));
        setExercises(exercisesWithCategoryName);
      } catch (err) {
        console.error("Error fetching exercises:", err);
        setError("Error fetching exercises");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [categories]);

  // Filtering logic
  const filteredExercises =
    filter === "All Exercises"
      ? exercises
      : exercises.filter(
          (ex) => ex.categoryName && ex.categoryName.toLowerCase() === filter.toLowerCase()
        );

  // Render stars for difficulty
  const renderStars = (difficulty) =>
    Array.from({ length: difficulty }, (_, i) => (
      <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
    ));

  if (loading) return <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">Error: {error}</div>;

  return (
    <>
      <Helmet>
        <title>Training</title>
        <link rel="icon" href="/logo.png" />
      </Helmet>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Training Programs</h1>

        {/* Filter buttons */}
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-full ${
              filter === "All Exercises" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter("All Exercises")}
          >
            All Exercises
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full ${
                filter === category.name ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setFilter(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Display exercises */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-white p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition duration-300 h-[25rem] w-[22rem]"
              onClick={() => navigate(`/exercise/${exercise.id}`)}
            >
              {exercise.image ? (
                <img
                  src={
                    exercise.image.startsWith("http")
                      ? exercise.image
                      : `http://127.0.0.1:8000/media/${exercise.image}`
                  }
                  alt={exercise.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}

              <h2 className="text-xl font-semibold mt-3">{exercise.title}</h2>
              <p className="text-gray-600 mt-2">{exercise.categoryName}</p>

              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {renderStars(exercise.difficulty)}
                </div>
                <div className="flex items-center ml-4">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600 ml-2">{exercise.duration} min</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
      </div>
      <Modelai />
      <Footer />

    </>
  );
};

export default Training;
