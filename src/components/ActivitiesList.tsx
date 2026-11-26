import type { ActivityType } from "../types";
import categories from "../data/categories";

type ActivitiesListProps = {
  activities: ActivityType[];
};

const ActivitiesList = ({ activities }: ActivitiesListProps) => {
  const activityCategoryName = (categoryId: number) =>
    categories.find(category => category.id === categoryId)?.name ?? "Categoría desconocida";

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
          <div></div>
        </div>
      ))}
    </>
  );
};

export default ActivitiesList;
