import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonToolbar } from '@ionic/react';
import ImageUploader from 'react-images-upload';
import React, { useState } from 'react';
import './Upload.css';
import { useHistory } from 'react-router';
import { uploadImages } from '../../common/api';


const Upload: React.FC = () => {
    const [pictures, setPictures] = useState<any[]>([]);
    const [fileNames, setFileNames] = useState([]);
    let history = useHistory();

    const onDrop = (picture: any) => {
        picture.forEach((pic: { url: string; }) => {
            pic.url = URL.createObjectURL(pic);
        });
        setPictures(pictures.concat(picture));

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

    const sendFiles = async () => {
        await uploadImages(pictures).then((val) => console.log(val));
        history.replace('/home');
    };

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonHeader translucent={true} mode="ios">
                    <IonToolbar className="toolbar ion-padding-horizontal ion-padding-top">
                        <IonButtons slot="start">
                            <IonButton class="headerButton" onClick={() => { history.replace('/home') }}>
                                <p className="logoText">casserole</p>
                            </IonButton>
                        </IonButtons>

                    </IonToolbar>
                </IonHeader>
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
                            />

                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol className="ion-padding" size="4">
                            {fileNames.length > 0 ? <div className="fileName">File(s) uploaded: <RenderFileNames /></div> : <div></div>}
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
