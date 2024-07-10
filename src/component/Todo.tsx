"use client";

import React from "react";
import AddOrEditTodo from "./AddOrEditTodo";
import useTodo from "@/hook/useTodo";
import TodoItem from "./TodoItem";
import { ITodoItem } from "@/model/todo.model";

function Todo({ todoList }: { todoList: ITodoItem[] }) {
  const {
    onSubmitHandler,
    onRemoveTodo,
    onChangeTodoName,
    onCheckHandler,
    setCurrentTodo,
    currentTodo,
    list,
  } = useTodo(todoList);

  return (
    <>
      <AddOrEditTodo
        onChangeTodoName={onChangeTodoName}
        onSubmitHandler={onSubmitHandler}
        currentTodo={currentTodo}
      />

      {list.map((item) => {
        return (
          <TodoItem
            key={item.id}
            todoItem={item}
            onCheckHandler={onCheckHandler}
            onRemoveTodo={onRemoveTodo}
            onEditTodo={(todo) => setCurrentTodo(todo)}
          />
        );
      })}

      {list.length === 0 && (
        <>
          <p>No result, create new one instead!</p>
        </>
      )}
    </>
  );
}

export default Todo;
