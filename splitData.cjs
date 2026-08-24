const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), 'src/data/portfolioData.ts');
let content = fs.readFileSync(file, 'utf8');

const blocks = content.split('export ');

let projects = '';
let services = '';
let education = '';
let testimonials = '';
let skills = '';
let achievements = '';

blocks.forEach(block => {
  if (block.startsWith('const projects')) {
    projects += 'export ' + block;
  }
  if (block.startsWith('const experiences')) {
    education += 'export ' + block;
  }
  if (block.startsWith('interface Review') || block.startsWith('const defaultReviews')) {
    testimonials += 'export ' + block;
  }
  if (block.startsWith('interface ServiceData') || block.startsWith('const services')) {
    services += 'export ' + block;
  }
  if (block.startsWith('const skillCategories') || block.startsWith('const otherKnowledge')) {
    skills += 'export ' + block;
  }
  if (block.startsWith('const certifications')) {
    achievements += 'export ' + block;
  }
});

fs.writeFileSync(path.join(process.cwd(), 'src/data/projects.ts'), projects);
fs.writeFileSync(path.join(process.cwd(), 'src/data/education.ts'), education);
fs.writeFileSync(path.join(process.cwd(), 'src/data/testimonials.ts'), testimonials);
fs.writeFileSync(path.join(process.cwd(), 'src/data/services.ts'), services);
fs.writeFileSync(path.join(process.cwd(), 'src/data/skills.ts'), skills);
fs.writeFileSync(path.join(process.cwd(), 'src/data/achievements.ts'), achievements);
fs.writeFileSync(path.join(process.cwd(), 'src/data/products.ts'), 'export const products = [];\n');

const index = `
export * from './projects';
export * from './education';
export * from './testimonials';
export * from './services';
export * from './skills';
export * from './achievements';
export * from './products';
`;

fs.writeFileSync(file, index.trim());
console.log('Split data successfully');
