import { useMemo } from "react";
import type { ActivityType } from "../types";

type CaloriesTrackerPropsType = {
  activities: ActivityType[];
};

const CaloriesTacker = ({ activities }: CaloriesTrackerPropsType) => {
  const consumedCalories = useMemo(() => {
    return activities.reduce((total, activity) => (activity.category === 1 ? total + activity.calories : total), 0);
  }, [activities]);

  const burnedCalories = useMemo(() => {
    return activities.reduce((total, activity) => (activity.category === 2 ? total + activity.calories : total), 0);
  }, [activities]);

  return (
    <>
      <h2 className="font-bold text-4xl text-slate-600 text-center">Resumen de Calorías</h2>
      <div className="grid md:grid-cols-3 gap-3 text-center">
        <p className="bg-lime-400 rounded-lg p-5">
          <h2 className="font-bold text-white text-center">Calorías Consumidas</h2>
          <p className="font-black text-white">{consumedCalories}</p>
        </p>
        <p className="bg-red-400 rounded-lg p-5">
          <h2 className="font-bold text-white text-center">Calorías Quemadas</h2>
          <p className="font-black text-white">{burnedCalories}</p>
        </p>
        <p className="bg-gray-400 rounded-lg p-5">
          <h2 className="font-bold text-white text-center">Balance</h2>
          <p className="font-black text-white">{consumedCalories - burnedCalories}</p>
        </p>
      </div>
    </>
  );
};

export default CaloriesTacker;
