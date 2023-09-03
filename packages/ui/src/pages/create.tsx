
import { Form, useActionData } from "react-router-dom"
import { Input } from "../components/Input"
import React from "react";


function CopyInput({
  value
} : {
  value: string
}) {
  const ref = React.useRef<HTMLInputElement>(null);

  const handleCopy = React.useCallback(() => {
    if (ref.current) {
      ref.current.select();
      navigator.clipboard.writeText(ref.current.value);
    }
  }, [ref]);

  return (
    <Input ref={ref} value={value} readOnly onClick={handleCopy}/>
  )
}


function CreateForm() {
  return (
    <Form method="post" className="flex gap-2 max-w-xl">
      <Input name="url" className="flex-1" type="text" placeholder="URL" />
      <button type="submit" className="bg-slate-500 hover:bg-slate-600 p-2 rounded border border-slate-500">Create</button>
    </Form>
  )
}


export function CreatePage() {

  const submitted = useActionData() as { code: number, message: string, payload: { key: string, url: string } } | undefined;

  return (
    <main className="mx-20 mt-5">
      <h1 className="text-xl">Create</h1>
      <hr className="my-2"/>
      {submitted?.code === 200 ? (
        <div className="bg-slate-500 text-white p-2 rounded">
          <p className="text-sm">Your link has been created!</p>
          <p className="text-sm">Key: {submitted.payload.key}</p>
          <p className="text-sm">URL: <CopyInput value={submitted.payload.url}/></p>
        </div>
      ) : (
        <CreateForm />
      )}
    </main>
  )
}
