import type { ColumnType } from "@/types/board";

const BOARD_STORAGE_KEY = "board";

export const loadBoardFromStorage = (): ColumnType[] => {
  // Safely handle SSR / server components
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const data = localStorage.getItem(BOARD_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load board from localStorage:", error);
    return [];
  }
};

export const saveBoardToStorage = (columns: ColumnType[]) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(BOARD_STORAGE_KEY, JSON.stringify(columns));
  } catch (error) {
    console.error("Failed to save board to localStorage:", error);
  }
};

export const clearBoardStorage = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(BOARD_STORAGE_KEY);
};