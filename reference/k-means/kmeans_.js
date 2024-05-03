const MAX_ITERATIONS = 50;
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * start~end구간에 dataset의 평균값을 구해서 리턴.
 * @param {*} dataSet
 * @param {*} start
 * @param {*} end
 * @returns
 */
function calcMeanCentroid(dataSet, start, end) {
  const features = dataSet[0].length;
  const n = end - start;
  let mean = [];
  for (let i = 0; i < features; i++) {
    mean.push(0);
  }
  for (let i = start; i < end; i++) {
    for (let j = 0; j < features; j++) {
      mean[j] = mean[j] + dataSet[i][j] / n;
    }
  }
  return mean;
}

/**
 * dataset을 k그룹으로 나누고 각 그룹에 중심(평균값)을 구한 후 리턴.
 * @param {*} dataset
 * @param {*} k
 * @returns
 */
function getRandomCentroidsNaiveSharing(dataset, k) {
  const numSamples = dataset.length;
  const step = Math.floor(numSamples / k);
  const centroids = [];
  for (let i = 0; i < k; i++) {
    const start = step * i;
    let end = step * (i + 1);
    if (i + 1 === k) {
      end = numSamples;
    }
    centroids.push(calcMeanCentroid(dataset, start, end));
  }
  return centroids;
}

/**
 * 랜덤 중심점 추출
 */
function getRandomCentroids(dataset, k) {
  const numSamples = dataset.length;
  const centroidsIndex = [];
  let index;
  while (centroidsIndex.length < k) {
    index = randomBetween(0, numSamples);
    if (centroidsIndex.indexOf(index) === -1) {
      centroidsIndex.push(index);
    }
  }
  const centroids = [];
  for (let i = 0; i < centroidsIndex.length; i++) {
    const centroid = [...dataset[centroidsIndex[i]]];
    centroids.push(centroid);
  }
  return centroids;
}

function compareCentroids(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

function shouldStop(oldCentroids, centroids, iterations) {
  if (iterations > MAX_ITERATIONS) {
    return true;
  }
  if (!oldCentroids || !oldCentroids.length) {
    return false;
  }
  let sameCount = true;
  for (let i = 0; i < centroids.length; i++) {
    if (!compareCentroids(centroids[i], oldCentroids[i])) {
      sameCount = false;
    }
  }
  return sameCount;
}

/**
 * 유클리드 거리 구하기
 */
function getDistanceSQ(a, b) {
  const diffs = [];
  for (let i = 0; i < a.length; i++) {
    diffs.push(a[i] - b[i]);
  }
  return diffs.reduce((r, e) => r + e * e, 0);
}
/**
 * 데이터셋에서 그룹에 중심과 가장 가까운 포인트 위치 설정.
 * @param {*} dataSet
 * @param {*} centroids
 * @returns
 */
function getLabels(dataSet, centroids) {
  const labels = {};
  for (let c = 0; c < centroids.length; c++) {
    labels[c] = {
      points: [],
      centroid: centroids[c]
    };
  }

  for (let i = 0; i < dataSet.length; i++) {
    const a = dataSet[i];
    let closetCentroid, closetCentroidIndex, prevDistance;
    for (let j = 0; j < centroids.length; j++) {
      let centroid = centroids[j];
      if (j === 0) {
        closetCentroid = centroid;
        closetCentroidIndex = j;
        prevDistance = getDistanceSQ(a, centroid);
      } else {
        const distance = getDistanceSQ(a, centroid);
        if (distance < prevDistance) {
          prevDistance = distance;
          //closetCentroid = centroid;
          closetCentroidIndex = j;
        }
      }
    }
    labels[closetCentroidIndex].points.push(a);
  }
  return labels;
}

function getPointsMean(pointList) {
  const totalPoints = pointList.length;
  const means = [];
  for (let j = 0; j < pointList[0].length; j++) {
    means.push(0);
  }
  for (let i = 0; i < pointList.length; i++) {
    const point = pointList[i];
    for (let j = 0; j < point.length; j++) {
      const val = point[j];
      means[j] = means[j] + val / totalPoints;
    }
  }
  return means;
}

/**
 *
 * @param {*} dataSet
 * @param {*} labels
 * @param {*} k
 * @returns
 */
function reCalculateCentroids(dataSet, labels, k) {
  let newCentroid;
  const newCentroidList = [];
  for (const k in labels) {
    const centroidGroup = labels[k];
    //labels에 그룹이 존재할 경우 그룹에 중심을 계산
    if (centroidGroup.points.length > 0) {
      newCentroid = getPointsMean(centroidGroup.points);
    } else {
      //그룹이 없을 경우 데이터셋에서 임의로 하나의 중심을 계산.
      newCentroid = getRandomCentroids(dataSet, 1)[0];
    }
    newCentroidList.push(newCentroid);
  }
  return newCentroidList;
}

function kmeans(dataset, k, useNaiveSharing = true) {
  if (dataset.length && dataset[0].length && dataset.length > k) {
    let iterations = 0;
    let oldCentroids, labels, centroids;
    //초기 중심점 가져오기
    if (useNaiveSharing) {
      centroids = getRandomCentroidsNaiveSharing(dataset, k);
    } else {
      centroids = getRandomCentroids(dataset, k);
    }

    //지정한 iterations까지 평균값이 같지 않을경우 반복.
    while (!shouldStop(oldCentroids, centroids, iterations)) {
      oldCentroids = [...centroids];
      iterations++;

      labels = getLabels(dataset, centroids);
      centroids = reCalculateCentroids(dataset, labels, k);
    }

    const clusters = [];
    for (let i = 0; i < k; i++) {
      clusters.push(labels[i]);
    }

    const results = {
      clusters,
      centroids,
      iterations,
      converged: iterations <= MAX_ITERATIONS
    };
    return results;
  } else {
    throw new Error('Invalid dataset');
  }
}
