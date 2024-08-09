import OpenAI from "openai";
import readline from "readline";
import fs from 'fs';

const openai = new OpenAI();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questionnaire = [
  { question: "Upload the inspector ID card to extract name and ID:", field: "Inspector Name and ID", type: "image", answer: "" },
];

const base64Image = fs.readFileSync("./id.jpg",{
  encoding: "base64"
});
async function processImage() {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "extract name and id from this image" },
          {
            type: "image_url",
            image_url: {
              url: `data:image/png;base64,${base64Image}`,
            },
          },
        ],
      },
    ],
  });
  return response.choices[0].message.content;
}

async function chat() {
  const messages = [{ role: "system", content: "You are a helpful assistant." }];
  let assistantReplies = [];

  for (const item of questionnaire) {
    if (item.type === "image") {
      // const imagePath = await new Promise((resolve) => {
      //   rl.question(item.question, (input) => resolve(input));
      // });

      const extractedText = await processImage();
      item.answer = extractedText;

      console.log(`Extracted Text: ${extractedText}`);
      // Here, you can further process the extracted text to parse specific fields like name and ID.
    } else {
      const userMessage = await new Promise((resolve) => {
        rl.question(item.question, (input) => resolve(input));
      });

      item.answer = userMessage;
    }
  }

  rl.close();

  // Generate the final report
  console.log("\nFinal Report:");
  questionnaire.forEach((item) => {
    console.log(`${item.field}: ${item.answer}`);
  });
}

chat();
