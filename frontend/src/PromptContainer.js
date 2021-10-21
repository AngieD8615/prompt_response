import {useEffect, useState} from "react";
import Prompt from "./Prompt";
import ResponseForm from "./ResponseForm";

const responseStatuses = {
    initial: "initial",
    processing: "processing",
    submitted: "submitted",
    rejected: "rejected",

};

export default function PromptContainer ({ axios, promptID, prompt }) {
    const [responseStatus, setResponseStatus] = useState(responseStatuses.initial);
    const [userResp, setUserResp] = useState("")

    const displayResponseForm = () => {
        if (responseStatus !== responseStatuses.submitted){
            return (
                <ResponseForm
                    onSubmit={onSubmit}
                    statuses={responseStatuses}
                    status={responseStatus}
                />
            )
        }
    }

    const onSubmit = (e, resp) => {
        e.preventDefault()
        setResponseStatus(responseStatuses.processing)
        const body = {
            prompt_id: promptID,
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
            return userResp
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