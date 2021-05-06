import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonRadio, IonRadioGroup, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import ImageUploader from 'react-images-upload';
import React, { useEffect, useState } from 'react';
import './PostUpload.css';
import { getTags } from '../../common/api';
import { setConstantValue } from 'typescript';

interface Props {
    history: {
        location: {
            state: {
                files: any
            };
        };
    };
}

class Tag {
    tag: string;
    selected: boolean;

    constructor(tag: string, selected: boolean) {
        this.tag = tag;
        this.selected = selected;
    }

}

class Picture {
    picture: File;
    tags: string[];

    constructor(picture: File, tags: string[]) {
        this.picture = picture;
        this.tags = tags;
    }
}

const PostUpload: React.FC<Props> = (props) => {
    const data = props.history.location.state;
    const [pictures, setPictures] = useState<any[]>([]);
    const [tags, setTags] = useState([""]);
    const [checkboxList, setCheckBoxList] = useState<any[]>([]);


    useEffect(() => {
        loadData();
    }, [data]);

    const loadData = async () => {
        var res = await getTags();
        setTags(res);
        setPictures(data.files);
        var list = res.map((tag) => new Tag(tag, false));
        setCheckBoxList(list);
    }

    function RenderUploads(): JSX.Element {
        return (
            <>
                {pictures.map((picture) => (
                    <IonRow className="ion-justify-content-center ion-align-items-center ion-margin" key={picture.name}>
                        <IonCol size="4" key={picture.name} className="ion-padding">
                            <img src={picture.url} />
                        </IonCol>
                        <IonCol size="2" className="ion-padding">
                            {checkboxList.map((tag, i) => (
                                <IonItem key={i} lines="none">
                                    <IonLabel color="tertiary" className="tagText">{tag.tag}</IonLabel>
                                    <IonCheckbox slot="end" value={tag.tag} checked={tag.selected} color="medium" />
                                </IonItem>
                            ))}
                        </IonCol>
                    </IonRow>

                ))}
            </>
        );
    }

    const upload = async () => {

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
                            <div className="bodyText">Select as many tags as you want for your images!</div>
                        </IonCol>
                    </IonRow>
                    <RenderUploads />
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default PostUpload;
