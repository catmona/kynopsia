import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'

function App() {
    const [input, setInput] = useState('')
    const [history, setHistory] = useState<string[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const [msgList, setMsgList] = useState<string[]>(['Type Below!'])

    const msgContainer = useRef<HTMLDivElement>(null)

    function pushHistory(text: string) {
        const buffer = [...history]
        const existingIndex = buffer.indexOf(text)

        if (existingIndex != -1) {
            buffer.splice(existingIndex, 1)
        }

        while (buffer.length >= 10) {
            buffer.splice(buffer.length, 1)
        }

        setHistory([text, ...buffer])
    }

    function submitInput(e: SubmitEvent) {
        e.preventDefault()

        appendMessage(input, true)
        pushHistory(input)

        setInput('')
        setHistoryIndex(-1)
    }

    function appendMessage(text: string, self: boolean) {
        self ? (text = '> ' + text) : {}
        setMsgList([...msgList, text])
    }

    function handleHistory(e: KeyboardEvent) {
        switch (e.key) {
            case 'ArrowUp': {
                e.preventDefault()

                historyIndex < history.length - 1
                    ? setHistoryIndex(historyIndex + 1)
                    : {}
                break
            }
            case 'ArrowDown': {
                e.preventDefault()

                historyIndex >= 0 ? setHistoryIndex(historyIndex - 1) : {}
                historyIndex == 0 ? setInput('') : {}
                break
            }
        }
    }

    useEffect(() => {
        historyIndex != -1 ? setInput(history[historyIndex]) : {}
    }, [historyIndex])

    return (
        <>
            <div className="h-screen w-screen bg-black flex">
                <div className="flex justify-center items-center grow">
                    <div className="w-[50%] h-[50%] flex bg-slate-800 flex-col">
                        <div
                            className="grow p-4 text-white font-mono"
                            ref={msgContainer}
                        >
                            {msgList.map((msg, index) => (
                                <p key={index}>{msg}</p>
                            ))}
                        </div>
                        <form
                            onSubmit={submitInput}
                            className="w-full bg-slate-900 flex items-baseline p-2"
                        >
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className="text-green-300 px-2"
                            />
                            <input
                                type="text"
                                autoFocus
                                value={input}
                                onKeyDown={(e) => handleHistory(e)}
                                onChange={(text) => {
                                    setHistoryIndex(-1)
                                    setInput(text.currentTarget.value)
                                }}
                                className="w-full focus:outline-none text-white/80 bg-transparent pl-2"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
