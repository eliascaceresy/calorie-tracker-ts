import { useState, type ActionDispatch, type ChangeEvent, type SubmitEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import categories from "../data/categories";
import type { ActivityType } from "../types";
import type { ActivityActionsType } from "../reducers/activityReducer";

type ActivityFormmProps = {
  dispatch: ActionDispatch<[action: ActivityActionsType]>;
};

const ActivityForm = ({ dispatch }: ActivityFormmProps) => {
  const initialStateForm: ActivityType = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0,
  };

  const [activity, setActivity] = useState<ActivityType>(initialStateForm);

  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setActivity({
      ...activity,
      [e.target.id]: e.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;

    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "saveActivity", payload: { newActivity: activity } });

    setActivity({ ...initialStateForm, id: uuidv4() });
  };

  return (
    <form className="space-y-5 bg-white shadow-lg p-10 rounded-lg" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoría:
        </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map(category => (
            <option key={`category-option-${category.id}`} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>
        <input
          id="name"
          className="border border-slate-300 p-2 rounded-lg w-full"
          placeholder="Ej. Comida, Jugo de Naranja, Ejercicio, Pesas, Bicicleta"
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorías:
        </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg w-full"
          placeholder="Ej. 100, 200, 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 hover:cursor-pointer uppercase font-bold p-2 text-white w-full rounded-lg disabled:opacity-50"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejecicio"}
        disabled={!isValidActivity()}
      />
    </form>
  );
};

export default ActivityForm;
