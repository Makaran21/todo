import db from "@/config/firebase/firebase.config";
import { ITodoItem } from "@/model/todo.model";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

const todoRef = collection(db, "todo");

const addTodoDoc = async (todo: ITodoItem) => {
  try {
    const res = await addDoc(todoRef, todo);

    return res.id;
  } catch (error) {
    return null;
  }
};

const getTodoList = async () => {
  try {
    const todoList: ITodoItem[] = [];

    const querySnapshot = await getDocs(
      query(todoRef, orderBy("createdAt", "desc"))
    );

    querySnapshot.forEach((doc) => {
      todoList.push({ id: doc.id, ...(doc.data() as ITodoItem) });
    });

    return JSON.parse(JSON.stringify(todoList));
  } catch (error) {
    return [];
  }
};

const updateTodoDoc = async (todo: Partial<ITodoItem>) => {
  try {
    if (todo.id) {
      await updateDoc(doc(db, "todo", todo.id), todo);
    }
  } catch (error) {
    return null;
  }
};

const deleteTodo = async (id: string) => {
  await deleteDoc(doc(db, "todo", id));
};

export { addTodoDoc, getTodoList, updateTodoDoc, deleteTodo };
