import { ReactElement } from "react"
import { TodoItem } from "./todoItem";
import { NewItem } from "./newItem";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserTask } from "shared/src/model";

function TodoList() {
  const { isPending, isError, data, error } = useQuery<UserTask[]>({
    queryKey: ["todos"],
    queryFn: () => axios
      .get("http://localhost:3000/todos")
      .then((res) => res.data)
  })

  if (isPending) return "loading";
  if (isError) return "An error has occured: " + error.message;

  const items: ReactElement[] = [];
  data.sort((a, b) => a.text.localeCompare(b.text)).forEach(f => {
    items.push(<TodoItem t={f} key={f.id} />);
  })

  return (
    <fieldset className="container max-w-sm mx-auto px-4 space-y-3">
      <legend>TODO</legend>

      {items}
      <NewItem />
    </fieldset>
  )
}

export default TodoList
