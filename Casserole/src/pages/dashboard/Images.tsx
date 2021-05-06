import { IonChip, IonCol, IonGrid, IonImg, IonRow, IonToast } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { getImages } from '../../common/api';
import './Landing.css';

const Images: React.FC = () => {
    const [images, setImages] = useState<any[]>([]);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        loadData();
    }, [setImages])

    const loadData = async () => {
        var res = await getImages();
        console.log(res)
        setImages(res);
    }

    function RenderUploads(): JSX.Element {
        return (
            <>
                {images.map((pic: any) => (
                    <IonRow className="ion-justify-content-center ion-align-items-center ion-margin" >
                        <IonCol size="3" key={pic.url} className="ion-padding">
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

                    </IonRow>
                ))}
            </>
        );
    }

    return (
        <IonGrid className="body">
            <IonToast
                isOpen={showToast}
                duration={7}
                message="Colour Code Copied :)"
                position="bottom"
                onDidDismiss={() => setShowToast(false)}
            />
            <IonRow className="ion-justify-content-center ion-align-items-center">
                <IonCol>
                    <div className="text">Click on a colour chip to copy the hexcode to your clipboard!</div>
                </IonCol>
            </IonRow>
            <RenderUploads />
        </IonGrid >
    );
};

export default Images;