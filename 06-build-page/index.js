const fs = require('fs');
const path = require('path');

// make folder project-dist
fs.mkdir(
  path.join(__dirname, 'project-dist'),
  {
    recursive: true,
  },
  (err) => {
    if (err) throw err;
  },
);

// make HTML file
const makeHTML = async () => {
  let template = await fs.promises.readFile(
    path.join(__dirname, 'template.html'),
    'utf-8',
  );
  fs.readdir(
    path.join(__dirname, 'components'),
    { withFileTypes: true },
    (err, files) => {
      files.forEach((file) => {
        let inputHTML = fs.createReadStream(
          path.join(__dirname, 'components', file.name),
          'utf-8',
        );
        inputHTML.on('data', (data) => {
          template = template.replace(`{{${file.name.split('.')[0]}}}`, data);
          fs.promises.writeFile(
            path.join(__dirname, 'project-dist/index.html'),
            template,
          );
        });
      });
    },
  );
};

// make CSS file
const makeCSS = async () => {
  const mergedCSS = fs.createWriteStream(
    path.join(__dirname, 'project-dist', 'styles.css'),
  );
  await fs.readdir(
    path.join(__dirname, 'styles'),
    { withFileTypes: true },
    (err, files) => {
      files.forEach((file) => {
        if (file.isFile() && file.name.endsWith('css')) {
          let inputStyle = fs.createReadStream(
            path.join(__dirname, 'styles', file.name),
            'utf-8',
          );
          inputStyle.on('data', (data) => {
            mergedCSS.write(data);
          });
        }
      });
    },
  );
};

// make folder Assets
const copyAssets = async (sourcePath, destinationPath) => {
  await fs.mkdir(destinationPath, { recursive: true }, (err) => {
    if (err) throw err;
    fs.readdir(sourcePath, { withFileTypes: true }, (err, files) => {
      files.forEach((file) => {
        if (file.isDirectory()) {
          copyAssets(
            path.join(sourcePath, file.name),
            path.join(destinationPath, file.name),
          );
        }
        if (file.isFile()) {
          fs.copyFile(
            path.join(sourcePath, file.name),
            path.join(destinationPath, file.name),
            (err) => {
              if (err) console.log(err);
            },
          );
        }
      });
    });
  });
};

makeHTML();
makeCSS();

copyAssets(
  path.join(__dirname, 'assets'),
  path.join(__dirname, 'project-dist', 'assets'),
);
