import app from "../app";

export default async function handler(req: any, res: any) {
  await new Promise<void>((resolve) => app(req, res, () => resolve()));
}
