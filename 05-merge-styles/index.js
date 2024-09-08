const fs = require('fs');
const path = require('path');

const mergedStyles = fs.createWriteStream(
  path.join(__dirname, './project-dist/bundle.css'),
  'utf-8',
);

fs.readdir(
  path.join(__dirname, 'styles'),
  { withFileTypes: true },
  (err, files) => {
    files.forEach((file) => {
      if (file.isFile() && file.name.endsWith('css')) {
        let inputStyles = fs.createReadStream(
          path.join(__dirname, 'styles', file.name),
          'utf-8',
        );

        inputStyles.on('data', (data) => {
          mergedStyles.write(data);
        });
      }
    });
  },
);
