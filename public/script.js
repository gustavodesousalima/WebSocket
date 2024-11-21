window.addEventListener("load", (event) => {
    const path = window.location.pathname;
    const title = path.substring(1);
  
    const socket = io();
    socket.emit("enter-document", title);
  
    const textArea = document.getElementsByTagName("textarea")[0];
    textArea.addEventListener("keyup", (event) => {
      socket.emit("update-document", {
        title,
        content: textArea.value
      });
    });
  
    socket.on("sync-document", (content) => textArea.value = content);
  });