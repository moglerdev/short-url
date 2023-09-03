import { useLoaderData } from "react-router-dom"
import { ILink, LinkList } from "../components/LinkList";

export function App() {

  const urls = useLoaderData() as ILink[];

  return (
    <main className="mx-20">
      <h1 className="text-xl">App</h1>
      <hr className="my-2"/>
      <LinkList links={urls} />
    </main>
  )
}
