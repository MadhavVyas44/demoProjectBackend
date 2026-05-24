const { ImageKit } = require("@imagekit/nodejs");

const imageKit = new ImageKit({
  privateKey: "private_KQtJd88FMaFOu2bJdCq1rvI1x0I="
});

async function uploadFile(buffer) {
  console.log(buffer);
  const result = imageKit.files.upload({
    file: buffer.toString("base64"),
    fileName: "image.jpg"
  })
  return result;
}

module.exports = uploadFile;


