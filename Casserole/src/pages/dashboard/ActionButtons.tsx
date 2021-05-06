import { IonCard, IonCardContent, IonChip, IonCol, IonGrid, IonIcon, IonLabel, IonModal, IonRow } from '@ionic/react';
import { cloudUpload, } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getTags } from '../../common/api';
import Upload from '../uploading/Upload';
import './ActionButtons.css';


const ActionButtons: React.FC = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [showUpload, setShowUpload] = useState(false);

    const [tags, setTags] = useState([""]);

    let history = useHistory();

    // useEffect(() => {
    //     loadData();
    // }, []);

    // const loadData = async () => {
    //     var res = await getTags();
    //     setTags(res);
    // }

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

    return (
        <div className="body"><IonGrid className="ion-no-padding">
            {/* 
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
            </IonRow> */}
            {/* <IonRow className="ion-margin"> <IonCol size="2">
                <div className="text">Upload some images of your own...</div></IonCol></IonRow> */}
            <IonRow className="ion-justify-content-center">
                <IonCard className="card ion-padding" color="secondary" onClick={() => { history.replace('/upload') }}>
                    <IonCardContent>
                        <IonIcon className="icon" icon={cloudUpload} />
                        <div className="cardTitle">Upload Image(s)</div>
                    </IonCardContent>

                </IonCard>
            </IonRow>
            {/* <IonRow className="ion-margin"> <IonCol size="2">
                <div className="text">or keep scrolling to see all our images!</div></IonCol></IonRow> */}
        </IonGrid></div>
    );
};

export default ActionButtons;
