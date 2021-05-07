import { findByText, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'
import Home from './Home';
import userEvent from '@testing-library/user-event';


// test('website name button click routes to home', async () => {
//     const { getByText, getByLabelText } = render(<Home />, { wrapper: BrowserRouter });
//     const homeButton = getByLabelText("homeButton");

//     userEvent.click(homeButton);

//     expect(getByText("Welcome")).toBeInTheDocument; // takes you to homepage
// });