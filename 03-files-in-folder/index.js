const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'secret-folder');

fs.readdir(
  filePath,
  {
    withFileTypes: true,
  },
  (error, files) => {
    files.forEach((file) => {
      if (file.isFile()) {
        fs.stat(path.join(filePath, file.name), (err, stats) => {
          const fileSize = (stats.size / 1024).toFixed(3) + 'Kb';
          console.log(file.name.split('.').join(' - ') + ' - ' + fileSize);
        });
      }
    });
  },
);
