function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: { lat: 45.0343255897775, lng: 26.427679691648127 },
      mapTypeId: "satellite",
    });

    let isAddingPoints = false;
    let editableCoords = [];
    let previewPolygon = null;
    let polygons = [];
    let selectedPolygon = null;

    const addBtn = document.getElementById("addPolygonPoint");
    const finishBtn = document.getElementById("finishPolygon");
    const cancelBtn = document.getElementById("cancelPolygon");
    const deleteBtn = document.getElementById("deletePolygon");

    addBtn.addEventListener("click", () => {
      isAddingPoints = true;
      editableCoords = [];
      if (previewPolygon) {
        previewPolygon.setMap(null);
        previewPolygon = null;
      }
      finishBtn.style.display = "inline";
      cancelBtn.style.display = "inline";
    });

    finishBtn.addEventListener("click", () => {
      if (editableCoords.length > 0) {
        const newPolygon = new google.maps.Polygon({
          paths: editableCoords,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
        });
        newPolygon.setMap(map);
        polygons.push(newPolygon);
        addSelectionListener(newPolygon);
      }
      isAddingPoints = false;
      if (previewPolygon) {
        previewPolygon.setMap(null);
        previewPolygon = null;
      }
      finishBtn.style.display = "none";
      cancelBtn.style.display = "none";
    });

    cancelBtn.addEventListener("click", () => {
      isAddingPoints = false;
      if (previewPolygon) {
        previewPolygon.setMap(null);
        previewPolygon = null;
      }
      finishBtn.style.display = "none";
      cancelBtn.style.display = "none";
    });

    map.addListener("click", (mapsMouseEvent) => {
      if (!isAddingPoints) return;

      const clickedLatLang = mapsMouseEvent.latLng.toJSON();
      editableCoords.push(clickedLatLang);

      if (previewPolygon) {
        previewPolygon.setPaths(editableCoords);
      } else {
        previewPolygon = new google.maps.Polygon({
          paths: editableCoords,
          strokeColor: "#00FF00",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#00FF00",
          fillOpacity: 0.35,
        });
        previewPolygon.setMap(map);
      }
    });

    function selectPolygon(polygon) {
if (selectedPolygon) {
if (selectedPolygon === polygon) {
  selectedPolygon.setOptions({ strokeColor: '#FF0000', fillColor: '#FF0000' });
  selectedPolygon = null;
  return;
} else {
  selectedPolygon.setOptions({ strokeColor: '#FF0000', fillColor: '#FF0000' });
}
}

selectedPolygon = polygon;
selectedPolygon.setOptions({ strokeColor: '#0000FF', fillColor: '#0000FF' });
}

    function addSelectionListener(polygon) {
      polygon.addListener('click', () => {
        selectPolygon(polygon);
      });
    }

    deleteBtn.addEventListener("click", () => {
      if (selectedPolygon) {
        selectedPolygon.setMap(null);
        polygons = polygons.filter(p => p !== selectedPolygon);
        selectedPolygon = null;
      }
    });
  }

  window.initMap = initMap;