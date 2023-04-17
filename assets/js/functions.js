// File Upload
export function ekUpload() {
  function Init() {
    const fileSelect = document.getElementById("file-upload"),
      fileDrag = document.getElementById("file-drag");

    fileSelect.addEventListener("change", fileSelectHandler, false);

    // Is XHR2 available?
    const xhr = new XMLHttpRequest();
    if (xhr.upload) {
      // File Drop
      fileDrag.addEventListener("dragover", fileDragHover, false);
      fileDrag.addEventListener("dragleave", fileDragHover, false);
      fileDrag.addEventListener("drop", fileSelectHandler, false);
    }
  }

  function fileDragHover(e) {
    const fileDrag = document.getElementById("file-drag");

    e.stopPropagation();
    e.preventDefault();

    fileDrag.className =
      e.type === "dragover" ? "hover" : "modal-body file-upload";
  }

  function fileSelectHandler(e) {
    // Fetch FileList object
    const files = e.target.files || e.dataTransfer.files;

    // Cancel event and hover styling
    fileDragHover(e);

    // Process all File objects
    for (let i = 0, f; (f = files[i]); i++) {
      parseFile(f);
      uploadFile(f);
    }
  }

  // Output
  function output(msg) {
    // Response
    const m = document.getElementById("messages");
    m.innerHTML = msg;
  }

  function parseFile(file) {
    output("<strong>" + encodeURI(file.name) + "</strong>");

    // const fileType = file.type;
    const imageName = file.name;

    const isGood = /\.(?=gif|jpg|png|jpeg)/gi.test(imageName);
    if (isGood) {
      document.getElementById("start").classList.add("hidden");
      document.getElementById("response").classList.remove("hidden");
      document.getElementById("notimage").classList.add("hidden");
      // Thumbnail Preview
      document.getElementById("file-image").classList.remove("hidden");
      document.getElementById("file-image").src = URL.createObjectURL(file);
    } else {
      document.getElementById("file-image").classList.add("hidden");
      document.getElementById("notimage").classList.remove("hidden");
      document.getElementById("start").classList.remove("hidden");
      document.getElementById("response").classList.add("hidden");
      document.getElementById("file-upload-form").reset();
    }
  }

  function setProgressMaxValue(e) {
    const pBar = document.getElementById("file-progress");

    if (e.lengthComputable) {
      pBar.max = e.total;
    }
  }

  function updateFileProgress(e) {
    const pBar = document.getElementById("file-progress");

    if (e.lengthComputable) {
      pBar.value = e.loaded;
    }
  }

  function uploadFile(file) {
    const xhr = new XMLHttpRequest(),
      fileInput = document.getElementById("class-roster-file"),
      pBar = document.getElementById("file-progress"),
      fileSizeLimit = 1024; // In MB
    if (xhr.upload) {
      // Check if file is less than x MB
      if (file.size <= fileSizeLimit * 1024 * 1024) {
        // Progress bar
        pBar.style.display = "inline";
        xhr.upload.addEventListener("loadstart", setProgressMaxValue, false);
        xhr.upload.addEventListener("progress", updateFileProgress, false);

        // File received / failed
        xhr.onreadystatechange = function (e) {
          if (xhr.readyState == 4) {
            // Everything is good!
            // progress.className = (xhr.status == 200 ? "success" : "failure");
            // document.location.reload(true);
          }
        };

        // Start upload
        xhr.open(
          "POST",
          document.getElementById("file-upload-form").action,
          true
        );
        xhr.setRequestHeader("X-File-Name", file.name);
        xhr.setRequestHeader("X-File-Size", file.size);
        xhr.setRequestHeader("Content-Type", "multipart/form-data");
        xhr.send(file);
      } else {
        output("Please upload a smaller file (< " + fileSizeLimit + " MB).");
      }
    }
  }

  // Check for the various File API support.
  if (window.File && window.FileList && window.FileReader) {
    Init();
  } else {
    document.getElementById("file-drag").style.display = "none";
  }
}

/**
 * Dessine une image dans un canvas
 * @author NdekoCode
 * @param {string} url
 * @param {HTMLCanvasElement} canvas
 * @param {CanvasRenderingContext2D} ctx
 */
export function drawImageOnCanvas(url, canvas, ctx) {
  const image = new Image();
  image.addEventListener("load", () => {
    const maxWidth = canvas.width;
    const maxHeight = canvas.height;
    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;

    // calculate the maximum dimensions while preserving aspect ratio
    let width = maxWidth;
    let height = maxHeight;
    if (imageWidth > maxWidth || imageHeight > maxHeight) {
      const ratio = Math.min(maxWidth / imageWidth, maxHeight / imageHeight);
      width = Math.floor(imageWidth * ratio);
      height = Math.floor(imageHeight * ratio);
    }

    // center the image in the canvas
    const xMargin = Math.floor((maxWidth - width) / 2);
    const yMargin = Math.floor((maxHeight - height) / 2);

    ctx.drawImage(image, xMargin, yMargin, width, height);
  });
  image.src = url;
}
/**
 * Ajoute du texte une image dans un canvas
 * @author NdekoCode
 * @param {string} text
 * @param {HTMLCanvasElement} canvas
 * @param {CanvasRenderingContext2D} ctx
 */
export function drawTextOnCanvas(
  textOptions = { textCanvasColor: "#fff" },
  canvas,
  ctx
) {
  console.log(textOptions);
  ctx.font = "20px Inter";
  ctx.textAlign = "center";
  ctx.strokeStyle = textOptions.textCanvasColor;

  ctx.strokeText(textOptions.textCanvas, canvas.width / 2, canvas.height / 2);
}

export function downloadCanvasImage(canvas) {
  /** @type {HTMLAnchorElement} */
  const link = document.createElement("a");
  link.download = "edit-canvas.png";
  link.href = canvas.toDataURL();
  link.click();
}
