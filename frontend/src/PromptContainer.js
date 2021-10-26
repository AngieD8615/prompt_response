import { useState } from "react";
import Prompt from "./Prompt";
import ResponseForm from "./ResponseForm";
import ResponseContainer from "./ResponseContainer";
import { responseStatuses } from "./responseStatuses";


export default function PromptContainer ({ axios, promptID, prompt }) {
    const [responseStatus, setResponseStatus] = useState(responseStatuses.initial);
    const [userResp, setUserResp] = useState('')

    const displayResponseForm = () => {
        if (responseStatus !== responseStatuses.submitted){
            return (
                <ResponseForm
                    onSubmit={onSubmit}
                    status={responseStatus}
                />
            )
        }
    }

    const onSubmit = (resp) => {
        setResponseStatus(responseStatuses.processing)
        const body = {
            promptId: promptID,
            response: resp
        }
        axios.post('http://localhost:8080/api/responses', body)
            .then(() => {
                setUserResp(resp)
                setResponseStatus(responseStatuses.submitted)
            })
            .catch(() => {
                setResponseStatus(responseStatuses.rejected)
            })
    };

    const displayResponses = () => {
        if (responseStatus === responseStatuses.submitted) {
            return <ResponseContainer axios={axios} userResponse={userResp} promptId={promptID} />
        } else if (responseStatus === responseStatuses.rejected) {
            return "response rejected"
        }
    }

    return (
        <>
            <Prompt id={promptID} text={prompt} />
            {displayResponseForm()}
            {displayResponses()}
        </>
    )
}