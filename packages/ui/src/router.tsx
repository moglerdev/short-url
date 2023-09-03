import { ActionFunction, Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/_layout";
import { App } from "./pages/app";
import { CreatePage } from "./pages/create";
import { DeletePage } from "./pages/delete";

const loader = async () => {
  return await fetch("http://localhost:3000/links/all")
}

const createAction : ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const url = formData.get("url") as string;
  const res = await fetch("http://localhost:3000/links/create", {
    method: "POST",
    body: JSON.stringify({ url }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  return await res.json();
}

const deleteAction : ActionFunction = async ({ params }) => {
  const key = params.id
  const res = await fetch("http://localhost:3000/links/delete", {
    method: "POST",
    body: JSON.stringify({ key }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  return await res.json();
}


const pages : RouteObject[] = [
  { path: "/", element: <App/>, loader },
  { path: "/create", element: <CreatePage/>, action: createAction },
  { path: "/delete/:id", element: <DeletePage/>, action: deleteAction },
]

const layout = {
  element: <Layout><Outlet/></Layout>,
  errorElement: <Layout><h1>404</h1></Layout>,
  children: pages
}

export const router = createBrowserRouter([ layout ]);
