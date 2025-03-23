import inquirer from "inquirer";
import qrCode from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      message: "Type in your URL!",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qrCode.image(url);
    qr_svg.pipe(fs.createWriteStream("qr_code.png"));

    fs.writeFile("qr-url.txt", url, function (err) {
      if (err) throw err;
      console.log(
        "QR code has been generated and saved as 'qr_image.png' and URL has been saved as 'qr-url.txt'"
      ); // success message to show the user
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(
        "Can't display this terminal, please run in a real terminal."
      ); // Prompt to run in a real terminal
    } else {
      console.error("Unexpected error occurred:", error); // unexpected error occurred message
    }
  });
