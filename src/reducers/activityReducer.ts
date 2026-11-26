import type { ActivityType } from "../types";

export type ActivityActionsType =
  | { type: "saveActivity"; payload: { newActivity: ActivityType } }
  | { type: "editActivity"; payload: { activity: ActivityType } }
  | { type: "updateActivity"; payload: { activity: ActivityType } }
  | { type: "deleteActivity"; payload: { activityId: ActivityType["id"] } };

type ActivityStateType = {
  activities: ActivityType[];
  activityEdit: ActivityType;
};

const localActivities = () => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
};

export const initialState: ActivityStateType = {
  activities: localActivities(),
  activityEdit: {} as ActivityType,
};

export const activityReducer = (state: ActivityStateType = initialState, action: ActivityActionsType) => {
  if (action.type === "saveActivity") {
    return {
      ...state,
      activities: [...state.activities, action.payload.newActivity],
    };
  }
  if (action.type === "editActivity") {
    return {
      ...state,
      activityEdit: action.payload.activity,
    };
  }
  if (action.type === "updateActivity") {
    return {
      ...state,
      activities: state.activities.map(current =>
        current.id === action.payload.activity.id ? action.payload.activity : current,
      ),
      activityEdit: {},
    };
  }
  if (action.type === "deleteActivity") {
    return {
      ...state,
      activities: state.activities.filter(a => a.id !== action.payload.activityId),
    };
  }
};
