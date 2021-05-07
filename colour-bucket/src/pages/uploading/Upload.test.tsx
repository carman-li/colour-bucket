import { findByText, render, waitForElementToBeRemoved } from '@testing-library/react';
import Upload from './Upload';
import userEvent from '@testing-library/user-event';

test('file gets uploaded and is displayed', async () => {
    const { getByLabelText, getByRole } = render(<Upload />);

    const file = new File(['hello'], 'hello.png', { type: 'image/png' })
    const uploader = document.getElementsByTagName('input')[0];
    const uploadButton = getByLabelText("uploadButton");
    const fileName = getByLabelText("fileName");

    userEvent.upload(uploader, file);

    const image = getByRole("img", { name: "imagePreview" });
    expect(image).toBeInTheDocument; // image is showing
    expect(await findByText(fileName, "hello.png")); // file name is showing
    expect(uploadButton).toHaveProperty('disabled', false); // upload button is enabled
});

test('disabled upload button when no file selected', async () => {
    const { getByRole, getByLabelText } = render(<Upload />);
    const uploadButton = getByLabelText("uploadButton");
    const image = getByRole("img", { name: "imagePreview" });

    expect(image).not.toBeInTheDocument;
    expect(uploadButton).toHaveProperty('disabled', true);
});

test('upload button click routes to home', async () => {
    const { getByLabelText, getByText } = render(<Upload />);
    const uploadButton = getByLabelText("uploadButton");

    userEvent.click(uploadButton);

    waitForElementToBeRemoved(uploadButton).then(() => expect(getByText("Welcome to Colour Bucket!")))
});