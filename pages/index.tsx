import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../styles/home.module.css";
import { api } from "./service/api";

import io from 'Socket.IO-client'
import { randomUUID } from "crypto";
import { uuid } from "uuidv4";
let socket: any;

const Home = () => {
  const [messages, setMessages] = useState<any>([]);

  const [nick, setNick] = useState("");
  const [nickEnable, setNickEnable] = useState(false);
  const [messageText, setMessageText] = useState("");

  const socketInitializer = async () => {
    await fetch('/api/socks');
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })
    socket.on('previousMessage', function(msg: any) {
      setMessages(msg);
    });
    socket.on('receivedMessage', function(msg: any) {
      console.log("-> " + msg);
      setMessages(msg);
    });
  }

  useEffect(() => {
    socketInitializer();
  }, []);

  const handleSubmitForm = async () => {
    if (messageText) {
      const message = {
        nick,
        content: messageText,
      };
  
      socket.emit('sendMessage', message);

      setMessageText("");
      setMessages([...messages, message]);
      setNickEnable(true);
    }
  }

  return (
    <main className={styles.home}>
      <section className={styles.loginWrapper}>
        <div>
          <h1>Enviar mensagem</h1>
        </div>

        <div className={styles.formWrapper}>
          {nickEnable == false && <input type="text" onChange={(event: any) => setNick(event.target.value)} placeholder="Digite seu nick" className={styles.inputField} />}
          <input type="text" value={messageText} onChange={(event: any) => setMessageText(event.target.value)} placeholder="Digite sua mensagem" className={styles.inputField} />

          <button type="submit" onClick={handleSubmitForm} className={styles.button}>Enviar</button>
        </div>  
      </section>

      <section className={styles.loginWrapper}>
        <div>
          <h1>Mensagens</h1>
        </div>

        <br />
        <br />
        <ul>
          {messages?.map((message: any) => {
            console.log(messages);
            return <li key={uuid()}>
              <b>{message.nick}</b> - <span>{message.content}</span>
            </li>
          })}
        </ul>
      </section>
    </main>
  )
};

export default Home;
