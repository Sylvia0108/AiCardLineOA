import { useContext } from "react";
import { LiffContext } from "./LiffContext.js";

export const useLiff = () => {
  const context = useContext(LiffContext);
  if (!context) {
    throw new Error("useLiff must be used within a LiffProvider");
  }
  return context;
};
