import './Response.css'
import {serverURL} from "./serverURL";
import {useState} from "react";

export default function Response({axios, resp}) {
    const [ disableButtons, setDisableButtons ] = useState(false)

    const handleIncrementVote = (e, vote) => {
        axios
            .patch(serverURL + `/prompts/${resp.promptId}/responses/${resp.id}/${vote}`)
            .then(() => {
                setDisableButtons(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className="response">
            <div className="response-text">
                {resp.response}
            </div>
            <div className="response-buttons">
                <div className="response-button-up">
                    <button
                        disabled={disableButtons}
                        onClick={(e, vote) =>
                            handleIncrementVote(e, "up")
                        }
                    >
                        Up
                    </button>
                </div>
                <div className="response-button-down">
                    <button
                        disabled={disableButtons}
                        onClick={(e, vote) =>
                            handleIncrementVote(e, "down")
                        }
                    >
                        Down
                    </button>
                </div>
            </div>
        </div>
    )
}