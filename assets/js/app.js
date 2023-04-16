import {
  downloadCanvasImage,
  drawImageOnCanvas,
  drawTextOnCanvas,
  ekUpload,
} from "./functions.js";

// Canvas

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const downloadBtn = document.getElementById("btn-download");

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
const imageFileUpload = document.getElementById("file-upload");
const text = document.getElementById("title");
const form = document.getElementById("file-upload-form");
const formContent = { textCanvasColor: "", textCanvas: "" };
imageFileUpload.addEventListener("change", function (evt) {
  const image = imageFileUpload.files[0];
  /**@type {HTMLImageElement} */
  const imageURL = URL.createObjectURL(image);
  drawImageOnCanvas(imageURL, canvas, ctx);
});

text.addEventListener("input", (evt) => {
  let value = evt.currentTarget.value;
  formContent.textCanvas = value;
});

downloadBtn.addEventListener("click", () => downloadCanvasImage(canvas));

let colorInput = document.querySelector("#color");
let hexInput = document.querySelector("#hex");
colorInput.addEventListener("input", () => {
  let color = colorInput.value;
  hexInput.value = color;
  formContent.textCanvasColor = color;
});
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  console.log(
    formContent.textCanvas,
    formContent.textCanvas && formContent.textCanvas.trim().length > 0
  );
  if (formContent.textCanvas && formContent.textCanvas.trim().length > 0) {
    drawTextOnCanvas(formContent, canvas, ctx);
    console.log(formContent);
  }
});

// File Upload
ekUpload();
