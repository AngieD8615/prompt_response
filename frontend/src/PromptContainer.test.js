import {fireEvent, render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import {act} from 'react-dom/test-utils';
import PromptContainer from './PromptContainer';

describe("when submitting a response", () => {

    test("Post request is called on submit", () => {
        const dummyPromise = new Promise(() => {
        })

        const axios = {
            post: jest.fn(x => dummyPromise),
        };

        render(<PromptContainer axios={axios} promptID={1} prompt={"this is the prompt"}/>)

        const responseInput = screen.getByLabelText('Enter your response here:',
            {selector: 'input[type="text"]'});

        fireEvent.change(responseInput, {target: {value: 'this is my response'}})
        const btn = screen.getByRole('button')
        fireEvent.click(btn)

        expect(axios.post)
            .toHaveBeenCalledWith('http://localhost:8080/api/responses',
                {"prompt_id": 1, "response": "this is my response"})

    })

    test('Display user response when post succeeds', async function () {
        const resolvedPromise = Promise.resolve();
        const axios = {
            post: x => resolvedPromise
        }

        render(<PromptContainer axios={axios} promptID={1} prompt={"this is the prompt"}/>)
        const responseInput = screen.getByLabelText('Enter your response here:',
            {selector: 'input[type="text"]'});

        fireEvent.change(responseInput, {target: {value: "this is my response"}})
        const btn = screen.getByRole('button')
        fireEvent.click(btn)

        await screen.findByText('this is my response')
    })

    test("disable submit until there is a response", () => {
        const axios = {};

        render(<PromptContainer axios={axios} promptID={1} prompt={"this is the prompt"}/>)
        expect(screen.getByRole('button')).toBeDisabled()

        const responseInput = screen.getByLabelText('Enter your response here:',
            {selector: 'input[type="text"]'});

        fireEvent.change(responseInput, {target: {value: 'text is not entered'}})
        expect(screen.getByRole('button')).toBeEnabled()
    })

    test("disable submit button while post request is processing", async () => {
        let resolve;
        const axios = {post: x => new Promise((res) => resolve = res)};

        render(<PromptContainer axios={axios} promptID={1} prompt={"this is the prompt"}/>)

        const responseInput = screen.getByLabelText('Enter your response here:',
            {selector: 'input[type="text"]'});

        fireEvent.change(responseInput, {target: {value: 'text is not entered'}})
        fireEvent.click(screen.getByRole('button'))

        expect(screen.getByRole('button')).toBeDisabled()

        await act(async () => resolve());
    })
})

test("When response is successfully submitted, remove form from view ", async () => {
    const axios = {post: x => Promise.resolve()}
    const prompt = "this is a prompt: YAY"

    render(<PromptContainer axios={axios} promptID={1} prompt={prompt}/>)

    const responseInput = screen.getByLabelText('Enter your response here:',
        {selector: 'input[type="text"]'});

    fireEvent.change(responseInput, {target: {value: 'this is my response'}})

    console.log("in act before click")
    fireEvent.click(screen.getByRole('button'))

    console.log("after resolve()", screen.findByText('Enter your response here:'))
    await waitForElementToBeRemoved(() => screen.queryByText('Enter your response here:'));

    // try {
    //     await screen.findByText('...');
    //     fail('did not thorw');
    // } catch (e) {
    // }
    //
    // await expectAsync(screen.findByText('...')).toBeRejected();
    // expect(screen.getByText('this is my response')).toBeInTheDocument()

})
