import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Star, ChefHat, Timer } from "lucide-react";
import { Helmet } from "react-helmet";
import Footer from "./Footer";

const Nutritional = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("All Recipes");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/app1/recipe-categories/");
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Error fetching categories");
      }
    };

    fetchCategories();
  }, []);

  // Fetch recipes
  useEffect(() => {
    if (categories.length === 0) return;

    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/app1/recipes/");
        const recipesWithCategoryName = response.data.map((recipe) => ({
          ...recipe,
          categoryName: recipe.category
            ? categories.find((cat) => cat.id === recipe.category)?.name || "No category"
            : "No category",
        }));
        setRecipes(recipesWithCategoryName);
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError("Error fetching recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [categories]);

  // Filtering logic
  const filteredRecipes =
    filter === "All Recipes"
      ? recipes
      : recipes.filter(
          (recipe) => recipe.categoryName && recipe.categoryName.toLowerCase() === filter.toLowerCase()
        );

  // Render stars for difficulty
  const renderStars = (difficulty) =>
    Array.from({ length: difficulty }, (_, i) => (
      <Star key={i} className="w-4 h-4 text-purple-500 fill-purple-500" />
    ));

  if (loading) return <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">Error: {error}</div>;

  return (
    <>
    
      <Helmet>
        <title>Nutritional</title>
        <link rel="icon" href="/logo.png" />
      </Helmet>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">Healthy Recipes</h1>

        {/* Filter buttons */}
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-full ${
              filter === "All Recipes" ? "bg-purple-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter("All Recipes")}
          >
            All Recipes
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full ${
                filter === category.name ? "bg-purple-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setFilter(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Display recipes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition duration-300 h-[25rem] w-[22rem]"
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            >
              {recipe.image ? (
                <img
                  src={
                    recipe.image.startsWith("http")
                      ? recipe.image
                      : `http://127.0.0.1:8000/media/${recipe.image}`
                  }
                  alt={recipe.title}
                  className="w-50 h-48 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}

              <h2 className="text-xl font-semibold mt-3">{recipe.title}</h2>
              <p className="text-gray-600 mt-2">{recipe.categoryName}</p>

            

              {/* Duration section */}
              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <Timer className="w-5 h-5 text-purple-600" />
                  <div className="ml-2">
                    <p className="text-sm font-medium text-purple-600">Duration</p>
                    <p className="text-sm text-gray-600">{recipe.prep_time} minutes</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />

    </>
  );
};

export default Nutritional; 