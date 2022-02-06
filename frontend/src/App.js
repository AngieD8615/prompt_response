import './App.css';
import PromptContainer from "./PromptContainer";
import {useEffect, useState} from "react";
import {serverURL} from "./serverURL";

export default function App ({ axios }) {
    const [prompts, setPrompts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [loadingFailed, setLoadingFailed] = useState(false)


    const getPrompts = () => {
        axios.get(serverURL + '/prompts')
            .then((response) => {
                setPrompts(response.data)
            })
            .then(() => {
                setIsLoading(false)
            })
            .catch(() => {
                setLoadingFailed(true)
            })
    }

    useEffect(() => {
        if (isLoading) {
            getPrompts();
        }
    })

    const renderPrompt = () => {
        if (loadingFailed) {
            return <p>Failed to load data</p>
        } else if (isLoading) {
            return <p>Loading...</p>
        } else if (prompts.length === 0) {
            return <p>No prompts available</p>
        } else {
            let curPrompt = Math.floor(Math.random() * prompts.length)
            const { id, prompt } = prompts[0]
            return (
                <>
                    <PromptContainer promptID={id} prompt={prompt} axios={axios} />
                </>
            )
        }
    }

    return (
        <div>
            {renderPrompt()}
        </div>
    );
}

