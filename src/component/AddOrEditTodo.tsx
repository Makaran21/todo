import { ITodoItem } from "@/model/todo.model";
import React, { ChangeEvent, FormEvent } from "react";

type AddOrEditTodoType = {
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => void;
  onChangeTodoName: (e: ChangeEvent<HTMLInputElement>) => void;
  currentTodo: ITodoItem;
};

export default function AddOrEditTodo({
  onSubmitHandler,
  onChangeTodoName,
  currentTodo,
}: AddOrEditTodoType) {
  return (
    <form onSubmit={onSubmitHandler}>
      <input type="text" value={currentTodo.todo} onChange={onChangeTodoName} />
      <button type="submit">Add</button>
    </form>
  );
}
