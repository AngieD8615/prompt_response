import './App.css';
import Prompt from './Prompt'
import {useEffect, useState} from "react";

function App({axios}) {
    const [prompts, setPrompts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [loadingFailed, setLoadingFailed] = useState(false)
    const curPrompt = 0;

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

    useEffect(() => {
        if (isLoading) {
            getPrompts();
        }
    })

    const renderData = () => {
        if (loadingFailed) {
            return <p>Failed to load data</p>
        } else if (isLoading) {
            return <p>Loading...</p>
        } else {
            return <Prompt id={curPrompt} text={prompts[curPrompt].prompt} />
        }
    }

    return (
        <div>
            {renderData()}
        </div>
    );
}

export default App;
