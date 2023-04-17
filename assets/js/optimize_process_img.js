const Jimp = require("jimp");

/**
 * Represents the color Options.
 * @typedef {Object} colorOptions
 * @property {string} bg_color - The background color of canvas
 * @property {string} txt_color - the color of the text
 */

/**
 * Represents a user.
 * @typedef {Object} textPosition
 * @property {number} x1 - Position X of the first text
 * @property {number} y1 - Position Y of the first text
 * @property {number} x2 - Position X of the second text
 * @property {number} y2 - Position Y of the second text
 */

/**
 * Represents a user.
 * @typedef {Object} ImageOptions
 * @property {string[]} images - Images Array
 * @property {string} txt_big - the begger text
 * @property {string} txt_small - the small text
 * @property {colorOptions} colorOptions - colors Of background and text
 * @property {textPosition} textPosition - positions for text
 */

const img1 = "../images/img-1.jpg";
const img2 = "../images/img-2.jpg";
const img3 = "../images/img-3.jpg";

const txt_big = "HELLO BABY world";
const txt_small = "BUMRANG to my world";

/**
 * @description
 * @param {ImageOptions} params
 * @param {boolean} contain to contain image size or not
 * @returns {Promise<Buffer>}
 */
const get_processed_img = async (params, contain = false) => {
  // Chargez les images
  const [image1, image2, image3] = await Promise.all(
    params.images.map((img) => Jimp.read(img))
  );

  // Créez un canvas Jimp avec les dimensions requises
  const canvas = new Jimp(1000, 1000, params.colorOptions.bg_color);

  // Dessinez les images et les textes sur le canvas
  if (contain) {
    canvas.composite(image1.contain(500, 500), 0, 0);
    canvas.composite(image2.contain(500, 500), 500, 0);
    canvas.composite(image3.contain(500, 500), 0, 500);
  } else {
    canvas.composite(image1, 0, 0);
    canvas.composite(image2, 500, 0);
    canvas.composite(image3, 0, 500);
  }

  const big_font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
  const small_font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
  canvas.print(
    big_font,
    params.textPosition.x1,
    params.textPosition.y1,
    txt_big
  );

  canvas.print(
    small_font,
    params.textPosition.x2,
    params.textPosition.y2,
    params.txt_small
  );

  // Exportez le canvas en tant qu'image finale
  const processed_image = await canvas.getBufferAsync(Jimp.MIME_PNG);
  const uuid = (Math.random() + 1).toString(36).substring(2);

  canvas.write(`../images/canvas/edit-canvas-${uuid}.png`);
  return processed_image;
};

// Utilisez la fonction pour obtenir l'image finale
get_processed_img({
  images: [img1, img2, img3],
  txt_big,
  txt_small,
  colorOptions: {
    bg_color: "#00ff00",
    txt_color: "#0000",
  },
  textPosition: {
    x1: 100,
    y1: 100,
    x2: 100,
    y2: 300,
  },
})
  .then((processed_image) => {
    // Faites quelque chose avec l'image finale
  })
  .catch((err) => {
    console.log(err);
  });
