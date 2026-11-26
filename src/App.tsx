import { useEffect, useReducer } from "react";
import ActivityForm from "./components/ActivityForm";
import { activityReducer, initialState } from "./reducers/activityReducer";
import ActivitiesList from "./components/ActivitiesList";

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

  return (
    <>
      <header className="bg-lime-700 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">Contador de Calorías</h1>
        </div>
      </header>
      <section className="bg-lime-100 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <ActivityForm dispatch={dispatch} activityEdit={(state ?? initialState).activityEdit!} />
        </div>
      </section>
      <section className="bg-lime-100 p-5">
        <div className="max-w-4xl mx-auto">
          <ActivitiesList activities={state?.activities ?? []} dispatch={dispatch} />
        </div>
      </section>
    </>
  );
}

export default App;
