import { useCallback, useEffect, useReducer } from "react";
import ActivityForm from "./components/ActivityForm";
import { activityReducer, initialState } from "./reducers/activityReducer";
import ActivitiesList from "./components/ActivitiesList";
import CaloriesTacker from "./components/CaloriesTacker";

function App() {
  const [state, dispatch] = useReducer(
    activityReducer as (
      state: typeof initialState | undefined,
      action: Parameters<typeof activityReducer>[1],
    ) => typeof initialState | undefined,
    initialState,
  );

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state?.activities));
  }, [state?.activities]);

  const handleReset = useCallback(() => {
    dispatch({ type: "resetApp" });
  }, [dispatch]);

  return (
    <>
      <header className="bg-lime-700 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">Contador de Calorías</h1>
          <button
            type="button"
            className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:bg-gray-500"
            onClick={handleReset}
            disabled={state?.activities.length === 0}
          >
            Reiniciar App
          </button>
        </div>
      </header>
      <section className="bg-lime-50 p-5">
        <div className="max-w-4xl mx-auto">
          <ActivityForm dispatch={dispatch} activityEdit={(state ?? initialState).activityEdit!} />
        </div>
      </section>
      <section className="bg-lime-50 p-5">
        <div className="max-w-4xl mx-auto bg-white p-5 rounded-lg shadow-lg">
          <CaloriesTacker activities={state?.activities ?? []} />
        </div>
      </section>
      <section className="bg-lime-50 p-5">
        <div className="max-w-4xl mx-auto bg-white p-5 rounded-lg shadow-lg">
          <ActivitiesList activities={state?.activities ?? []} dispatch={dispatch} />
        </div>
      </section>
    </>
  );
}

export default App;
