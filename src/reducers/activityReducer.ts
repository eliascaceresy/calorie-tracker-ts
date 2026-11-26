import type { ActivityType } from "../types";

export type ActivityActionsType = {
  type: "saveActivity";
  payload: { newActivity: ActivityType };
};

type ActivityStateType = {
  activities: ActivityType[];
};

export const initialState: ActivityStateType = {
  activities: [],
};

export const activityReducer = (state: ActivityStateType = initialState, action: ActivityActionsType) => {
  if (action.type === "saveActivity") {
    return {
      ...state,
      activities: [...state.activities, action.payload.newActivity],
    };
  }
};
