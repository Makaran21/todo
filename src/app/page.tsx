import Todo from "@/component/Todo";
import { getTodoList } from "@/services/todo.service";

export default async function Home() {
  const todoList = await getTodoList();

  return (
    <main>
      <Todo todoList={todoList} />
    </main>
  );
}
