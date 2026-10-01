import { calcPrice, buildPackages, TARIFF } from './src/data/paket.js';

console.log('=== TEST TARIF & CALC PRICE ===');

const expectedTelepon = [
  { minutes: 6, total: 5994, dpp: 5400, ppn: 594 },
  { minutes: 12, total: 11988, dpp: 10800, ppn: 1188 },
  { minutes: 18, total: 17982, dpp: 16200, ppn: 1782 },
  { minutes: 24, total: 23976, dpp: 21600, ppn: 2376 },
  { minutes: 30, total: 29970, dpp: 27000, ppn: 2970 },
  { minutes: 36, total: 35964, dpp: 32400, ppn: 3564 },
];

const expectedVideo = [
  { minutes: 6, total: 9990, dpp: 9000, ppn: 990 },
  { minutes: 12, total: 19980, dpp: 18000, ppn: 1980 },
  { minutes: 18, total: 29970, dpp: 27000, ppn: 2970 },
  { minutes: 24, total: 39960, dpp: 36000, ppn: 3960 },
  { minutes: 30, total: 49950, dpp: 45000, ppn: 4950 },
  { minutes: 36, total: 59940, dpp: 54000, ppn: 5940 },
];

let failed = 0;

console.log('\nTesting Telepon (Tarif Rp 15/detik):');
expectedTelepon.forEach(({ minutes, total, dpp, ppn }) => {
  const res = calcPrice('telepon', minutes);
  const match = res.total === total && res.dpp === dpp && res.ppn === ppn;
  if (!match) {
    console.error(`❌ FAILED ${minutes} min: expected total=${total}, got=${res.total}`);
    failed++;
  } else {
    console.log(`✅ PASSED ${minutes} min: dpp=${res.dpp}, ppn=${res.ppn}, total=${res.total}`);
  }
});

console.log('\nTesting Video Call (Tarif Rp 25/detik):');
expectedVideo.forEach(({ minutes, total, dpp, ppn }) => {
  const res = calcPrice('video', minutes);
  const match = res.total === total && res.dpp === dpp && res.ppn === ppn;
  if (!match) {
    console.error(`❌ FAILED ${minutes} min: expected total=${total}, got=${res.total}`);
    failed++;
  } else {
    console.log(`✅ PASSED ${minutes} min: dpp=${res.dpp}, ppn=${res.ppn}, total=${res.total}`);
  }
});

console.log('\nTesting buildPackages:');
const telpList = buildPackages('telepon');
const videoList = buildPackages('video');
console.log(`Telepon packages count: ${telpList.length} (expected 6)`);
console.log(`Video packages count: ${videoList.length} (expected 6)`);

if (telpList.length !== 6 || videoList.length !== 6) {
  console.error('❌ Package count mismatch');
  failed++;
} else {
  console.log('✅ Package counts match');
}

if (failed === 0) {
  console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY!');
  process.exit(0);
} else {
  console.error(`\n❌ ${failed} TESTS FAILED!`);
  process.exit(1);
}
