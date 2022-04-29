const router = require("express").Router();
module.exports = router;
// Imports the Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech");
// Import other required libraries
// const fs = require("fs");
// const util = require("util");

router.post("/", async (req, res, next) => {
  try {
    const text = req.body.word;

    // create a new client
    const client = new textToSpeech.TextToSpeechClient();

    // Construct the request
    const request = {
      input: {
        // ssml: `<speak><phoneme alphabet="ipa" ph=${sound}>${text.toLowerCase()}</phoneme></speak>`,
        text,
      },
      // Select the language and SSML voice gender (optional)
      voice: {
        languageCode: "en-US",
        name: "en-US-Wavenet-F",
        ssmlGender: "FEMALE",
      },
      // select the type of audio encoding
      audioConfig: { audioEncoding: "MP3" },
    };

    // Perform the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);

    // Write the binary audio content to a local file
    // const writeFile = util.promisify(fs.writeFile);
    // await writeFile("output.mp3", response.audioContent, "binary");
    // console.log("Audio content written to file: output.mp3");

    // sent the data back
    res.send(response);
  } catch (err) {
    next(err);
  }
});
