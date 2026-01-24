
import fs from 'fs';
import path from 'path';
import https from 'https';

const months = ['04', '05', '06', '07', '08', '09', '10'];
const year = '115'; // 2026
const baseUrl = 'https://www.penghu-nsa.gov.tw/Services/Tidenew/';

async function fetchHtml(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(data));
            res.on('error', (err) => reject(err));
        }).on('error', (err) => reject(err));
    });
}

function parseTable(html) {
    // Find table content
    const tableStart = html.indexOf('<table');
    if (tableStart === -1) return [];
    const tableEnd = html.indexOf('</table>', tableStart);
    const tableHtml = html.substring(tableStart, tableEnd);

    // Extract rows
    const rowRegex = /<tr>([\s\S]*?)<\/tr>/g;
    const rows = [];
    let match;
    while ((match = rowRegex.exec(tableHtml)) !== null) {
        rows.push(match[1]);
    }

    // Remove header row
    rows.shift();

    const result = [];
    let lastDate = null;
    let lastDay = null;
    let lastSpecial = null;

    for (const rowContent of rows) {
        // Extract cells
        const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/g;
        const cells = [];
        let cellMatch;
        while ((cellMatch = cellRegex.exec(rowContent)) !== null) {
            let content = cellMatch[1].replace(/<br\s*\/?>/gi, '').replace(/&nbsp;/g, ' ').trim();
            // Remove html tags if any remain
            content = content.replace(/<[^>]+>/g, '');
            cells.push(content);
        }

        if (cells.length === 0) continue;

        // Check for rowspan (implied by cell count)
        // Normal row: date, day, special, high, low, range (6 cells)
        // Second tide row: high, low, range (3 cells)
        
        if (cells.length >= 6) {
            // New date
            lastDate = cells[0].padStart(2, '0');
            lastDay = cells[1];
            lastSpecial = cells[2] ? cells[2].replace(/\s+/g, ' ').trim() : null;
            if (lastSpecial === '') lastSpecial = null;

            result.push({
                date: lastDate,
                day: lastDay,
                tides: [{
                    high: cells[3],
                    low: cells[4],
                    range: cells[5]
                }],
                special: lastSpecial
            });
        } else if (cells.length === 3) {
            // Second tide for previous date
            const currentEntry = result[result.length - 1];
            if (currentEntry) {
                currentEntry.tides.push({
                    high: cells[0],
                    low: cells[1],
                    range: cells[2]
                });
            }
        }
    }

    return result;
}

async function main() {
    const allData = {};

    for (const month of months) {
        const url = `${baseUrl}${year}${month}tide.htm`;
        console.log(`Fetching ${url}...`);
        try {
            const html = await fetchHtml(url);
            const data = parseTable(html);
            // Remove '0' prefix from month key if preferred, but existing data uses "4", "5".
            // Let's use string "4", "5" etc.
            const monthKey = parseInt(month, 10).toString();
            allData[monthKey] = data;
            console.log(`Processed month ${month}: ${data.length} days`);
        } catch (err) {
            console.error(`Error processing month ${month}:`, err);
        }
    }

    const outputPath = path.resolve('src/data/tides.js');
    const fileContent = `// 2026 奎壁山摩西分海潮汐表 (資料來源：交通部觀光署澎湖國家風景區管理處)
// 115年4月-10月

const tidesData = ${JSON.stringify(allData, null, 2)};

export default tidesData;
`;

    fs.writeFileSync(outputPath, fileContent);
    console.log(`Updated ${outputPath}`);
}

main();
