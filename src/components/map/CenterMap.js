import { useState, useEffect } from "react";
import Map, {
  Marker,
  Popup,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import './CenterMap.scss'


import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";

// GTA
const initialViewState = {
  longitude: -79.38,
  latitude: 43.65,
  zoom: 11,
};

// could add props so parent component can modify it but this component is only planned to be used once to parent does not need access
function CentersMap() {
  const [geolocationPermission, setGeolocationPermission] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  // when using backend remove json import and use this
  const [centers, setCenters] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);
  useEffect(() => {
    if ("geolocation" in navigator) {
      // initial prompt to trigger permission button
      navigator.geolocation.getCurrentPosition(
        ({ coords: { longitude, latitude } }) =>
          setUserLocation({ longitude, latitude })
      );
      // add event listener to listen for changes in permissions
      // change permission state to trigger 2nd use effect
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          setGeolocationPermission(permissionStatus.state);
          permissionStatus.onchange = () =>
            setGeolocationPermission(permissionStatus.state);
        });
    } else {
      setUserLocation(undefined);
    }
    // add backend url
    // fetch and set data
    // axios.get(url).then(res => setCenters(res.data)).catch(err => console.log(err));
    // simulate request delete when json is moved to backend

    axios.get("http://localhost:8080/maps").then((response) => {
      console.log("/maps response: ", response.data.features[0]);
      setCenters(response.data.features);
    });

    // cleanup event listener set above
    return () => {
      if ("geolocation" in navigator) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then((permissionStatus) => {
            permissionStatus.onchange = null;
          });
      }
    };
  }, []);

  // responsible for deleting and adding user location data based on permissions
  useEffect(() => {
    if (geolocationPermission === "granted") {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { longitude, latitude } }) =>
          setUserLocation({ longitude, latitude }),
        () => setUserLocation(undefined)
      );
    } else if (geolocationPermission === "denied") {
      setUserLocation(undefined);
    }
  }, [geolocationPermission]);

  const renderPopupInfo = ({
    AGENCY_NAME: name,
    ADDRESS_FULL: address,
    POSTAL_CODE: postal,
    HOURS: hours,
    ELIGIBILITY: elig,
    WEBSITE: websiteLink,
  }) => {
    // in order to avoid using dangerouslySetInnerHtml since json has <a>
    const regex = /<a\s+[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/;
    const [, href, domain] = websiteLink.match(regex);

    return (
      <div className="mapboxgl-popup-content">
        <h2>{name}</h2>
        <h4>
          {address} {postal}
        </h4>
        <p>{hours}</p>
        <p>{elig}</p>
        <a href={href} target="_blank" rel="noreferrer">
          {domain}
        </a>
      </div>
    );
  };
  

  // code reference
  // https://visgl.github.io/react-map-gl/examples/controls
  // https://github.com/visgl/react-map-gl/blob/7.0-release/examples/controls/src/app.tsx
  return (
    <>
      {userLocation === null ? (
        <h1>Loading ...</h1>
      ) : (
        <Map
          initialViewState={
            userLocation ? { ...userLocation, zoom: 11 } : initialViewState
          }
          mapboxAccessToken="pk.eyJ1IjoiYWJhYmFraSIsImEiOiJjbGZ1a2Q3YzYwYmhzM2VzZmV2ejlodGl0In0.7ZvnqIhwcDFg_jtUYgwsAQ"
          // specify width and height
          style={{ width: "100vw", height: "100vh" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          anchor="bottom">
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          <ScaleControl />
          {userLocation && <GeolocateControl position="top-left" />}
          {userLocation && <Marker {...userLocation} color="red" />}
          {centers &&
            centers.map(
              // destructuring each center object
              ({ geometry, ...properties }) => {
                const {
                  coordinates: [longitude, latitude],
                } = JSON.parse(geometry);
                return (
                  <Marker
                    key={properties.OBJECTID}
                    longitude={longitude}
                    latitude={latitude}
                    onClick={(e) => {
                      // prevent default event from propogating to parents
                      e.originalEvent.stopPropagation();
                      setPopupInfo({
                        longitude,
                        latitude,
                        properties,
                      });
                    }}
                  />
                );
              }
            )}
          {popupInfo && (
            <Popup
              anchor="top"
              longitude={popupInfo.longitude}
              latitude={popupInfo.latitude}
              onClose={() => setPopupInfo(null)}>
              {renderPopupInfo(popupInfo.properties)}
            </Popup>
          )}
        </Map>

      )}
    </>
  );
}

export default CentersMap;