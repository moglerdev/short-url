import { createClient } from 'redis';


import { nanoid } from "nanoid";


export class Links {
  constructor(
    private client: ReturnType<typeof createClient>
  ) {
  }

  getShortLink = (id: string) => this.client.get("shortlink:" + id)

  getAccessCount = async (id: string) => {
    const count = await this.client.get("accesscount:" + id);
    if (count) {
      return Number(count);
    }
    return undefined;
  }

  addAccessCount = async (id: string) => {
    const count = await this.getAccessCount(id);
    if (count) {
      await this.client.set("accesscount:" + id, count + 1);
    } else {
      await this.client.set("accesscount:" + id, 1);
    }
  }

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
      accessCount: await this.getAccessCount(x.replace("shortlink:", "")),
      value: await this.client.get(x)
    })))
  }
}
