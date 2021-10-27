import {fireEvent, render, screen} from "@testing-library/react";
import ResponseContainer from "./ResponseContainer";
import {serverURL} from "./serverURL";

test('Display current user\'s response',  () => {

    render(<ResponseContainer userResponse={"My Response..."} promptId={1} />)

    screen.getByText("My Response...")
})

test("When user post request succeeds the view responses " +
            "button should appear", () => {

    render(<ResponseContainer userResponse={"My Response..."} promptId={1} />)

    screen.getByRole('button', {name:'View Responses'})
})
describe("when requesting all responses from server", () => {
    test("clicking the View Responses button should send a call to the server", () => {
        const dummyPromise = new Promise(() => {})
        const axios = {get: jest.fn(x => dummyPromise)}

        render(<ResponseContainer userResponse={"My Response..."} promptId={1} axios={axios}/>)

        fireEvent.click(screen.getByRole('button'))

        expect(axios.get)
            .toHaveBeenCalledWith(serverURL + '/prompts/1/responses')
    })

    test("should display responses when get request succeeds", async() => {
        const dummyData = [
            {
                "id": 1,
                "promptId": 1,
                "response": "Use a calculator"
            },
            {
                "id": 2,
                "promptId": 1,
                "response": "count the dots"
            },
            {
                "id": 3,
                "promptId": 1,
                "response": "draw the number of dots for the 2 numbers. Then count up all the dots drawn"
            },
        ]
        const resolvedPromise = Promise.resolve({data: dummyData})

        const axios = {get: x => resolvedPromise}

        render(<ResponseContainer axios={axios} userResponse={"My Response..."} promptId={1} />)

        fireEvent.click(screen.getByRole('button'))
        await screen.findByText("Use a calculator")
    })

    test("should display loading while making the get request", async () => {
        const dummyPromise = new Promise(() => {})
        const axios = {get: x => dummyPromise}

        render(<ResponseContainer axios={axios} userResponse={"My Response..."} promptId={1} />)
        fireEvent.click(screen.getByRole('button'))
        await screen.findByText("loading")
    })

    test("should display rejection message if the get request fails", async () => {
        const rejectedPromise = Promise.reject()
        const axios = {get: x => rejectedPromise}

        render(<ResponseContainer axios={axios} userResponse={"My Response..."} promptId={1} />)
        fireEvent.click(screen.getByRole('button'))
        await screen.findByText("error getting responses")
    })
})

