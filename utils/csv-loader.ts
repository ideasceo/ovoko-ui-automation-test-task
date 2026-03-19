import { parse } from 'csv-parse/sync';
import * as fs from 'fs';
import * as path from 'path';

export interface TestData {
  searchTerm: string;
  brand: string;
  minPrice: string;
  maxPrice: string;
  itemIndex: string;
}

export function loadTestData(filePath: string = 'data/test-data.csv'): TestData {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  const records = parse(fileContent, { columns: true, skip_empty_lines: true });
  return records[0] as TestData;
}
