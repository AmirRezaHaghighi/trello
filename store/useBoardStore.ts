import { ColumnType } from "@/types/board";
import { loadBoardFromStorage, saveBoardToStorage } from "@/utils/storage";
import { arrayMove } from "@dnd-kit/sortable";
import { create } from "zustand";
interface BoardState {
  columns: ColumnType[];

  addColumn: (title: string) => void;
  addCard: (columnId: string, title: string) => void;
  moveCard: (
    fromColumnId: string,
    toColumnId: string,
    cardId: string,
    index: number
  ) => void;
  renameColumn: (columnId: string, title: string) => void;
  deleteColumn: (columnId: string) => void;
  moveColumn: (columnId: string, newIndex: number) => void;
  addComment: (columnId: string, cardId: string, text: string) => void;
  clearColumnCards: (columnId: string) => void;
}

const INITIAL_BOARD: ColumnType[] = [
  {
    id: "todo",
    title: "Todo",
    cards: [
      { id: "1", title: "Task 1", comments: [] },
      { id: "2", title: "Task 2", comments: [] },
    ],
  },
  {
    id: "inprogress",
    title: "In Progress",
    cards: [],
  },
  {
    id: "done",
    title: "Done",
    cards: [],
  },
];

const loaded = loadBoardFromStorage();
const initialColumns = loaded.length > 0 ? loaded : INITIAL_BOARD;


export const useBoardStore = create<BoardState>((set) => ({
  columns: initialColumns,

  addColumn: (title) =>
    set((state) => {
      const updated = [
        ...state.columns,
        { id: crypto.randomUUID(), title, cards: [] },
      ];
      saveBoardToStorage(updated);
      return { columns: updated };
    }),

  addCard: (columnId, title) =>
    set((state) => {
      const updated = state.columns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: [
                ...col.cards,
                { id: crypto.randomUUID(), title, comments: [] },
              ],
            }
          : col
      );
      saveBoardToStorage(updated);
      return { columns: updated };
    }),

  moveCard: (fromColumnId, toColumnId, cardId, index) =>
    set((state) => {
      const columns = [...state.columns];
      const fromCol = columns.find((c) => c.id === fromColumnId)!;
      const toCol = columns.find((c) => c.id === toColumnId)!;
      const card = fromCol.cards.find((c) => c.id === cardId)!;

      fromCol.cards = fromCol.cards.filter((c) => c.id !== cardId);
      toCol.cards.splice(index, 0, card);

      saveBoardToStorage(columns);
      return { columns };
    }),

  addComment: (columnId, cardId, text) =>
    set((state) => {
      const updated = state.columns.map((col) => {
        if (col.id !== columnId) return col;
        return {
          ...col,
          cards: col.cards.map((card) =>
            card.id === cardId
              ? {
                  ...card,
                  comments: [
                    ...card.comments,
                    {
                      id: crypto.randomUUID(),
                      text,
                      createdAt: new Date().toLocaleString(),
                    },
                  ],
                }
              : card
          ),
        };
      });
      saveBoardToStorage(updated);
      return { columns: updated };
    }),

  renameColumn: (columnId, title) =>
    set((state) => {
      const updated = state.columns.map((col) =>
        col.id === columnId ? { ...col, title } : col
      );
      saveBoardToStorage(updated);
      return { columns: updated };
    }),

  deleteColumn: (columnId) =>
    set((state) => {
      const updated = state.columns.filter((col) => col.id !== columnId);
      saveBoardToStorage(updated);
      return { columns: updated };
    }),

  moveColumn: (columnId: string, newIndex: number) => set((state) => {
    const oldIndex = state.columns.findIndex(c => c.id === columnId);
    if (oldIndex === -1 || oldIndex === newIndex) return state;

    return {
      columns: arrayMove(state.columns, oldIndex, newIndex)
    };
  }),

  clearColumnCards: (columnId) =>
    set((state) => {
      const updated = state.columns.map((col) =>
        col.id === columnId ? { ...col, cards: [] } : col
      );
      saveBoardToStorage(updated);
      return { columns: updated };
    }),
}));