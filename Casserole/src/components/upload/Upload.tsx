import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/react';
import ImageUploader from 'react-images-upload';
import React, { useState } from 'react';
import './Upload.css';
import { useHistory } from 'react-router';

interface Props {
    dismissModal: any
}

const Upload: React.FC<Props> = (props) => {
    const [pictures, setPictures] = useState<any[]>([]);
    const [fileNames, setFileNames] = useState([]);
    const dismissModal = props.dismissModal;

    let history = useHistory();

    const onDrop = (picture: any) => {
        picture.forEach((pic: { url: string; }) => {
            pic.url = URL.createObjectURL(pic);
        });
        setPictures(pictures.concat(picture));
        console.log(pictures);

        var newNames = picture.map((pic: { name: any; }) =>
            pic.name
        );
        setFileNames(fileNames.concat(newNames));
    }

    function RenderFileNames(): JSX.Element {
        return (
            <>
                {fileNames.map((name) => (
                    <span key={name} className="fileName">{name},</span>
                ))}
            </>
        );
    }

    const sendFiles = () => {
        dismissModal();
        history.push("/postUpload", {
            files: pictures,
        });
    };

    return (
        <IonGrid className="ion-padding ion-margin">
            <IonRow>
                <IonCol className="ion-padding">
                    <div className="heading">Upload Your Images</div>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol className="ion-padding">
                    <div className="bodyText">Click the button below to choose the images you want to upload!</div>
                </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center">
                <IonCol className="ion-padding">
                    <ImageUploader
                        className="uploader"
                        fileContainerStyle={{ border: '3px solid var(--ion-color-medium)', boxShadow: "none" }}
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={onDrop}
                        imgExtension={['.jpg', '.gif', '.png']}
                        maxFileSize={5242880}
                        label={"Max file size: 5mb, Accepted file types: jpg, gif, png"}
                    />

                </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center">
                <IonCol className="ion-padding" >
                    {fileNames.length > 0 ? <div className="fileName">File(s) uploaded: <RenderFileNames /></div> : <div></div>}
                </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center">
                <IonCol>
                    <IonButton expand="block" shape="round" type="submit" color="secondary" className="ion-margin button" onClick={() => { sendFiles() }}>
                        Upload
                    </IonButton>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default Upload;
