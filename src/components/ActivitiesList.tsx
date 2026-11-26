import type { ActionDispatch } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import type { ActivityType } from "../types";
import categories from "../data/categories";
import type { ActivityActionsType } from "../reducers/activityReducer";

type ActivitiesListProps = {
  activities: ActivityType[];
  dispatch: ActionDispatch<[action: ActivityActionsType]>;
};

const ActivitiesList = ({ activities, dispatch }: ActivitiesListProps) => {
  const activityCategoryName = (categoryId: number) =>
    categories.find(category => category.id === categoryId)?.name ?? "Categoría desconocida";

  const handleEdit = (activity: ActivityType) => {
    dispatch({ type: "editActivity", payload: { activity } });
  };

  const handleDelete = (id: ActivityType["id"]) => {
    dispatch({ type: "deleteActivity", payload: { activityId: id } });
  };

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y Actividades</h2>
      {activities.map(activity => (
        <div key={activity.id} className="px-5 py-4 bg-white mt-5 flex justify-between rounded-lg shadow-lg">
          <div className="space-y-3 relative">
            <p
              className={`absolute -top-2 -left-1 px-1 py-1 text-white font-bold rounded-lg ${activity.category === 1 ? "bg-lime-400" : "bg-red-400"}`}
            >
              {activityCategoryName(activity.category)}
            </p>
            <p className="text-2xl font-bold pt-5 mt-3">{activity.name}</p>
            <p className="text-4xl font-black text-lime-500">
              {activity.calories} <span>Calorias</span>
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <button className="hover:cursor-pointer" title="Editar" onClick={() => handleEdit(activity)}>
              <PencilSquareIcon className="h-8 w-8 text-gray-800" />
            </button>
            <button className="hover:cursor-pointer" title="Eliminar" onClick={() => handleDelete(activity.id)}>
              <TrashIcon className="h-8 w-8 text-red-800" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ActivitiesList;
