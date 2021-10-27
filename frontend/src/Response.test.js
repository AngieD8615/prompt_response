import {fireEvent, render, screen} from "@testing-library/react";
import Response from "./Response";
import {serverURL} from "./serverURL";

test('Up button makes a patch request to server', async () => {
    const dummyPromise = new Promise(() => {})
    const axios = {patch: jest.fn(x => dummyPromise)}
    const resp = {id: 2, promptId: 1, response: 'count the dots', upVotes: 0, downVotes: 0}
    render(<Response resp={resp} axios={axios}/>)

    const button = screen.getByRole('button', {name:'Up'})
    fireEvent.click(button)
    expect(axios.patch)
        .toHaveBeenCalledWith(serverURL + '/prompts/1/responses/2/up')

})

test('display down button', () => {
    const dummyPromise = new Promise(() => {})
    const axios = {patch: jest.fn(x => dummyPromise)}
    const resp = {id: 2, promptId: 1, response: 'count the dots', upVotes: 0, downVotes: 0}
    render(<Response resp={resp} axios={axios}/>)

    const button = screen.getByRole('button', {name:'Down'})
    fireEvent.click(button)
    expect(axios.patch)
        .toHaveBeenCalledWith(serverURL + '/prompts/1/responses/2/down')
})