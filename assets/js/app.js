import {
  downloadCanvasImage,
  drawImageOnCanvas,
  drawTextOnCanvas,
  ekUpload,
} from "./functions.js";

// Canvas

/** @type {HTMLCanvasElement} */
const formContent = { imageUrl: "", textCanvas: "" };
const canvas = document.getElementById("canvas");
const downloadBtn = document.getElementById("btn-download");

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
const imageFileUpload = document.getElementById("file-upload");
const text = document.getElementById("title");
const form = document.getElementById("file-upload-form");

imageFileUpload.addEventListener("change", function (evt) {
  const image = imageFileUpload.files[0];
  /**@type {HTMLImageElement} */
  const imageURL = URL.createObjectURL(image);
  drawImageOnCanvas(imageURL, canvas, ctx);
});

text.addEventListener("keydown", (evt) => {
  let value = evt.currentTarget.value;
  formContent.textCanvas = value;
});

downloadBtn.addEventListener("click", () => downloadCanvasImage(canvas));

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (formContent.textContent && formContent.textContent.trim().length > 0) {
    drawTextOnCanvas(formContent.textCanvas, canvas, ctx);
  }
});

// File Upload
ekUpload();
