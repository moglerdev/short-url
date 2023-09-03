import { useActionData } from "react-router-dom"



export function DeletePage () {
  const result = useActionData();
  return (
    <main>
      {JSON.stringify(result)}
    </main>
  )
}
