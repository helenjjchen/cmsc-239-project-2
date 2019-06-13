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

export function groupByVal(data) {
  const gHoodData = groupBy(data, 'neighbourhood_cleansed');
  return Object.keys(gHoodData).reduce((acc, neigh) => {
    const ent = gHoodData[neigh].reduce((dict, listing) => {
      if (!dict[Number(listing['review_scores_rating'])]) {
        dict[Number(listing['review_scores_rating'])] = 0
      }
      dict[Number(listing['review_scores_rating'])] += 1;
      return dict;
    }, {});
  acc[neigh] = ent;
  return acc;
  }, {});
}

export function fixDict(dict) {
  return Object.keys(dict).reduce((newArray, k) => {
    newArray.push({x0:Number(k) - .4, x: Number(k) + .4, y:dict[k]});
    return newArray;
  }, []);
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
export function formatStackBarData(roomTypes, roomData) {
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

export function formatPriceBarData(hoodPriceData) {
  return Object.keys(hoodPriceData).sort().map((roomType) => {
    const entry = {};
    entry.x = roomType;
    entry.y = hoodPriceData[roomType];
    return entry;
  });
}

export function getMedianData(groupHoodData) {
  const initRoomTypes = ['Shared room', 'Private room', 'Entire home/apt'];
  const medianData = Object.keys(groupHoodData).reduce((hoods, hoodName) => {
    const initData = groupBy(groupHoodData[hoodName], 'room_type');
    const medianPriceEntry = initRoomTypes.reduce((acc, roomType) => {
      const listings = initData[roomType];
      acc[roomType] = (typeof listings !== 'undefined') ? getMedPriceForListings(listings) : 0;
      return acc;
    }, {});
    hoods[hoodName] = medianPriceEntry;
    return hoods;
  }, {});
  return medianData;
}

// gets the median price from an array of listing objects
export function getMedPriceForListings(listings) {
  const priceArray = listings.map((listing) => {
    return Number(listing.price);
  });
  return median(priceArray);
}

// gets the median review from an array of listing objects
export function getMedReviewForListings(listings) {
  const priceArray = listings.map((listing) => {
    return Number(listing.review_scores_rating);
  });
  return median(priceArray);
}

// finds median value given an array of values (numbers)
function median(values) {
  const len = values.length;
  values = values.sort();
  if (len % 2 === 0) {
    return (values[len / 2 - 1] + values[len / 2]) / 2;
  }
  return values[(len - 1) / 2];
}

// finds mean value given an array of values (numbers)
function mean(values) {
  const len = values.length;
  const ret = values.reduce((acc, value) => {
    acc += value;
    return acc;
  }, 0);
  return ret / len;
}

// finds mean # of reviews given a an array of listing objects
function getMeanReviews(listings) {
  const reviewArray = listings.map(listing => {
    return Number(listing.review_scores_rating);
  });
  return mean(reviewArray);
}

// formats scatterplot data given grouped neighborhood dat
export function formatScatterData(groupHoodData) {
  if (groupHoodData === null) {
    return groupHoodData;
  }
  const ret = Object.keys(groupHoodData).map(hoodName => {
    const xMedPrice = getMedPriceForListings(groupHoodData[hoodName]);
    const yMedReview = getMedReviewForListings(groupHoodData[hoodName]);
    const sizeMeanReview = getMeanReviews(groupHoodData[hoodName]);
    return {x: xMedPrice, y: yMedReview, size: sizeMeanReview};
  });
  console.log(ret);
  return ret;
}
