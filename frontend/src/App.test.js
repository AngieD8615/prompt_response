import { render, screen } from '@testing-library/react';
import App from './App';
import Prompt from "./Prompt";
import axios from "axios";

test('renders learn react link', () => {
    //cypress End-to-End
    var data;
    axios.get('http://localhost:8080/api/prompts')
        .then((response) => {
            data = response.data;
        })
        .then(() => {
            render(<App />)
            expect(data).toHaveLength(2)
        })
});
