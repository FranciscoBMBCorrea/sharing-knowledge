import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import useApi, { DetailsResult } from "../hooks/useApi";
import {
  bodyOutline,
  clipboardOutline,
  starHalfOutline,
  trophyOutline,
} from "ionicons/icons";

// Defining the type of props received by the Details component
interface DetailsPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

// The Details component
const Details: React.FC<DetailsPageProps> = ({ match }) => {
  // Using the custom hook to fetch details data from the API
  const { getDetails } = useApi();
  
  // State to hold the information about the movie details
  const [information, setInformation] = useState<DetailsResult | null>(null);

  // Use Ionic lifecycle hook to fetch data when the view is about to enter
  useIonViewWillEnter(() => {
    // Function to load data from the API
    const loadData = async () => {
      const id = match.params.id;
      const data = await getDetails(id);
      setInformation(data);
      console.log("🚀 ~file: Details.tsx:26 ~useIonViewWillEnter ~data", data);
    };

    // Call the function to load data
    loadData();
  });

  // JSX structure of the component
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {/* Back button to navigate back to the movies page */}
          <IonButtons slot="start">
            <IonBackButton defaultHref="/movies"></IonBackButton>
          </IonButtons>
          {/* Displaying the genre as the title in the header */}
          <IonTitle>{information?.Genre}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Displaying movie details if available */}
        {information && (
          <IonCard>
            <IonCardHeader>
              {/* Displaying movie title and year */}
              <IonCardTitle>{information.Title}</IonCardTitle>
              <IonCardSubtitle>{information.Year}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              {/* Displaying movie poster */}
              <IonImg src={information.Poster} />

              {/* Displaying IMDb rating */}
              <IonItem lines="none">
                <IonIcon icon={starHalfOutline} slot="start" color="warning" />
                <IonLabel>{information.imdbRating}</IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
        )}

        {/* Modal to show additional details about the movie */}
        <IonModal
          trigger="open-modal"
          initialBreakpoint={0.25}
          breakpoints={[0, 0.25, 0.5, 0.75]}
        >
          <IonContent className="ion-padding">
            {/* Displaying director information */}
            <IonItem lines="none">
              <IonIcon icon={clipboardOutline} slot="start" />
              <IonLabel>{information?.Director}</IonLabel>
            </IonItem>
            {/* Displaying actors information */}
            <IonItem lines="none">
              <IonIcon icon={bodyOutline} slot="start" />
              <IonLabel className="ion-text-wrap">
                {information?.Actors}
              </IonLabel>
            </IonItem>
            {/* Displaying awards and plot information */}
            <IonItem lines="none">
              <IonIcon icon={trophyOutline} slot="start" />
              <IonLabel>{information?.Awards}</IonLabel>
              <p className="ion-padding">{information?.Plot}</p>
            </IonItem>
          </IonContent>
        </IonModal>
      </IonContent>
      {/* Footer button to open the modal */}
      <IonFooter>
        <IonButton expand="full" id="open-modal">
          Show More
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

// Exporting the Details component
export default Details;
