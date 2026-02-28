"use client";

import { useState, useRef, useEffect } from "react";
import { useBoardStore } from "@/store/useBoardStore";
import { BsXLg } from "react-icons/bs";
import styles from "@/styles/addColumn.module.scss";

export default function AddColumn() {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addColumn = useBoardStore((s) => s.addColumn);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const handleAdd = () => {
    if (!title.trim()) return;
    addColumn(title.trim());
    setTitle("");
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  if (!open) {
    return (
      <button
        className={styles.addTrigger}
        onClick={() => setOpen(true)}
      >
        + Add another list
      </button>
    );
  }

  return (
    <div className={styles.wrapper}>
      <input
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter a list title..."
        className={styles.input}
      />

      <div className={styles.actions}>
        <button
          className={styles.addBtn}
          onClick={handleAdd}
          disabled={!title.trim()}
        >
          Add list
        </button>

        <button
          className={styles.cancelBtn}
          onClick={() => {
            setTitle("");
            setOpen(false);
          }}
          aria-label="Cancel"
        >
          <BsXLg />
        </button>
      </div>
    </div>
  );
}