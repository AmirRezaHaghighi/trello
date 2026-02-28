# Trello Clone

A modern **Trello-inspired** kanban board built with **Next.js 16**, **React 19**, **TypeScript**, **Zustand**, and **@dnd-kit** for drag-and-drop.

## Features

- Create, rename and delete columns (lists)
- Add, move (drag & drop), and delete cards
- Drag & drop cards **between columns** and reorder within the same column
- Reorder columns horizontally
- LocalStorage persistence (board state saved in browser)
- Responsive design (mobile-friendly layout)
- Clean TypeScript types & Zustand store
- Modern UI with SCSS modules

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **State Management**: Zustand
- **Drag & Drop**: @dnd-kit (core + sortable + utilities)
- **Styling**: SCSS modules
- **Icons**: react-icons
- **UUID**: uuid
- **Linting/Formatting**: ESLint + Next.js config

## Prerequisites

- Node.js ≥ 20
- pnpm / yarn / npm (project uses npm by default)

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/AmirRezaHaghighi/trello.git
cd trello-clone

# 2. Install dependencies
npm install
# or
yarn install
# or
pnpm install

```
## Development

```bash
# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev

# Open http://localhost:3000
```

## Project Structure

```text
trello-clone/
├── app/
│   ├── components/
│   │   ├── Board.tsx
│   │   ├── Column.tsx
│   │   ├── Card.tsx
│   │   ├── AddCard.tsx
│   │   ├── AddColumn.tsx
│   │   └── ... (other UI components)
│   ├── layout.tsx
│   ├── page.tsx               ← main page that renders <Board />
│   └── globals.css            (if using global styles)
├── store/
│   └── useBoardStore.ts       ← Zustand store with board state & actions
├── types/
│   └── board.ts               ← TypeScript interfaces (ColumnType, CardType, etc.)
├── lib/                       (optional)
│   └── storage.ts             ← localStorage helpers (load/save board)
├── styles/
│   ├── board.module.scss
│   ├── column.module.scss
│   ├── card.module.scss
│   ├── addCard.module.scss
│   ├── addColumn.module.scss
│   └── globals.scss
├── public/                    ← static assets (images, favicon, etc.)
├── .eslintrc.json             (or eslint.config.js)
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md

```

## Local Storage
The board state is automatically saved to localStorage under the key "board".
To reset the board:

```bash
JavaScriptlocalStorage.removeItem("board");
```