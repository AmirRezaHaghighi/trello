"use client";

import { useState, useEffect, useRef } from "react";
import { useBoardStore } from "@/store/useBoardStore";
import { BsXLg } from "react-icons/bs";
import styles from "@/styles/addCard.module.scss";

interface Props {
  columnId: string;
  onClose: () => void;
}

export default function AddCard({ columnId, onClose }: Props) {
  const [title, setTitle] = useState("");
  const addCard = useBoardStore((s) => s.addCard);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleAdd = () => {
    if (!title.trim()) return;
    addCard(columnId, title.trim());
    setTitle("");
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className={styles.wrapper}>
      <textarea
        ref={textareaRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter a card title..."
        className="textarea"
        rows={3}
      />

      <div className={styles.actions}>
        <button
          className={styles.createBtn}
          onClick={handleAdd}
          disabled={!title.trim()}
        >
          Create Card
        </button>

        <button
          className={styles.cancelBtn}
          onClick={onClose}
          aria-label="Cancel"
        >
          <BsXLg />
        </button>
      </div>
    </div>
  );
}