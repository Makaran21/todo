"use client";

import { ITodoItem } from "@/model/todo.model";
import { addTodoDoc, deleteTodo, updateTodoDoc } from "@/services/todo.service";
import { Timestamp } from "firebase/firestore";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";

const initialTodo = {
  todo: "",
  isCompleted: false,
};

export default function useTodo(initialTodoList: ITodoItem[]) {
  const [currentTodo, setCurrentTodo] = useState<ITodoItem>(initialTodo);
  const [list, setList] = useState<ITodoItem[]>(initialTodoList);

  const validateTodoItem = (todo: string) => {
    const isExisted = list.find((item) => item.todo === todo);
    const isEmpty = todo === "";

    const isValid = !isExisted && !isEmpty;

    if (!isValid) {
      alert("Existed or Empty");
      return false;
    }

    return isValid;
  };

  const onResetCurrentTodo = () => {
    setCurrentTodo(initialTodo);
  };

  const onRemoveTodo = (id: string) => {
    setList((prev) => prev.filter((item) => item.id !== id));
    deleteTodo(id);
  };

  const onChangeTodoName = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTodo((prev) => ({
      ...prev,
      todo: e.target.value,
    }));
  };

  const onCheckHandler = (id: string, value: boolean) => {
    setList((prev) =>
      prev.map((item) => {
        if (item.id === id) return { ...item, isCompleted: value };
        return item;
      })
    );

    updateTodoDoc({ id, isCompleted: value });
  };

  const addTodo = async (todo: ITodoItem) => {
    const todoId = await addTodoDoc(todo);

    if (todoId) {
      setList((prev) => [{ ...todo, id: todoId }, ...prev]);
    }
  };

  const updateTodo = async (todo: ITodoItem) => {
    await updateTodoDoc(todo);

    setList((prev) =>
      prev.map((item) => {
        if (item.id === todo.id) return todo;
        return item;
      })
    );
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateTodoItem(currentTodo.todo);

    if (!isValid) return;

    const todo: ITodoItem = {
      ...currentTodo,
      createdAt: Timestamp.fromDate(new Date()),
    };

    if (todo.id) {
      updateTodo(todo);
    } else {
      addTodo(todo);
    }

    onResetCurrentTodo();
  };

  const filteredList = useMemo(() => {
    if (currentTodo.todo !== "") {
      return list.filter((item) => item.todo.includes(currentTodo.todo));
    }
    return list;
  }, [currentTodo, list]);

  return {
    list: filteredList,
    currentTodo,
    setCurrentTodo,
    onCheckHandler,
    onSubmitHandler,
    onRemoveTodo,
    onChangeTodoName,
    onResetCurrentTodo,
  };
}
