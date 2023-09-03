import { createClient } from 'redis';


import { nanoid } from "nanoid";


export class Links {
  constructor(
    private client: ReturnType<typeof createClient>
  ) {
  }

  getShortLink = (id: string) => this.client.get("shortlink:" + id)

  createShortLink = async (url: string) => {
    const newId = nanoid(5);
    await this.client.set("shortlink:" + newId, url);
    return newId;
  }

  removeShortLink = (id: string) => this.client.del("shortlink:" + id)

  getAll = async () => {
    const keys = await this.client.keys("shortlink:*")
    return await Promise.all(keys.map(async x => ({
      key: x.replace("shortlink:", ""),
      value: await this.client.get(x)
    })))
  }
}
