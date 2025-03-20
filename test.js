const data = `city,population,area,density,country
  Shanghai,24256800,6340,3826,China
  Delhi,16787941,1484,11313,India
  Lagos,16060303,1171,13712,Nigeria
  Istanbul,14160467,5461,2593,Turkey
  Tokyo,13513734,2191,6168,Japan
  Sao Paulo,12038175,1521,7914,Brazil
  Mexico City,8874724,1486,5974,Mexico
  London,8673713,1572,5431,United Kingdom
  New York City,8537673,784,10892,United States
  Bangkok,8280925,1569,5279,Thailand`;

const tableFromCSV = (csv) => {
  if (!data || typeof csv !== 'string') throw new Error('Wrong data type');
  const lines = data.split('\n');
  lines.pop();
  const table = [];
  for (let line of lines) {
    table.push(line.split(',').map((el) => el.trimStart().trimEnd()));
  }
  return table;
};

const parseNumberInTable = (table) => {
  const updatedTable = table.map((row, i) => {
    if (i === 0) return row;
    return row.map((el) => {
      const res = parseInt(el);
      if (!isNaN(res)) return res;
      return el;
    });
  });
  return updatedTable;
};

const getMaxByColumn = (table, columnId) => {
  const columnValues = [];
  table.forEach((line, i) => {
    if (i !== 0) columnValues.push(line[columnId]);
  });
  return Math.max(...columnValues);
};

const addColumnPercentFromMax = (table, columnName, columnId, max) => {
  return table.map((row, i) => {
    if (i === 0) return [...row, columnName];
    const a = Math.round((row[columnId] * 100) / max);
    row.push(a);
    return row;
  });
};

const sortByColumn = (table, columnId, sortType) => {
  if (sortType === 'DESC')
    return table.sort((r1, r2) => r2[columnId] - r1[columnId]);
  return table.sort((r1, r2) => r1[columnId] - r2[columnId]);
};

const printTable = (table) => {
  const header = table[0];
  const data = table.slice(1);
  const newtable = data.map((row, i) => {
    const newRow = {};
    header.forEach((cellName, i) => {
      newRow[cellName] = row[i];
    });
    return newRow;
  });
  console.table(newtable);
};

const t2 = parseNumberInTable(tableFromCSV(data));
const max = getMaxByColumn(t2, 3);
const t3 = addColumnPercentFromMax(t2, '%', 3, max);
const t4 = sortByColumn(t3, 5, 'DESC');
printTable(t4);
