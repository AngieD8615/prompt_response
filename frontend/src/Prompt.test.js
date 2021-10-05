import { render, screen } from '@testing-library/react';
import Prompt from './Prompt';

test('renders the prompt text', () => {
    render(<Prompt id={42} text={"render this... or else"}/>)
    const listItem = screen.getByText("render this... or else");
    expect(listItem).toBeInTheDocument();
})