import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import TodoList from "./todoList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TodoList />
    </QueryClientProvider>
  </React.StrictMode>,
)
