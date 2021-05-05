import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ImageUploader from 'react-images-upload';
import React, { useEffect, useState } from 'react';
import './PostUpload.css';
import { getTags } from '../../common/api';

interface Props {
    history: {
        location: {
            state: {
                files: any
            };
        };
    };
}

const PostUpload: React.FC<Props> = (props) => {
    const data = props.history.location.state;
    const [pictures, setPictures] = useState<any[]>([]);
    const [tags, setTags] = useState([""]);


    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        var res = await getTags();
        setTags(res);
        setPictures(data.files);
        console.log(pictures);
    }

    function RenderUploads(): JSX.Element {
        return (
            <>
                {pictures.map((picture) => (
                    <IonRow>
                        <IonCol size="2" key={picture.name} className="ion-padding">
                            <img src={picture.url} />
                        </IonCol>
                        <IonCol size="2">
                            {tags.map((tagLabel) => (
                                <IonCol size="auto" size-sm="auto">
                                    <IonChip
                                        color="medium"
                                        className="ion-margin-end"
                                        onClick={() => {

                                        }}
                                    >
                                        <IonLabel className="chipText">{tagLabel}</IonLabel>
                                    </IonChip>
                                </IonCol>
                            ))}
                        </IonCol>
                    </IonRow>
                ))}
            </>
        );
    }

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
                    </IonToolbar>
                </IonHeader>
                <IonGrid className="ion-padding ion-margin">
                    <IonRow>
                        <IonCol className="ion-padding">
                            <div className="heading">Tag Your Images</div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="ion-padding">
                            <div className="bodyText">Click as many chips as you want to tag your images!</div>
                        </IonCol>
                    </IonRow>
                    <RenderUploads />
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default PostUpload;
