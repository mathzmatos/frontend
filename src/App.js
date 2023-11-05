import React, { useState, useEffect } from 'react';
import logo from './images/logo.png';
import avatar from './images/avatar.png';
import './App.css';
import './normal.css';

import { IoSend } from 'react-icons/io5';




function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [conversationHistory, setConversationHistory] = useState([]);
  


  useEffect(() => {
  const buttons = document.querySelectorAll(".recommendation-button");

  function handleMouseMove(e) {
    buttons.forEach((button) => {
      const { x, y } = button.getBoundingClientRect();
      button.style.setProperty("--x", e.clientX - x);
      button.style.setProperty("--y", e.clientY - y);
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("mousemove", handleMouseMove);
  });

  // Clean up the event listeners when the component unmounts
  return () => {
    buttons.forEach((button) => {
      button.removeEventListener("mousemove", handleMouseMove);
    });
  };
}, []);


  // Função para enviar uma mensagem
  const sendMessage = (text, sender) => {
    const newMessage = {
      text,
      sender,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    // Esconder as recomendações após o primeiro envio de mensagem do usuário
    setShowRecommendations(false);
  };

  // Função para lidar com o envio de mensagens pelo formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      sendMessage(inputMessage, 'user');
      setInputMessage('');
      // Simula a resposta automática do bot após a mensagem do usuário
      setTimeout(() => {
        sendMessage('Estou em fase de teste', 'bot');
      }, 1000); // Aguarda 1 segundo antes de enviar a resposta do bot
    }
  };

  // Função para lidar com o clique nos botões de recomendação
  const handleButtonClick = (recommendation) => {
    if (showRecommendations) {
      const updatedMessages = [...messages, { text: recommendation, sender: 'user' }];

      setMessages(updatedMessages);
      setShowRecommendations(false); // Oculta as recomendações

      // Simula a resposta automática do bot após a mensagem do usuário
      setTimeout(() => {
        sendMessage('Estou em fase de teste', 'bot');
      }, 1000); // Aguarda 1 segundo antes de enviar a resposta do bot
    }
  };

  // Função para ocultar as recomendações quando o usuário envia uma mensagem ou escolhe uma recomendação
  const hideRecommendations = () => {
    setShowRecommendations(false);
  };

  
// Reseta o chat ao clicar em "Nova conversa"
  const resetChat = () => {
    setConversationHistory([...conversationHistory, messages]);
    setMessages([]);
    setShowRecommendations(true);
  };

  return (
    <div className="App">



      <aside className="sidemenu">

        <div className="vacabot">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>vacaBOT</h1>
        </div>

        <div className="new-conversation" onClick={resetChat}>
            <span>+</span>
            Nova conversa
        </div>

        <div className="conversation-history">
      <p>Histórico de Conversas:</p>
      {conversationHistory.map((history, index) => (
        <div key={index} className="conversation">
          {history.map((message, index) => (
            <div key={index} className={`chat-message ${message.sender}`}>
              {/* Renderizar mensagens antigas aqui */}
            </div>
          ))}
        </div>
      ))}
    </div>


          
        


      </aside>

      <section className="chatbox">
        <div className="chat-log">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${message.sender}`}
            >
              <div className="chat-message-center">
                {message.sender === 'user' ? (
                  <div className="avatar">
                    <img src={avatar} alt="avatar" />
                  </div>
                ) : (
                  <div className="avatarBot">
                    <img src={logo} alt="avatarBot" />
                  </div>
                )}
                <div className="message">{message.text}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button type="submit"> <IoSend /> </button>
          </form>

          {/* Mostrar as recomendações apenas se o usuário não tiver enviado nenhuma mensagem */}
          {showRecommendations && (
            <div className="recommendations">
              <p>Recomendações</p>
              <div className="recommendation-buttons">
                <button
                  className="recommendation-button"
                  onClick={() => handleButtonClick('Me fale sobre destinos de viagem')}
                >
                  Me fale sobre destinos de viagem
                </button>
                <button
                  className="recommendation-button"
                  onClick={() => handleButtonClick('Como faço para reservar um hotel?')}
                >
                  Como faço para reservar um hotel?
                </button>
                <button
                  className="recommendation-button"
                  onClick={() => handleButtonClick('Quais são os melhores restaurantes na minha área?')}
                >
                  Quais são os melhores restaurantes na minha área?
                </button>
                <button
                  className="recommendation-button"
                  onClick={() => handleButtonClick('Dicas para viagem segura')}
                >
                  Dicas para viagem segura
                </button>
              </div>
            </div>
          )}
        </div>

        

      </section>
    </div>
  );
}

export default App;
