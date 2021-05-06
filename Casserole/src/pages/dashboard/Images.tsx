import { IonCol, IonGrid, IonImg, IonRow } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { getImageUrls, imageListener } from '../../common/api';
import './Landing.css';

interface ContainerProps { }

const Images: React.FC<ContainerProps> = () => {
    const [urls, setUrls] = useState<any[]>([]);

    useEffect(() => {
        loadData();
    }, [])

    useEffect(() => {
        loadNewData();
    })

    const loadData = async () => {
        var files = await getImageUrls();
        setUrls(files);
    }
    const loadNewData = async () => {
        var files = await imageListener();
        setUrls(files);
    }

    function RenderUploads(): JSX.Element {
        return (
            <>
                {urls.map((url: string) => (
                    <IonCol size="3" key={url} className="ion-padding">
                        <IonImg src={url} />
                    </IonCol>

                ))}
            </>
        );
    }

    return (
        <IonGrid className="body">
            <IonRow className="ion-justify-content-center ion-align-items-center ion-margin" > <RenderUploads /></IonRow>

        </IonGrid>
    );
};

export default Images;