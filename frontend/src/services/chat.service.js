import { io } from "socket.io-client";
import useUserStore from "../store/useUserStore";

let socket = null;

export const initializeSocket = () => {
  if (socket) return socket;

  const user = useUserStore.getState().user;
  
  if (!user?._id) return null;

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";
  
  socket = io(BACKEND_URL, {
    withCredentials: true,
    transports: ["websocket", "polling"],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  // Connection events
  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
    socket.emit("user_connected", user._id);
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initializeSocket();
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
