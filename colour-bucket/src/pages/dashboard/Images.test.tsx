import React from 'react';
import { fireEvent, queryByRole, render } from '@testing-library/react';
import Images from './Images';

// search functionality
test('disable search button, cancel search button when no images are uploaded', async () => {
    const { getByLabelText, queryByRole } = render(<Images />);

    const images = queryByRole('IonImg');
    const searchButton = getByLabelText("searchButton");
    const clearSearchButton = getByLabelText("clearSearch");
    expect(images).toBeNull();
    expect(searchButton).toBeDisabled;
    expect(clearSearchButton).toBeDisabled;
});

