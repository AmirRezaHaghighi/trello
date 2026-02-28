import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import Column from "./Column";
import { useBoardStore } from "@/store/useBoardStore";
import styles from "@/styles/board.module.scss";
import AddColumn from "./AddColumn";


export default function Board() {
  const columns = useBoardStore(s => s.columns);
  const moveCard = useBoardStore(s => s.moveCard);
  const moveColumn = useBoardStore(s => s.moveColumn);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId  = over.id as string;

    // ── Case 1: Moving a CARD ───────────────────────────────
    if (activeId.includes(":")) {        
      const [fromColumnId, cardId] = activeId.split(":");
      const [toColumnId, overCardId] = overId.split(":");

     
      if (overCardId) {
        const toColumn = useBoardStore.getState().columns.find(c => c.id === toColumnId);
        if (!toColumn) return;

        const index = toColumn.cards.findIndex(c => c.id === overCardId);
        if (index === -1) return;

        moveCard(fromColumnId, toColumnId, cardId, index);
      }
      
      else if (toColumnId) {
       
        moveCard(fromColumnId, toColumnId, cardId, -1); // -1 = append
      }
    }

    // ── Case 2: Moving a COLUMN (optional) ───────────────────
    else if (!activeId.includes(":")) {
      const oldIndex = columns.findIndex(c => c.id === activeId);
      const newIndex = columns.findIndex(c => c.id === overId);
      if (oldIndex !== newIndex) {
        moveColumn(activeId, newIndex);
      }
    }
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter} 
    >
      <SortableContext
        items={columns.map(c => c.id)}          
        strategy={horizontalListSortingStrategy}
      >
         <div className={styles.header}>
          <h1>Trello Board</h1>
         </div>
        <div className={styles.board}>
          {columns.map(column => (
            <Column key={column.id} column={column} />
          ))}

          {/* Add list button */}
          <AddColumn/>
        </div>
      </SortableContext>
    </DndContext>
  );
}