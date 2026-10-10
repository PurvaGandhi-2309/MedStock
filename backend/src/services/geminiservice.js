// // // Sends a prompt (text) to Gemini and returns Gemini's reply as text.
// // // Uses the built-in fetch of Node 18 or higher (no extra package needed).
// // const askGemini = async (prompt) => {
// //     const apiKey = process.env.GEMINI_API_KEY;
// //     const model = process.env.GEMINI_MODEL;

// //     if (!apiKey || !model) {
// //         throw new Error("GEMINI_API_KEY or GEMINI_MODEL is missing in .env");
// //     }

// //     const url =
// //         "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent";

// //     const response = await fetch(url, {
// //         method: "POST",
// //         headers: {
// //             "Content-Type": "application/json",
// //             "x-goog-api-key": apiKey,
// //         },
// //         body: JSON.stringify({
// //             contents: [{ parts: [{ text: prompt }] }],
// //             generationConfig: { responseMimeType: "application/json" }, // ask for a JSON reply
// //         }),
// //     });

// //     const data = await response.json();

// //     // Gemini returned an error (wrong key, wrong model name, etc.)
// //     if (!response.ok) {
// //         const message = data.error && data.error.message ? data.error.message : "Gemini request failed";
// //         throw new Error(message);
// //     }

// //     // Gemini returned no answer
// //     if (!data.candidates || data.candidates.length === 0) {
// //         throw new Error("Gemini returned no answer");
// //     }

// //     return data.candidates[0].content.parts[0].text;
// // };

// // module.exports = { askGemini };
// // Wait for some milliseconds (used between retries)
// const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// // Sends a prompt (text) to Gemini and returns Gemini's reply as text.
// // Uses the built-in fetch of Node 18 or higher (no extra package needed).
// const askGemini = async (prompt) => {
//     const apiKey = process.env.GEMINI_API_KEY;

//     // remove spaces, "models/" and quotes from the model name
//     const rawModel = process.env.GEMINI_MODEL || "";
//     const model = rawModel.trim().replace("models/", "").replaceAll('"', "");

//     if (!apiKey || !model) {
//         throw new Error("GEMINI_API_KEY or GEMINI_MODEL is missing in .env");
//     }

//     const url =
//         "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent";

//     const MAX_TRIES = 3;

//     for (let attempt = 1; attempt <= MAX_TRIES; attempt++) {
//         const response = await fetch(url, {
//             method: "POST",
//             signal: AbortSignal.timeout(120000),
//             headers: {
//                 "Content-Type": "application/json",
//                 "x-goog-api-key": apiKey,
//             },
//             body: JSON.stringify({
//                 contents: [{ parts: [{ text: prompt }] }],
//                 generationConfig: { responseMimeType: "application/json" }, // ask for a JSON reply
//             }),
//         });

//         const data = await response.json();

//         // Success
//         if (response.ok) {
//             if (!data.candidates || data.candidates.length === 0) {
//                 throw new Error("Gemini returned no answer");
//             }
//             return data.candidates[0].content.parts[0].text;
//         }

//         // Error: read the message
//         const message = data.error && data.error.message ? data.error.message : "Gemini request failed";

//         // 503 or 429 means Gemini is busy. Wait 3 seconds and try again.
//         const isBusy = response.status === 503 || response.status === 429;
//         if (isBusy && attempt < MAX_TRIES) {
//             await wait(3000);
//             continue;
//         }

//         throw new Error(message);
//     }
// };

// module.exports = { askGemini };

const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing in .env");
}

const genAI = new GoogleGenerativeAI(apiKey);

const askGemini = async (prompt) => {
    const rawModel = process.env.GEMINI_MODEL || "gemini-3.6-flash";
    const modelName = rawModel.trim().replace("models/", "").replaceAll('"', "");

    const model = genAI.getGenerativeModel({
        model: modelName,
    });

    const result = await model.generateContent({
        contents: [
            {
                role: "user",
                parts: [{ text: prompt }],
            },
        ],
        generationConfig: {
            responseMimeType: "application/json",
        },
    });

    return result.response.text();
};

module.exports = { askGemini };