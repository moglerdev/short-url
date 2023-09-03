import React from "react";
import { FaTrash, FaExternalLinkAlt } from "react-icons/fa";
import { Input } from "./Input";
import { Form } from "react-router-dom";

export interface ILink {
  key: string;
  value: string;
  url: string;
  accessCount: number | undefined;
}

function LinkListEntry({
  link
} : {
  link: ILink
}) {
  const ref = React.useRef<HTMLInputElement>(null);

  const handleCopy = React.useCallback(() => {
    if (ref.current) {
      ref.current.select();
      navigator.clipboard.writeText(ref.current.value);
    }
  }, [ref]);

  return (
    <div className="p-2 bg-slate-500">
    <pre className="text-sm">{link.value}</pre>
      <div className="space-x-4 block">
        <Input ref={ref} value={link.url} readOnly onClick={handleCopy}/>
        <Form action={"/delete/" + link.key} method="POST" className="inline-block">
          <button type="submit" className=" text-red-300 hover:text-red-500 bg-slate-500 p-2 rounded">
            <FaTrash />
          </button>
        </Form>
        <a className="inline-block text-blue-300 hover:text-blue-500" target="_blank" href={link.value}>
          <FaExternalLinkAlt />
        </a>
      </div>
      <p className="text-sm">This link was <b>{link.accessCount ? `${link.accessCount} times` : "never clicked"}</b> clicked!</p>
    </div>
  )
}

export function LinkList({
  links
} : {
  links: ILink[] 
}) {
  return (
    <div className="bg-slate-600 rounded inline-block p-2 space-y-2">
      {links.map(link => (
        <LinkListEntry key={link.key} link={link}/>
      ))}
    </div>
  )
}
