import React from 'react';
import { findByText, fireEvent, render, waitFor } from '@testing-library/react';
import Upload from './Upload';
import testUpload from './test-upload.jpg'
import { Simulate } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

test('file gets uploaded', async () => {
    const { queryByRole, getByLabelText } = render(<Upload />);

    const file = new File(['hello'], 'hello.png', { type: 'image/png' })
    const uploader = document.getElementsByTagName('input')[0];
    const uploadButton = getByLabelText("uploadButton");
    const image = queryByRole("img", { name: "imagePreview" });
    const fileName = getByLabelText("fileName");

    userEvent.upload(uploader, file);

    expect(await findByText(fileName, "hello.png"));
    expect(uploadButton).toHaveProperty('disabled', false);
});

test('disabled upload button when no file selected', async () => {
    const { queryByRole, getByLabelText } = render(<Upload />);
    const uploadButton = getByLabelText("uploadButton");
    const image = queryByRole("img", { name: "imagePreview" });

    expect(image).toBeNull();
    expect(uploadButton).toHaveProperty('disabled', true);
});