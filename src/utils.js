// you can put util functions here if you want

// groups array of Objects by specified key
export function groupBy(data, key) {
  return data.reduce((acc, row) => {
    if (!acc[row[key]]) {
      acc[row[key]] = [];
    }
    acc[row[key]].push(row);
    return acc;
  }, {});
}

// gets listing counts for a neighbourhood based on specific room type
export function getListingCountForHood(gHoodData, hood, roomType) {
  const data = groupBy(gHoodData[hood], 'room_type')[roomType];
  const size = (typeof data !== 'undefined') ? data.length : 0;
  return size;
}

// gets top 20 neighbourhoods by number of listings for specified room type
export function getTopHoodsBy(gHoodData, roomType) {
  let items = Object.keys(gHoodData).map(k => {
    return [k, getListingCountForHood(gHoodData, k, roomType)];
  });
  items.sort((first, second) => {
    return second[1] - first[1];
  });
  items = items.slice(0, 20);
  return items;
}

// gets the top 20 neighbourhoods by total listings
export function getTopHoodsByTotal(gHoodData) {
  let items = Object.keys(gHoodData).map(k => {
    return [k, gHoodData[k].length];
  });
  items.sort((first, second) => {
    return second[1] - first[1];
  });
  items = items.slice(0, 20);
  return items;
}

// formats data as {neighbourhood: {room_type: #, room_type: #, ...}}
export function getRoomDataForHoods(gHoodData, hoodData) {
  const roomData = {};
  hoodData.forEach(d => {
    const gRmTypeData = groupBy(gHoodData[d[0]], 'room_type');
    roomData[d[0]] = gRmTypeData;
  });
  return roomData;
}

// formats data into barseries required format [{x: neighbourhood, y: #}, ...]
export function formatBarData(roomTypes, roomData) {
  const barsData = roomTypes.reduce((barData, roomType) => {
    barData[roomType] = Object.keys(roomData).map(hood => {
      const roomTypeData = roomData[hood][roomType];
      const entry = {};
      entry.x = hood;
      entry.y = (typeof roomTypeData !== 'undefined') ? roomTypeData.length : 0;
      return entry;
    });
    return barData;
  }, {});
  return barsData;
}

// formats data into [{longitude, latitude}] required for HeatMapOverlay
export function formatLngLat(data) {
  if (data === null) {
    return data;
  }
  const dataCopy = data.slice(0)
  const lngLatData = dataCopy.map(row => {
    const lng = Number(row.longitude);
    const lat = Number(row.latitude);
    return {longitude: lng, latitude: lat};
  });
  console.log(lngLatData);
  return lngLatData;
}