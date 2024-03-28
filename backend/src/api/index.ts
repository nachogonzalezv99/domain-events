import "reflect-metadata";

import express from "express";
import { container } from "./shared/infraestructure/dependencyInjection/diod.config";
import { VideoPublisher } from "./video/application/VideoPublisher";

const app = express();

app.post("/videos", async (_, req) => {
  const videoPublisher = container.get(VideoPublisher);
  await videoPublisher.run("Titulo 1", "Descripción");

  req.json({message: "Video created"})
});

app.listen(3000, () => {
  console.log(`Server listening on  port ${3000}`);
});
