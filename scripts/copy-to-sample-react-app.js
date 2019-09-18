const fs = require('fs-extra');
const path = require('path');

const sourceDistribution = path.resolve(process.cwd(), 'dist');
const sampleApplicationTarget = path.resolve(process.cwd(), 'sample-react-app', 'src', 'dist');

fs.copySync(sourceDistribution, sampleApplicationTarget);