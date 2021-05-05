import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonModal, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { cloudUpload, search, searchOutline, } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { getTags } from '../../common/api';
import Upload from '../../components/upload/Upload';
import './ActionButtons.css';

interface ContainerProps { }

const ActionButtons: React.FC<ContainerProps> = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [showUpload, setShowUpload] = useState(false);

    const [tags, setTags] = useState([""]);


    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        var res = await getTags();
        setTags(res);
    }

    const search = async () => {

    }

    // this function renders the chips with suggested tag values
    function RenderChips(): JSX.Element {
        return (
            <>
                {tags.slice(0, 5).map((tagLabel) => (
                    <IonCol size="auto" size-sm="auto">
                        <IonChip
                            color="medium"
                            className="ion-margin-end"
                            onClick={() => {
                                setSearchKeyword(tagLabel);
                            }}
                        >
                            <IonLabel className="chipText">{tagLabel}</IonLabel>
                        </IonChip>
                    </IonCol>
                ))}
            </>
        );
    }

    const dismissModal = () => {
        setShowUpload(false)
    }

    return (
        <div className="body"><IonGrid className="ion-margin-top ion-no-padding">
            <IonModal cssClass="modal" isOpen={showUpload} onDidDismiss={() => dismissModal()}>
                <Upload dismissModal={dismissModal} />
            </IonModal>

            <IonRow className="ion-justify-content-center ion-margin"> <IonCol size="2">
                <div className="text">Search through our collection of images...</div></IonCol></IonRow>
            <IonRow className="ion-justify-content-center">
                <IonCol size="12" size-md="5" className="ion-margin-end">
                    <IonSearchbar
                        className="searchBar ion-margin-bottom ion-no-padding"
                        showCancelButton="never"
                        animated
                        value={searchKeyword}
                        placeholder="Search keyword"
                        debounce={1000}
                        onIonChange={(e) => setSearchKeyword(e.detail.value!)}
                    ></IonSearchbar>
                    <IonRow>
                        <IonCol size="auto" size-sm="auto" className="ion-margin-end">
                            <p className="text">Popular:</p>
                        </IonCol>
                        <RenderChips />
                    </IonRow>
                </IonCol>

                <IonCol size="12" size-md="1">
                    <IonButton
                        fill="solid"
                        color="secondary"
                        expand="full"
                        shape="round"
                        onClick={() => {
                            search();
                        }}
                    >
                        <IonIcon slot="icon-only" icon={searchOutline} />
                    </IonButton>
                </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center ion-margin"> <IonCol size="2">
                <div className="text">or upload some images of your own!</div></IonCol></IonRow>
            <IonRow className="ion-justify-content-center"></IonRow>
            <IonRow className="ion-justify-content-center">
                <IonCard className="card ion-padding" color="secondary" button onClick={() => {
                    setShowUpload(true);
                }}>
                    <IonCardContent>
                        <IonIcon className="icon" icon={cloudUpload} />
                        <div className="cardTitle">Upload an Image</div>
                    </IonCardContent>

                </IonCard>
            </IonRow>


        </IonGrid></div>
    );
};

export default ActionButtons;
