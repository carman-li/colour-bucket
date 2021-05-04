import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { text } from 'ionicons/icons';
import React from 'react';
import './Upload.css';

interface ContainerProps { }

const Upload: React.FC<ContainerProps> = () => {
    return (
        <IonGrid className="ion-padding">
            <IonRow className="ion-justify-content-center">
                <IonCol>
                    <IonItem>
                        <IonLabel position="floating">Floating Label</IonLabel>
                    </IonItem>
                    <IonButton expand="block" shape="round" type="submit" color="secondary" className="ion-margin button">
                        Upload
                                    </IonButton>
                </IonCol>
            </IonRow>

        </IonGrid>
    );
};

export default Upload;
