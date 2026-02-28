export interface Comment {
  id: string;
  text: string;
  createdAt: string;
}

export interface CardType {
  id: string;
  title: string;
  comments: Comment[];
}

export interface ColumnType {
  id: string;
  title: string;
  cards: CardType[];
}