"use client";

import { useEffect, useRef, useState } from "react";
import { BsThreeDots, BsTrashFill, BsPencil } from "react-icons/bs";
import styles from "@/styles/columnMenu.module.scss";

interface Props {
  columnId: string;
  onEdit: () => void;
  onDelete: () => void;
  onClearCards: () => void;
}

export default function ColumnMenu({
  columnId,
  onEdit,
  onDelete,
  onClearCards,
}: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className={styles.menuWrapper}>
      <button
        className={styles.iconBtn}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      >
        <BsThreeDots />
      </button>

      {open && (
        <div
          className={styles.dropdown}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className={`${styles.menuItem} ${styles.edit}`}
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
          >
            <BsPencil /> Edit column
          </button>

          <button
            className={`${styles.menuItem} ${styles.danger}`}
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
          >
            <BsTrashFill /> Delete List
          </button>

          <button
            className={`${styles.menuItem} ${styles.danger}`}
            onClick={() => {
              const confirmDelete = confirm(
                "Are you sure you want to delete all cards in this column?"
              );
              if (confirmDelete) onClearCards();
              setOpen(false);
            }}
          >
            <BsTrashFill /> Delete All Cards
          </button>
        </div>
      )}
    </div>
  );
}