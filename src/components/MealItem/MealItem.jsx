import "./MealItem.css";

export const MealItem = (props) => {
  return (
    <div className="mealItem_wrapper" onClick={() => {}}>
      <img src={props.url} className="meal_image" />
      <h1>{props.name}</h1>
      {/* <p>{props.description}</p> */}
    </div>
  );
};
