import React from 'react'
import { useParams } from 'react-router';
import useChat from '../hooks/useChat'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const ChatRoomContainer = styled.div`
    display: flex;
    height: 400px;
    padding: 1rem;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-color: #fff;
    flex-direction: column-reverse;
    overflow-y: auto;
`

const MessagesContainer = styled.div`
    display: flex;
    height: 400px;
    padding: 1rem;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-color: #fff;
    flex-direction: column;
    overflow-y: auto;
`

const MessageItem = styled.div`
    padding: 1rem 0 0 0;
    transition: all 0.15s ease-in-out;
    animation: fadeNewMessage 0.5s;
    animation-fill-mode: forwards;
`

const MessageText = styled.div<{$ownedByCurrentUser: boolean}>`
    float: right;
    text-align: right;
    margin: 0 1rem 0 0;
    background-color: #fafafa;
    ${({ $ownedByCurrentUser }) => $ownedByCurrentUser && `
        float: left;
        text-align: left;
        margin: 0 0 0 1rem;
        color: #fff;
        background-color: #4870df;
    `}
` 

const TextInput = styled.input`
    height: 40px;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 40px;
    margin: 0 0.5rem 0 0;
    width: calc(100% - 52px);
    background-color: #dedfed;
    box-shadow: inset 0 0 0 2px #dedfed;
    font-size: 14px;
    font-family: 'Quicksand', sans-serif;
    font-weight: bold;
    transition: 0.15s all ease-in-out;
    box-sizing: border-box;
`

const SendMessageButton = styled.div`
  float: right;
    position: relative;
    width: 40px;
    height: 40px;
    cursor: pointer;
    padding: 8px;
    border-radius: 30px;
    color: #fff;
    background-color: #4870df;
    text-align: center;
    box-shadow: 0px 14px 10px -8px rgb(0 0 0 / 20%);
    transition: 0.15s all ease-in-out;
    box-sizing: border-box;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    svg {
      font-size: 22px;
      transform: rotate(60deg);
    }
`
const ChatRoom = () => {
  const { rickId } = useParams()
  const { messages, sendMessage } = useChat(rickId)
  const [newMessage, setNewMessage] = React.useState('')

  const handleNewMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value)
  };

  const handleSendMessage = () => {
    sendMessage(newMessage)
    setNewMessage('')
  };

  return (
    <>
      <ChatRoomContainer>
        <h1>Rick Type: {rickId}</h1>
        <MessagesContainer>
            {messages.map((message, i) => (
              <MessageItem key={i}>
                <MessageText $ownedByCurrentUser={message.ownedByCurrentUser}>
                  {message.body}
                </MessageText>
              </MessageItem>
            ))}
        </MessagesContainer>
        </ChatRoomContainer>

            <TextInput
              type="text"
              placeholder="Text message"
              value={newMessage}
              onChange={handleNewMessageChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage()
                }
              }}
            />
            <SendMessageButton onClick={handleSendMessage}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </SendMessageButton>
    </>
  )
}

export default ChatRoom