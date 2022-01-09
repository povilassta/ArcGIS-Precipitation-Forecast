require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",

  "esri/layers/FeatureLayer",
  "esri/widgets/TimeSlider",
  "esri/widgets/Legend",
], function (esriConfig, Map, MapView, FeatureLayer, TimeSlider, Legend) {
  esriConfig.apiKey = "ENTER YOUR API KEY"; // TODO: Enter API key

  const map = new Map({
    basemap: "arcgis-topographic", //Basemap layer service
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-95.712891, 37.09024], //Longitude, latitude
    zoom: 4,
  });

  const precipitationLayer = new FeatureLayer({
    url: "https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NDFD_Precipitation_v1/FeatureServer/0",
  });

  view.whenLayerView(precipitationLayer).then(function (lv) {
    const { fullTimeExtent, interval } = precipitationLayer.timeInfo;
    const timeSlider = new TimeSlider({
      container: "timeSlider",
      mode: "time-window",
      view: view,
      timeVisible: true,
      fullTimeExtent,
      playRate: 400,
      loop: true,
      stops: {
        interval,
      },
    });
    view.ui.add(timeSlider, "manual");
  });

  const legend = new Legend({
    view: view,
    layerInfos: [
      {
        layer: precipitationLayer,
        title: "Classification Code",
      },
    ],
  });

  view.ui.add(legend, "bottom-right");

  map.add(precipitationLayer);

  /*
  const popupStation = {
    title: "{STATION_NAME}",
    content:
      "At {OBS_DATETIME}, wind direction is blowing from {WIND_DIRECT} degrees with a speed of {WIND_SPEED} km/h <br>The temperature is {TEMP} Farenheit with {R_HUMIDITY}% humidity.",
    fieldInfos: [
      {
        fieldName: "TEMP",
        format: {
          places: 2,
          digitSeparator: true,
        },
      },
    ],
  };

  const stationLayer = new FeatureLayer({
    url: "https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NOAA_METAR_current_wind_speed_direction_v1/FeatureServer/0",
    outfields: ["STATION_NAME", ""],
    popupTemplate: popupStation,
  });

  console.log(stationLayer);

  map.add(stationLayer);
  */
});
