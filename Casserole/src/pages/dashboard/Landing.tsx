import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './Landing.css';

interface ContainerProps { }

const Landing: React.FC<ContainerProps> = () => {
    return (
        <IonGrid className="body">
            <IonRow className="ion-justify-content-center ion-margin">
                <IonCol>
                    <div className="landingText">Welcome to casserole, an online repository of everyone's favourite images! To get started, click the button to upload your own.</div>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default Landing;
