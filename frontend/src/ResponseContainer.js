import {useState} from "react";
import Response from "./Response";

const getResponsesStatus = {
    initial: "initial",
    processing: "processing",
    succeeded: "succeeded",
    rejected: "rejected"
}

export default function ResponseContainer({axios, userResponse, promptId}) {
    const [responses, setResponses] = useState([])
    const [getResponseStatus, setGetResponseStatus] = useState(getResponsesStatus.initial)
    const getResponses = (id) => {
        setGetResponseStatus(getResponsesStatus.processing)
        axios.get("http://localhost:8080/api/prompts/" + id + "/responses")
            .then((res) => {
                setResponses(res.data)
                setGetResponseStatus(getResponsesStatus.succeeded)
            })
            .catch((err) => {
                console.log(err)
                setGetResponseStatus(getResponsesStatus.rejected)
            })
    }

    const displayResponses = () => {
        if (getResponseStatus === getResponsesStatus.initial) {
            return <button onClick={() => getResponses(promptId)}>View Responses</button>
        } else if (getResponseStatus === getResponsesStatus.processing) {
            return "loading"
        } else if (getResponseStatus === getResponsesStatus.succeeded) {
            return responses
                .map(response => <Response resp={response} key={response.id} />)
        } else if (getResponseStatus === getResponsesStatus.rejected) {
            return "error getting responses"
        }

    }
    return (
        <>
            <div>
                {userResponse}
            </div>

            <div>
                {displayResponses()}
            </div>
        </>
    )
}