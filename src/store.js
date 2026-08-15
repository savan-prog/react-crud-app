import { configureStore } from "@reduxjs/toolkit";
import crudReducer from "./crud/crudSlice";

const savedData = localStorage.getItem("crudData");

export const store = configureStore({
  reducer: {
    crud: crudReducer,
  },
  preloadedState: savedData
    ? {
        crud: {
          arr: JSON.parse(savedData),
        },
      }
    : undefined,
});

// Redux Store ko bolo ki jab bhi store me koi change ho, ye function chala dena store.subscribe()
store.subscribe(() => {
  const crudData = store.getState().crud.arr; //Ye Redux Store se current/latest data nikal rahi hai. store.getState()Pura Redux state deta hai.

  localStorage.setItem("crudData", JSON.stringify(crudData));
});
