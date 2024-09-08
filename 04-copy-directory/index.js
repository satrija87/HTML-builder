const fs = require('fs');
const path = require('path');

function copyDir() {
  const sourceFolderPath = path.join(__dirname, 'files');
  const destinationFolderPath = path.join(__dirname, 'files-copy');

  fs.mkdir(destinationFolderPath, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('Directory "files-copy" is created');
    fs.readdir(destinationFolderPath, { withFileTypes: true }, (err, files) => {
      files.forEach((file) => {
        fs.unlink(path.join(destinationFolderPath, file.name), (err) => {
          console.log(err);
        });
      });
    });

    fs.readdir(sourceFolderPath, { withFileTypes: true }, (err, files) => {
      if (err) console.log(err);
      else {
        files.forEach((file) => {
          if (file.isFile()) {
            fs.copyFile(
              path.join(sourceFolderPath, file.name),
              path.join(destinationFolderPath, file.name),
              (err) => {
                if (err) console.log(err);
              },
            );
          }
        });
      }
    });
  });
}

copyDir();
