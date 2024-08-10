const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.analyze = async (req, res) => {
    if (!req.body.message) {
        return res.status(400).send({
            message: "Message content cannot be empty"
        });
    }

    try {
        // Use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Generate content
        const result = await model.generateContent(req.body.message);
        const response = await result.response;
        const aiResponse = response.text();

        res.send({
            message: req.body.message,
            response: aiResponse
        });

    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while analyzing the speech."
        });
    }
};