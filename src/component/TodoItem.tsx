"use client";

import { ITodoItem } from "@/model/todo.model";
import { useState } from "react";

type TodoItemType = {
  todoItem: ITodoItem;
  onCheckHandler: (id: string, value: boolean) => void;
  onRemoveTodo: (id: string) => void;
  onEditTodo: (todo: ITodoItem) => void;
};

export default function TodoItem({
  todoItem,
  onCheckHandler,
  onRemoveTodo,
  onEditTodo,
}: TodoItemType) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative" }}
    >
      <div>
        <span
          style={{ textDecoration: todoItem.isCompleted ? "line-through" : "" }}
        >
          {todoItem.todo}
        </span>
        <input
          type="checkbox"
          onChange={(e) => {
            if (todoItem.id) onCheckHandler(todoItem.id, e.target.checked);
          }}
          checked={todoItem.isCompleted}
        />
        {isHovered && (
          <>
            <button onClick={() => todoItem.id && onRemoveTodo(todoItem.id)}>
              Remove
            </button>
            <button onClick={(e) => onEditTodo(todoItem)}>Edit</button>
          </>
        )}
      </div>
    </div>
  );
}
