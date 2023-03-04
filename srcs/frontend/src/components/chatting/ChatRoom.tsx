import { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { SocketOutputDto } from "../../common/types";
import { Chat } from "./Chat";
import "./Effect.css";

type ArgsType = {
    msgList :SocketOutputDto[],
    enterGame : (dto: SocketOutputDto) => void
    setReceivedMsg:React.Dispatch<React.SetStateAction<SocketOutputDto|undefined>>,
}

export function ChatRoom({msgList, enterGame, setReceivedMsg} :ArgsType) {
    const chatWindow = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatWindow.current) {
            chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
        }
    }, [msgList]);

    return (
        <Container
            className="m-0 mt-auto p-0 Scrollable"
            style={{ height:"75vmin" }}
            ref={chatWindow}>
            {
                msgList.map((msg :SocketOutputDto, idx :number) => {
                    return (
                        <Chat key={idx} msg={msg} enterGame={enterGame} setReceivedMsg={setReceivedMsg}/>
                    );
                })
            }
        </Container>
    );
}