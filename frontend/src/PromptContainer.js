import {useEffect, useState} from "react";
import Prompt from "./Prompt";
import ResponseForm from "./ResponseForm";

const responseStatuses = {
    initial: "initial",
    processing: "processing",
    submitted: "submitted",
    rejected: "rejected"
};

export default function PromptContainer ({ axios, promptID, prompt }) {
    const [responseStatus, setResponseStatus] = useState(responseStatuses.initial);
    const [response, setResponse] = useState("");

    // const onSubmit = resp => {
    //
    // };

    const displayResponseItems = () => {
        if (responseStatus === responseStatuses.submitted){
            return response
        } else {
            // return (
            //     <ResponseForm onSubmit={onSubmit} />
            // )
            return (
                <ResponseForm
                    promptID={promptID}
                    axios={axios}
                    statuses={responseStatuses}
                    status={responseStatus}
                    setStatus={setResponseStatus}
                    response={response}
                    setResponse={setResponse}
                />
            )
        }
    }
    return (
        <>
            <Prompt id={promptID} text={prompt} />
            {displayResponseItems()}
        </>
    )
}