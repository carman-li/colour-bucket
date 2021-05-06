import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonLoading, IonPage, IonRow, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import Landing from './dashboard/Landing'
import ActionButtons from './dashboard/ActionButtons'
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';


const Home: React.FC = () => {
  let history = useHistory();
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
            <IonButtons slot="end">
              <IonButton class="headerButton" expand="full" routerLink="/feed">
                <p className="buttonText">View Feed</p>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonGrid className="ion-padding">
          <IonRow className="ion-justify-content-center ion-margin">
            <IonCol size="6">
              <Landing />
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol>
              <IonCol size="2"><ActionButtons /></IonCol>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
