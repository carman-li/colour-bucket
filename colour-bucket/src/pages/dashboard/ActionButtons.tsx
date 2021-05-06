import { IonButton, IonCard, IonCardContent, IonChip, IonCol, IonGrid, IonIcon, IonLabel, IonModal, IonRow, IonSearchbar } from '@ionic/react';
import { cloudUpload, searchOutline, } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Upload from '../uploading/Upload';
import './ActionButtons.css';


const ActionButtons: React.FC = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [showUpload, setShowUpload] = useState(false);
    const [colours, setColours] = useState([""]);

    let history = useHistory();

    // useEffect(() => {
    //     loadData();
    // }, []);

    // const loadData = async () => {
    //     var res = await getColours();
    //     setColours(res.slice(0, 5));
    // }

    const search = async () => {

    }

    // this function renders the chips with suggested tag values
    function RenderChips(): JSX.Element {
        return (
            <>
                {colours.map((colour) => (
                    <IonCol size="auto" size-sm="auto">
                        <IonChip
                            color="medium"
                            className="ion-margin-end"
                            onClick={() => {
                                setSearchKeyword(colour);
                            }}
                        >
                            <IonLabel className="chipText">{colour}</IonLabel>
                        </IonChip>
                    </IonCol>
                ))}
            </>
        );
    }

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
