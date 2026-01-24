
import fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('tides_data.json', 'utf8'));

const processedData = {};

rawData.forEach(monthItem => {
  const monthKey = parseInt(monthItem.month, 10); // 4, 5, ...
  
  processedData[monthKey] = monthItem.data.map(item => {
    const raw = item.raw;
    // Assuming standard 6 columns: Date, Day, Note, High, Low, Range
    // If fewer, we map from end?
    
    // Last is always range
    const range = raw[raw.length - 1];
    const low = raw[raw.length - 2];
    const high = raw[raw.length - 3];
    // Note is whatever is at index 2 (if length >= 3)
    let note = "";
    if (raw.length >= 4) {
        // If length is 6, note is at 2.
        // If length is 5, maybe note is missing?
        // Let's assume note is raw[2] if it's not a time.
        const potentialNote = raw[2];
        if (!potentialNote.includes(':')) {
            note = potentialNote;
        }
    }
    
    // Clean up date (pad 0)
    const dateNum = item.date.padStart(2, '0');
    
    return {
      date: dateNum,
      day: item.day,
      tides: [
        {
          high: high,
          low: low,
          range: range
        }
      ],
      special: note || null
    };
  });
});

const fileContent = `
// 2026 奎壁山摩西分海潮汐表 (資料來源：交通部觀光署澎湖國家風景區管理處)
// 115年4月-10月

const tidesData = ${JSON.stringify(processedData, null, 2)};

export const getTideData = (year, month) => {
  // Only 2026 data is available
  if (year !== 2026) return [];
  return tidesData[month] || [];
};
`;

fs.writeFileSync('src/data/tides.js', fileContent);
console.log('src/data/tides.js updated successfully.');
