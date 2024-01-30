import { ReactElement, useEffect, useState } from "react"
import { Item } from "./Item";
import { NewItem } from "./newItem";

function App() {
  const [data, setData] = useState<userTask[]>();

  const fetchUpdateData = async (method: "GET" | "POST" | "PUT" | "DELETE", id: number | null, body: any | null) => {
    let url = "http://localhost:3000/tasks";
    if (method === "PUT" || method === "DELETE") {
      url += "/" + id;
    }

    console.log(method, id, body);

    if (body != null) {
      body = JSON.stringify(body);
    }

    const ret = await (
      await fetch(url, {
        method: method,
        headers: new Headers({ 'content-type': 'application/json' }),
        body: body
      })
    ).json();
    console.log("ret", ret);

    let updatedData;
    if (data == undefined) {
      updatedData = [];
    } else {
      updatedData = [...data];
    }

    if (method === "GET") {
      updatedData = ret;
    } else if (method === "PUT") {
      updatedData = data.map((v: userTask) => {
        if (v.id === id) {
          return ret;
        }
        return v;
      })
    } else if (method === "POST") {
      updatedData = [...data, ret];
    } else if (method === "DELETE") {
      updatedData = data?.filter(f => f.id !== id);
    } else {
      console.error("Methode non supporté");
    }

    console.log("updatedData", updatedData);
    setData(updatedData);
  }

  useEffect(() => {
    fetchUpdateData("GET", null, null);
  }, []);

  const onCheckChange = async (id: number) => {
    const updatedItem = data?.map((v) => {
      if (v.id !== id) return v;
      if (v.checked === 0) {
        v.checked = 1;
      } else {
        v.checked = 0;
      }
      return v;
    });
    await fetchUpdateData("PUT", id, updatedItem?.filter(f => f.id === id)[0]);
  }

  const onDelete = async (id: number) => {
    await fetchUpdateData("DELETE", id, null);
  }

  const onNewItem = async (text: string) => {
    await fetchUpdateData("POST", null, { text: text })
  }

  const onUpdate = async (id: number, text: string) => {
    await fetchUpdateData("PUT", id, { text: text });
  }

  const items: ReactElement[] = [];
  data?.forEach(f => {
    items.push(<Item t={f} key={f.id} onCheckChange={onCheckChange} onUpdate={onUpdate} onDelete={onDelete} />);
  })

  return (
    <fieldset className="container max-w-sm mx-auto px-4 space-y-3">
      <legend>TODO</legend>

      {items}
      <NewItem onNewItem={onNewItem} />
    </fieldset>
  )
}

export default App
