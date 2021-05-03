import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './Landing.css';

interface ContainerProps { }

const Landing: React.FC<ContainerProps> = () => {
    return (
        <IonGrid className="body">
            <IonRow>
                <IonCol>
                    <div>Welcome to casserole! Organize, show off, and share your favourite pictures here.</div>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default Landing;
