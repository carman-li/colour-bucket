import { IonButton, IonButtons, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonLabel, IonPage, IonRow, IonToolbar } from '@ionic/react';
import ImageUploader from 'react-images-upload';
import React, { useState } from 'react';
import './Upload.css';
import { useHistory } from 'react-router';
import { uploadImages } from '../../common/api';
import { usePalette } from 'react-palette'
import { useGetImageColours } from '../../customHooks';

const Upload: React.FC = () => {
    const [image, setImage] = useState({});
    const [fileName, setFileName] = useState([]);
    const [url, setUrl] = useState("");
    const colours = useGetImageColours(url)

    let history = useHistory();

    const onDrop = (picture: any) => {
        var url = URL.createObjectURL(picture[0]);

        setUrl(url);
        setImage(picture[0]);
        setFileName(picture[0].name)

    }

    const sendFiles = async () => {
        var picObj = { file: image, colours: colours };
        await uploadImages(picObj);
        history.replace('/home');
    };

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonHeader translucent={true} mode="ios">
                    <IonToolbar className="toolbar ion-padding-horizontal ion-padding-top">
                        <IonButtons slot="start">
                            <IonButton class="headerButton" onClick={() => { history.replace('/home') }}>
                                <p className="logoText">Colour Bucket</p>
                            </IonButton>
                        </IonButtons>

                    </IonToolbar>
                </IonHeader>
                <IonGrid className="ion-padding ion-margin">
                    <IonRow>
                        <IonCol className="ion-padding">
                            <div className="heading">Upload Your Image</div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="ion-padding">
                            <div className="bodyText">Click the button below to choose the image you want to upload!</div>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol className="ion-padding" size="4">
                            <ImageUploader
                                className="uploader"
                                fileContainerStyle={{ border: '3px solid var(--ion-color-medium)', boxShadow: "none" }}
                                withIcon={true}
                                buttonText='Choose images'
                                onChange={onDrop}
                                imgExtension={['.jpg', '.gif', '.png']}
                                maxFileSize={5242880}
                                label={"Max file size: 5mb, Accepted file types: jpg, gif, png"}
                                singleImage={true}
                            />

                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol className="ion-padding" size="4">
                            <span className="fileName">{fileName ? "File Uploaded: " : ""}</span>
                            <span className="fileName">{fileName}</span>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol className="ion-padding" size="4">
                            <span className="fileName">Image Preview:</span>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="2">
                            {url ? <IonImg src={url} /> : <div></div>}

                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-justify-content-center">
                        <IonCol size="4">
                            <IonButton expand="block" shape="round" type="submit" color="secondary" className="ion-margin button" onClick={() => { sendFiles() }}>
                                Upload
                    </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent></IonPage>

    );
};

export default Upload;
