import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './Landing.css';

interface ContainerProps { }

const Landing: React.FC<ContainerProps> = () => {
    return (
        <IonGrid className="body">
            <IonRow className="ion-justify-content-center">
                <IonCol size="7">
                    <div className="landingText">Welcome to casserole, an online repository of everyone's favourite images!</div>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default Landing;
