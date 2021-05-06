import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import Landing from './dashboard/Landing'
import ActionButtons from './dashboard/ActionButtons'
import React from 'react';
import Images from './dashboard/Images';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader translucent={true} mode="ios">
          <IonToolbar className="toolbar ion-padding-horizontal ion-padding-top">
            <IonButtons slot="start">
              <IonButton class="headerButton" routerLink="/home">
                <p className="logoText">casserole</p>
              </IonButton>
            </IonButtons>
            {/* <IonButtons slot="end">
              <IonButton class="headerButton" expand="full">
                <p className="buttonText">Log In</p>
              </IonButton>
              <IonButton class="headerButton" expand="full">
                <p className="buttonText">Sign Up</p>
              </IonButton>
            </IonButtons> */}
          </IonToolbar>
        </IonHeader>
        <IonGrid className="ion-padding">
          <IonRow className="ion-justify-content-center ion-margin">
            <IonCol>
              <Landing />
            </IonCol>
            <IonCol size="2"><ActionButtons /></IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <Images />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
