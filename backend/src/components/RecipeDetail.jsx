import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ChefHat, Clock, Users, Star, Utensils, ScrollText, Timer } from "lucide-react";
import { Helmet } from "react-helmet";
import Footer from "./Footer";



const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("ingredients");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/app1/recipes/${id}/`);
        setRecipe(response.data);
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError("Error fetching recipe details");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const renderStars = (difficulty) =>
    Array.from({ length: difficulty }, (_, i) => (
      <Star key={i} className="w-5 h-5 text-purple-500 fill-purple-500" />
    ));

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!recipe) return <div className="min-h-screen flex items-center justify-center">Recipe not found</div>;

  return (
    <>
      <Helmet>
        <title>{recipe.title} - Recipe Details</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image Section */}
              <div className="relative h-96 lg:h-full">
                <img
                  src={recipe.image ? (recipe.image.startsWith("http") ? recipe.image : `http://127.0.0.1:8000/media/${recipe.image}`) : "/placeholder-recipe.jpg"}
                  alt={recipe.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center">
                    {renderStars(recipe.difficulty)}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Timer className="w-5 h-5 mr-2" />
                    <span>{recipe.prep_time} minutes</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-2" />
                    <span>{recipe.servings} servings</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-8">{recipe.description}</p>

                {/* Nutritional Info */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-purple-50 rounded-lg mb-8">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Calories</p>
                    <p className="text-xl font-bold text-purple-600">{recipe.calories || "250"}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Protein</p>
                    <p className="text-xl font-bold text-purple-600">{recipe.protein || "15g"}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Carbs</p>
                    <p className="text-xl font-bold text-purple-600">{recipe.carbs || "30g"}</p>
                  </div>
                </div>
              </div>
            </div>

           

            {/* Tips Section */}
            <div className="p-8 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Chef's Tips</h3>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start space-x-4">
                  <ChefHat className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-600">{recipe.tips || "For best results, make sure all ingredients are at room temperature before starting. This helps with even cooking and better texture."}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

    </>
  );
};

export default RecipeDetail; 