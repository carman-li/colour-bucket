import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonLoading, IonPage, IonRow, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import Landing from './dashboard/Landing'
import ActionButtons from './dashboard/ActionButtons'
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Images from './dashboard/Images';


const Home: React.FC = () => {
  let history = useHistory();
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
        <IonGrid className="ion-padding">
          <IonRow className="ion-justify-content-center">
            <IonCol size="6">
              <Landing />
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol><ActionButtons /></IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
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
