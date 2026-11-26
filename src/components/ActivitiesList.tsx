import type { ActivityType } from "../types";

type ActivitiesListProps = {
  activities: ActivityType[];
};

const ActivitiesList = ({ activities }: ActivitiesListProps) => {
  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y Actividades</h2>
      {activities.map(activity => (
        <div key={activity.id} className="px-5 py-2 bg-white mt-5 flex justify-between rounded-lg shadow-lg">
          <div className="space-y-2 relative">
            <p>{activity.category}</p>
            <p className="text-2xl font-bold pt-5">{activity.name}</p>
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
