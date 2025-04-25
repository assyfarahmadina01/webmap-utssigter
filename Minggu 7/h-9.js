<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TPS Kabupaten Pemalang</title>
  <style>
    html, body {
      height: 100%;
      margin: 0;
      padding: 0;
    }
    #map {
      width: 100%;
      height: 100%;
    }
  </style>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@latest/ol.css">
</head>
<body>
  <div id="map"></div>

  <script type="module">
    import 'https://cdn.jsdelivr.net/npm/ol@latest/ol.css';
    import Map from 'https://cdn.jsdelivr.net/npm/ol@latest/Map.js';
    import View from 'https://cdn.jsdelivr.net/npm/ol@latest/View.js';
    import TileLayer from 'https://cdn.jsdelivr.net/npm/ol@latest/layer/Tile.js';
    import XYZ from 'https://cdn.jsdelivr.net/npm/ol@latest/source/XYZ.js';
    import VectorLayer from 'https://cdn.jsdelivr.net/npm/ol@latest/layer/Vector.js';
    import VectorSource from 'https://cdn.jsdelivr.net/npm/ol@latest/source/Vector.js';
    import GeoJSON from 'https://cdn.jsdelivr.net/npm/ol@latest/format/GeoJSON.js';
    import { Style, Fill, Stroke, Circle as CircleStyle } from 'https://cdn.jsdelivr.net/npm/ol@latest/style.js';

    // Base map layer (OpenStreetMap)
    const baseLayer = new TileLayer({
      source: new XYZ({
        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      }),
    });

    // Style function to create distinct styles per layer
    const createStyle = (fillColor, strokeColor, strokeWidth = 1) =>
      new Style({
        fill: new Fill({ color: fillColor }),
        stroke: new Stroke({ color: strokeColor, width: strokeWidth }),
      });

    // Layer: Pemukiman
    const pemukimanLayer = new VectorLayer({
      source: new VectorSource({
        url: 'geojson/pemukiman.geojson',
        format: new GeoJSON(),
      }),
      style: createStyle('rgba(255, 0, 0, 0.3)', 'red'),
    });

    // Layer: Sungai
    const sungaiLayer = new VectorLayer({
      source: new VectorSource({
        url: 'geojson/sungai.geojson',
        format: new GeoJSON(),
      }),
      style: createStyle('rgba(0, 0, 255, 0.1)', 'blue', 2),
    });

    // Layer: Jalan
    const jalanLayer = new VectorLayer({
      source: new VectorSource({
        url: 'geojson/jalan.geojson',
        format: new GeoJSON(),
      }),
      style: new Style({
        stroke: new Stroke({
          color: '#000000',
          width: 1.5,
        }),
      }),
    });

    // Layer: Lokasi TPS
    const tpsLayer = new VectorLayer({
      source: new VectorSource({
        url: 'geojson/tps.geojson',
        format: new GeoJSON(),
      }),
      style: new Style({
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({ color: 'green' }),
          stroke: new Stroke({ color: '#0b0', width: 1 }),
        }),
      }),
    });

    // Map initialization
    const map = new Map({
      target: 'map',
      layers: [baseLayer, sungaiLayer, jalanLayer, pemukimanLayer, tpsLayer],
      view: new View({
        center: [12209641.722, -751902.125], // EPSG:3857
        zoom: 11.5,
      }),
    });
  </script>
</body>
</html>
