import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonLoading, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getImageUrls } from '../../../common/api';
import Images from '../Images';
import './Feed.css'

const Feed: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    const [urls, setUrls] = useState<any[]>([]);

    let history = useHistory();

    useEffect(() => {
        setIsLoading(true);
        loadData();
        setIsLoading(false);
    }, [setUrls])

    const loadData = async () => {
        var res = await getImageUrls();
        setUrls(res);
    }

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
                <IonLoading
                    cssClass="loading"
                    isOpen={isLoading}
                    onDidDismiss={() => setIsLoading(false)}
                    spinner="crescent"
                    showBackdrop={true}
                />
                <IonGrid className="ion-margin">
                    <IonRow>
                        <IonCol>
                            <div className="titleText">Image Feed</div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            {!isLoading ? <Images images={urls} /> : <div></div>}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Feed;
