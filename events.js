import { updateDocument } from "./repository.js";

export function setupEvents(io) {
  io.on("connection", (socket) => {

    socket.on("enter-document", title => {
      socket.join(title);
    })

    socket.on("update-document", async ({ title, content }) => {
      await updateDocument(title, content);

      socket.to(title).emit("sync-document", content);
    });
  });
}