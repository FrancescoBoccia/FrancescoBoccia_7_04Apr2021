const fs = require('fs')

function removeFile (imageUrl) {
  if (!imageUrl) return
  const filename = imageUrl.split('/public/')[1]
  fs.unlink(`public/${filename}`, () => {})
}

module.exports = {
  removeFile
}
