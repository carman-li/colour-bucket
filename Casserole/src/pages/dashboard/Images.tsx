import { IonCol, IonGrid, IonImg, IonRow } from '@ionic/react';
import React, { } from 'react';
import './Landing.css';

interface Props {
    images: any
}

const Images: React.FC<Props> = (props) => {
    const images = props.images;


    function RenderUploads(): JSX.Element {
        return (
            <>
                {images.map((imageUrl: string) => (
                    <IonCol size="3" key={imageUrl} className="ion-padding">
                        <IonImg src={imageUrl} />
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