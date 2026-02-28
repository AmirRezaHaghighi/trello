"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useBoardStore } from "@/store/useBoardStore";
import { BsGripVertical } from "react-icons/bs";

import { ColumnType } from "@/types/board";
import AddCard from "./AddCard";
import Card from "./Card";
import ColumnMenu from "./ColumnMenu";
import styles from "@/styles/column.module.scss";

interface Props {
  column: ColumnType;
}

export default function Column({ column }: Props) {
  // DnD Sortable
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: column.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Local state
  const [showAddCard, setShowAddCard] = useState(false);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(column.title);

  // Board actions
  const renameColumn = useBoardStore((s) => s.renameColumn);
  const deleteColumn = useBoardStore((s) => s.deleteColumn);
  const clearColumnCards = useBoardStore((s) => s.clearColumnCards);

  // Handlers
  const handleRename = () => {
    if (title.trim() !== "") {
      renameColumn(column.id, title);
    }
    setEditing(false);
  };

  const handleDelete = () => {
    const confirmDelete = confirm("Delete this column and all its cards?");
    if (confirmDelete) deleteColumn(column.id);
  };

  return (
    <div ref={setNodeRef} style={style} className={styles.column}>
      {/* Column Header */}
      <div className={styles.header}>
        {/* LEFT SIDE: Drag handle + title */}
        <div className={styles.leftSection}>
          <span {...attributes} {...listeners} className={styles.dragHandle}>
            <BsGripVertical />
          </span>

          {editing ? (
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleRename}
              autoFocus
              className={styles.titleInput}
            />
          ) : (
            <h2 className={styles.title}>{column.title}</h2>
          )}
        </div>

        {/* RIGHT SIDE: Menu */}
        <ColumnMenu
          columnId={column.id}
          onEdit={() => setEditing(true)}
          onDelete={handleDelete}
          onClearCards={() => clearColumnCards(column.id)}
        />
      </div>

      {/* Cards */}
      <div className={styles.cardsWrapper}>
        {column.cards.map((card) => (
          <Card key={card.id} card={card} columnId={column.id} />
        ))}
      </div>

      {/* Add Card */}
      {showAddCard ? (
        <AddCard
          columnId={column.id}
          onClose={() => setShowAddCard(false)}
        />
      ) : (
        <button
          className={styles.fullBtn}
          onClick={() => setShowAddCard(true)}
        >
          + Add another card
        </button>
      )}
    </div>
  );
}