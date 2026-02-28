"use client";

import { useState, useRef, useEffect } from "react";
import { useBoardStore } from "@/store/useBoardStore";
import { BsXLg } from "react-icons/bs";
import styles from "@/styles/modal.module.scss";

interface Props {
  columnId: string;
  cardId: string;
  onClose: () => void;
}

export default function CommentsModal({
  columnId,
  cardId,
  onClose,
}: Props) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { columns, addComment } = useBoardStore();

  const column = columns.find((c) => c.id === columnId);
  const card = column?.cards.find((c) => c.id === cardId);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  if (!card) return null;

  const handleAdd = () => {
    if (!text.trim()) return;
    addComment(columnId, cardId, text.trim());
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
         <h4>{`Comments for "${card.title}"`}</h4>

          <button
            className="iconBtn"
            onClick={onClose}
            aria-label="Close"
          >
            <BsXLg />
          </button>
        </div>

        <div className={styles.comments}>
          {card.comments.length === 0 && (
            <p className={styles.emptyState}>
              No comments yet. Be the first to comment!
            </p>
          )}

          {card.comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <div className={styles.meta}>
                You · {comment.createdAt}
              </div>
              <div className={styles.text}>
                {comment.text}
              </div>
            </div>
          ))}
        </div>

        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a comment..."
          className={`textarea ${styles.commentInput}`}
          rows={3}
        />

        <div className={styles.footer}>
          <button
            className={styles.addBtn}
            onClick={handleAdd}
            disabled={!text.trim()}
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
}