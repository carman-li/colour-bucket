import { IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonRow } from '@ionic/react';
import { cloudUpload, } from 'ionicons/icons';
import React, { } from 'react';
import { useHistory } from 'react-router';
import './ActionButtons.css';


const ActionButtons: React.FC = () => {

    let history = useHistory();

    return (
        <IonGrid className="ion-no-padding">
            {/* <IonRow className="ion-margin"> <IonCol size="2">
                <div className="text">Upload some images of your own...</div></IonCol></IonRow> */}
            <IonRow className="ion-justify-content-center">
                <IonCol size="2">
                    <IonCard className="card ion-padding" color="secondary" onClick={() => { history.replace('/upload') }}>
                        <IonCardContent>
                            <IonIcon className="icon" icon={cloudUpload} />
                            <div className="cardTitle">Upload Image</div>
                        </IonCardContent>

                    </IonCard>
                </IonCol>
            </IonRow>
            {/* <IonRow className="ion-margin"> <IonCol size="2">
                <div className="text">or keep scrolling to see all our images!</div></IonCol></IonRow> */}
        </IonGrid>
    );
};

export default ActionButtons;
