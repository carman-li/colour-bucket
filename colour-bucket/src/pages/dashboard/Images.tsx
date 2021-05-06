import { IonButton, IonChip, IonCol, IonGrid, IonIcon, IonImg, IonLabel, IonLoading, IonRow, IonSearchbar, IonToast } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { getColours, getImages, searchColours } from '../../common/api';
import './Landing.css';

const Images: React.FC = () => {
    const [images, setImages] = useState<any[]>([]);
    const [showToast, setShowToast] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [colours, setColours] = useState([""]);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);

    const search = async () => {
        setLoading(true);
        setSearched(true);
        var res = await searchColours(searchKeyword);
        setImages(res);
        setLoading(false);
    }

    useEffect(() => {
        if (searched == false) {
            loadData();
        }
    }, [setImages])

    const loadData = async () => {
        setLoading(true);
        var res = await getImages();
        setImages(res);
        var coloursRes = await getColours();
        setColours(coloursRes.slice(0, 5));
        setLoading(false);
    }

    function RenderUploads(): JSX.Element {
        return (
            <>
                {images.map((pic: any) => (
                    pic != null ? <IonRow className="ion-justify-content-center ion-align-items-center ion-margin" >
                        <IonCol size="3" className="ion-padding">
                            <IonImg src={pic.url} />
                        </IonCol>
                        <IonCol size="1" className="ion-padding">
                            <IonChip
                                style={{ backgroundColor: pic.colours.darkMuted, width: "100%" }}
                                className="ion-margin-end"
                                onClick={() => { navigator.clipboard.writeText(pic.colours.darkMuted); setShowToast(true) }}
                            >
                            </IonChip>
                            <IonChip
                                style={{ backgroundColor: pic.colours.darkVibrant, width: "100%" }}
                                className="ion-margin-end"
                                onClick={() => { navigator.clipboard.writeText(pic.colours.darkVibrant); setShowToast(true) }}
                            >
                            </IonChip>
                            <IonChip
                                style={{ backgroundColor: pic.colours.lightMuted, width: "100%" }}
                                className="ion-margin-end"
                                onClick={() => { navigator.clipboard.writeText(pic.colours.lightMuted); setShowToast(true) }}
                            >
                            </IonChip>
                            <IonChip
                                style={{ backgroundColor: pic.colours.lightVibrant, width: "100%" }}
                                className="ion-margin-end"
                                onClick={() => { navigator.clipboard.writeText(pic.colours.lightVibrant); setShowToast(true) }}
                            >
                            </IonChip>
                            <IonChip
                                style={{ backgroundColor: pic.colours.muted, width: "100%" }}
                                className="ion-margin-end"
                                onClick={() => { navigator.clipboard.writeText(pic.colours.muted); setShowToast(true) }}
                            >
                            </IonChip>
                            <IonChip
                                style={{ backgroundColor: pic.colours.vibrant, width: "100%" }}
                                className="ion-margin-end"
                                onClick={() => { navigator.clipboard.writeText(pic.colours.vibrant); setShowToast(true) }}
                            >
                            </IonChip>
                        </IonCol>
                    </IonRow> : <div></div>
                ))}
            </>
        );
    }

    // this function renders the chips with suggested colour values
    function RenderChips(): JSX.Element {
        return (
            <>
                {colours.map((colour) => (
                    <IonCol size="auto">
                        <IonChip
                            color="medium"
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
        <IonGrid className="body">
            <IonLoading
                cssClass="loading"
                isOpen={loading}
                onDidDismiss={() => setLoading(false)}
                message={'Please wait...'}
                spinner="crescent"
            />
            <IonToast
                cssClass="toast"
                isOpen={showToast}
                duration={500}
                message="Colour Code Copied :)"
                position="bottom"
                onDidDismiss={() => setShowToast(false)}
            />
            <IonRow className="ion-justify-content-center ion-margin"> <IonCol>
                <div className="text">Search through your uploaded images by hexcode. Scroll to see all your images.</div></IonCol></IonRow>
            <IonRow className="ion-justify-content-center">
                <IonCol size="12" size-md="5" className="ion-margin-end">
                    <IonSearchbar
                        className="searchBar ion-margin-bottom ion-no-padding"
                        showCancelButton="never"
                        showClearButton="never"
                        animated
                        value={searchKeyword}
                        placeholder="Search by hexcode"
                        onIonChange={(e) => setSearchKeyword(e.detail.value!)}
                    ></IonSearchbar>
                    {colours.length > 0 ? <IonRow>
                        <IonCol size="auto" size-sm="auto" className="ion-margin-end">
                            <p className="text">Suggestions:</p>
                        </IonCol>
                        <RenderChips />
                    </IonRow> : <div></div>}
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
                        disabled={images.length <= 0 || images == null || searchKeyword == ""}
                    >
                        <IonIcon slot="icon-only" icon={searchOutline} />
                    </IonButton>
                </IonCol>
                <IonCol size="12" size-md="2">
                    <IonButton
                        fill="solid"
                        color="secondary"
                        expand="full"
                        shape="round"
                        onClick={() => {
                            setSearched(false);
                            setSearchKeyword("");
                            loadData();
                        }}
                        disabled={searchKeyword == ""}
                    >
                        Clear Search
                    </IonButton>
                </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center ion-align-items-center">
                <IonCol>
                    {images.length > 0 && images != null ? <div className="text">Click on a colour chip to copy the hexcode to your clipboard.</div> : <div></div>}
                </IonCol>
            </IonRow>
            { images.length > 0 && images != null ? <RenderUploads /> : <div></div>}

        </IonGrid >
    );
};

export default Images;