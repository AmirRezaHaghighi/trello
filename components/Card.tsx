"use client";

import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import styles from "@/styles/card.module.scss";
import { CardType } from "@/types/board";
import { BsGripVertical } from "react-icons/bs";
import CommentsModal from "./CommentsModal";

interface Props {
  card: CardType;
  columnId: string;
}

export default function Card({ card, columnId }: Props) {
  const [open, setOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: `${columnId}:${card.id}`,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={styles.card}
      >
        <div className={styles.cardHeader}>
          <span
            {...attributes}
            {...listeners}
            className={styles.dragHandle}
          >
            <BsGripVertical />
          </span>

          <div className={styles.title}>{card.title}</div>
        </div>

        <div className={styles.cardFooter}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
            className={styles.btnComment}
          >
            Comments {card.comments.length}
          </button>
        </div>
      </div>

      {open && (
        <CommentsModal
          columnId={columnId}
          cardId={card.id}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}