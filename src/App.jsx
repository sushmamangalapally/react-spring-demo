// App.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const fetchMessages = async () => {
    const res = await axios.get("http://localhost:8080/messages");
    console.log(res)
    setMessages(res.data);
  };

  const sendMessage = async () => {
    await axios.post("http://localhost:8080/messages", { content: input });
    setInput("");
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Message Board!!!</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write a message"
      />
      <button onClick={sendMessage}>Send</button>
      <ul>
        {messages.map((msg, idx) => {
          const mess = JSON.parse(msg);
          return (
          <li key={idx}>{mess.content}</li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
