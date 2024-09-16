import { useEffect, useState } from "react";
import "./styles.css";
import { MealItem } from "./components/MealItem/MealItem";

export default function App() {
  const [mealsData, setMealsData] = useState([]);
  const [error, setError] = useState(null);
  const [searchMeal, setSearchMeal] = useState("");

  useEffect(() => {
    const getData = async () => {
      const url = "https://www.themealdb.com/api/json/v1/1/search.php?s";

      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setMealsData(data.meals || []);
        } else {
          throw new Error("Network response was not ok.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };
    getData();
  }, []);

  const fetchData = async () => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setMealsData(data.meals || []);
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    }
  };

  const onClickSearchButton = async () => {
    try {
      fetchData();
    } catch (error) {}
  };

  console.log(mealsData);

  const onChangeSearchText = (e) => {
    setSearchMeal(e.target.value);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Meal Finder</h1>
        <div>
          <input type="search" onChange={() => onChangeSearchText} />
          <button type="button" onClick={() => onClickSearchButton()}>
            Search
          </button>
        </div>
      </div>

      <h1>Search for a meal</h1>
      {error && <p>Error: {error}</p>}
      <div className="meals-list">
        {mealsData.length > 0 ? (
          mealsData.map((meal) => (
            <MealItem
              key={meal.idMeal}
              url={meal.strMealThumb}
              name={meal.strMeal}
              id={meal.idMeal}
            />
          ))
        ) : (
          <p>No meals found.</p>
        )}
      </div>
    </div>
  );
}
