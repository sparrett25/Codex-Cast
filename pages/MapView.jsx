// /pages/MapView.jsx
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import NavBar from '../components/NavBar';
import EnvironmentalControlPanel from '../components/Environment/EnvironmentalControlPanel';
import { ScrollModalProvider } from '../context/ScrollModalContext';
import ScrollModal from '../components/ScrollModal';
import PinCreationModal from '../components/PinCreationModal';
import '../styles/pages/mapview.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const iconMap = {
  'catch-location': 'catch-location.png',
  'fishing-spot': 'fishing-spot.png',
  'gear-drop': 'gear-drop.png',
};

export default function MapView() {
  const mapContainerRef = useRef(null);
  const [geoData, setGeoData] = useState(null);
  const [map, setMap] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [scrollType, setScrollType] = useState(null);
  const [pinModalLatLng, setPinModalLatLng] = useState(null);
  const [localPins, setLocalPins] = useState([]);

  const openScroll = (type) => setScrollType(type);
  const closeScroll = () => setScrollType(null);
  const closePinModal = () => setPinModalLatLng(null);

  const addPin = (pinData) => {
    const newFeature = {
      type: 'Feature',
      properties: {
        type: pinData.type,
        name: pinData.name,
        address: pinData.address || 'Dropped pin',
      },
      geometry: {
        type: 'Point',
        coordinates: pinData.coordinates,
      },
    };

    const features = geoData?.features || [];
    const updatedData = {
      type: 'FeatureCollection',
      features: [...features, newFeature],
    };

    const iconId = pinData.type;
    const iconPath = iconMap[iconId];

    if (!map) return;

    const applyPin = () => {
      setGeoData(updatedData);
      if (map.getSource('cast-locations')) {
        map.getSource('cast-locations').setData(updatedData);
      }
      setPinModalLatLng(null);
    };

    if (!map.hasImage(iconId)) {
      map.loadImage(`/icons/${iconPath}`, (error, image) => {
        if (error) {
          console.warn(`Failed to load icon: ${iconPath}`);
          return;
        }
        if (!map.hasImage(iconId)) {
          map.addImage(iconId, image);
        }
        applyPin();
      });
    } else {
      applyPin();
    }
  };

  useEffect(() => {
    fetch('/data/locations.geojson')
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error('GeoJSON load failed:', err));
  }, []);

  useEffect(() => {
    if (!geoData || map) return;

    const initMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [-82.6, 27.9],
      zoom: 9,
    });

    initMap.on('load', () => {
      initMap.addSource('cast-locations', {
        type: 'geojson',
        data: geoData,
      });

      const preloadIcons = (map, icons) => {
        return Promise.all(
          Object.entries(icons).map(([type, path]) => {
            return new Promise((resolve) => {
              if (map.hasImage(type)) return resolve();
              map.loadImage(`/icons/${path}`, (err, img) => {
                if (!err && img && !map.hasImage(type)) {
                  map.addImage(type, img);
                }
                resolve();
              });
            });
          })
        );
      };

      preloadIcons(initMap, iconMap).then(() => {
        initMap.addLayer({
          id: 'cast-locations',
          type: 'symbol',
          source: 'cast-locations',
          layout: {
            'icon-image': ['get', 'type'],
            'icon-size': 1.5,
            'icon-allow-overlap': true,
          },
        });

        initMap.on('click', 'cast-locations', (e) => {
          const feature = e.features[0];
          setSelectedFeature(feature);
          const scrollKey = feature.properties.type;
          if (scrollKey) openScroll(scrollKey);
        });

        initMap.on('click', (e) => {
          const features = initMap.queryRenderedFeatures(e.point, {
            layers: ['cast-locations'],
          });
          if (features.length === 0) {
            setPinModalLatLng([e.lngLat.lng, e.lngLat.lat]);
          }
        });

        setMap(initMap);
      });
    });
  }, [geoData, map]);

  return (
    <ScrollModalProvider>
      <NavBar />
      <div className="mapview-container">
        <div ref={mapContainerRef} className="map-container" />

        <EnvironmentalControlPanel />

        {selectedFeature && (
          <div className="popup-panel">
            <h3>{selectedFeature.properties.name}</h3>
            <p>📍 {selectedFeature.properties.address}</p>
            <p>🧭 Type: {selectedFeature.properties.type}</p>
          </div>
        )}

        {scrollType && <ScrollModal type={scrollType} onClose={closeScroll} />}
        {pinModalLatLng && (
          <PinCreationModal
            latlng={pinModalLatLng}
            onSave={addPin}
            onCancel={closePinModal}
          />
        )}
      </div>
    </ScrollModalProvider>
  );
}
