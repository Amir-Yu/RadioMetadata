const dotenv = require("dotenv");
const io = require("socket.io-client");
const counter = require("./counters");

dotenv.config({ path: "./config.env" });
const channelsList = process.env.CHANNEL_NAMES.split(",").map(x => x.trim());

const socket = io(process.env.SERVICE_URL);
// const socket = io(process.env.SERVICE_URL, {
//   path: "/socket.io/",
//   transports: ["polling", "websocket"]
// });

socket.on("connect", () => {
  let formatedDate = new Date().toLocaleString();
  console.log(`Connected! to ${process.env.SERVICE_URL} @ ${formatedDate}`);

  socket.emit("join_channel", channelsList);
  channelsList.map(channel => counter.set(channel));
});

socket.on("new_airplay", data => {
  if (data) {
    console.log(JSON.stringify(data));
    counter.tick(data.channel || "null");
    console.log(counter.getStr(data.channel));
  }
});

socket.on("disconnect", () => {
  console.log("socket disconnected");
  console.log(counter.getAll());
});

socket.on("error", err => {
  console.log(err);
});

console.log("app started");

// http://www.youtube.com/watch?v={youtube_id}
// https://open.spotify.com/track/{spotify_id}
