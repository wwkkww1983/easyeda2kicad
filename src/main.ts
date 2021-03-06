#!/usr/bin/env node

import * as fs from 'fs';
import { convertBoard } from './board';
import { convertSchematic } from './schematic';

if (process.argv.length < 3) {
  console.error(`Usage: ${process.argv[1]} <input.json> [output.kicad_pcb]`);
  process.exit(1);
}

if (process.argv[2] === '-v') {
  // tslint:disable-next-line
  console.log(`Version ${require('../package.json').version}`);
  process.exit(0);
}

const input = JSON.parse(fs.readFileSync(process.argv[2], 'utf-8'));
const output = input.docType === '5' ? convertSchematic(input) : convertBoard(input);
const outputFile = process.argv[3];
if (outputFile && outputFile !== '-') {
  fs.writeFileSync(outputFile, output);
} else {
  process.stdout.write(output);
}
