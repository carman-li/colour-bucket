import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './Landing.css';

interface ContainerProps { }

const Landing: React.FC<ContainerProps> = () => {
    return (
        <IonGrid className="body">
            <IonRow className="ion-justify-content-center ion-margin">
                <IonCol>
                    <div className="landingText">Welcome to Colour Bucket! Upload images and see their colour palettes. To get started, click the button to upload an image.</div>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default Landing;
