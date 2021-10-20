import './App.css';
import PromptContainer from "./PromptContainer";
import {useEffect, useState} from "react";

export default function App ({ axios }) {
    const [prompts, setPrompts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [loadingFailed, setLoadingFailed] = useState(false)


    const getPrompts = () => {
        axios.get('http://localhost:8080/api/prompts')
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

    const postResponse = (body) => {
        return axios.post('http://localhost:8080/api/responses', body)
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
        } else {
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

