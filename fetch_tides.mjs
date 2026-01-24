
import fs from 'fs';

const months = ['04', '05', '06', '07', '08', '09', '10'];
const baseUrl = 'https://www.penghu-nsa.gov.tw/Services/Tidenew/115';

async function fetchMonth(month) {
  const url = `${baseUrl}${month}tide.htm`;
  // console.log(`Fetching ${url}...`);
  try {
    const res = await fetch(url);
    const text = await res.text();
    
    // Simple regex to find the table rows
    // Looking for patterns like: <tr><td>1</td><td>...</td></tr>
    // The data usually has Date (day), Weekday, Tide Times, Safe Passage Times
    
    // Let's try to isolate the table first
    const tableMatch = text.match(/<table[^>]*>([\s\S]*?)<\/table>/i);
    if (!tableMatch) {
      console.error(`No table found for month ${month}`);
      return [];
    }
    
    const tableContent = tableMatch[1];
    const rows = tableContent.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi);
    
    const monthData = [];
    
    if (rows) {
      rows.forEach((row, index) => {
        // Skip header rows (usually first 1-2 rows)
        // We can detect header by looking for '日期' or 'th'
        if (row.includes('日期') || row.includes('<th>')) return;
        
        const cells = row.match(/<td[^>]*>([\s\S]*?)<\/td>/gi);
        if (cells && cells.length >= 2) {
            // Clean cell content
            const cleanCells = cells.map(cell => {
                return cell.replace(/<[^>]+>/g, '').trim().replace(/&nbsp;/g, ' ');
            });
            
            // Expected columns: Date, Day, Tide Time (High/Low), Safe Passage (Open-Close)
            // Note: The structure varies. Usually:
            // Col 0: Date (e.g., 1)
            // Col 1: Day (e.g., 三)
            // Col 2: Tide (e.g., 乾潮 13:30)
            // Col 3: Safe Passage (e.g., 08:00~17:00) - This is the key part
            
            // However, looking at previous implementations or standard formats:
            // Often it is: Date | Weekday | Low Tide Time | Safe Passage Time
            
            // Let's capture the raw cells first to verify structure
            if (cleanCells[0].match(/^\d+$/)) {
                monthData.push({
                    date: cleanCells[0].padStart(2, '0'),
                    day: cleanCells[1],
                    raw: cleanCells
                });
            }
        }
      });
    }
    return { month, data: monthData };
    
  } catch (e) {
    console.error(`Error fetching month ${month}:`, e.message);
    return { month, data: [] };
  }
}

async function main() {
  const allData = [];
  for (const month of months) {
    const result = await fetchMonth(month);
    allData.push(result);
  }
  // console.log(JSON.stringify(allData, null, 2));
  fs.writeFileSync('tides_data.json', JSON.stringify(allData, null, 2));
  console.log('Data written to tides_data.json');
}

main();
