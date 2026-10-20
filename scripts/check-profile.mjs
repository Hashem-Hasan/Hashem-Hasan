import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const text = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
let checked = 0;
for (const [, asset] of text.matchAll(/(?:src|srcset)="(\.\/[^" ]+)"/g)) {
  if (!fs.existsSync(path.join(root, asset))) throw Error(`Missing profile asset: ${asset}`);
  checked++;
}
for (const repo of [
  'Data-Sorter',
  'Simple-URL-Shortener-made-with-React.js-Next.js',
  'Weather-Tracker-by-IP-made-with-React.js-and-TailwindCSS',
  'Banking-Website-Landpage-React.js-Next.js-TailwindCSS',
  'hashem-hasan.github.io',
])
  if (!text.includes(`github.com/Hashem-Hasan/${repo}`))
    throw Error(`Missing public project: ${repo}`);
console.log(
  `Profile verified: ${checked} local image references and all five public project links.`
);
