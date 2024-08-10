const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

exports.analyze = async (req, res) => {
    if (!req.body.message) {
        return res.status(400).send({
            message: "Message content cannot be empty"
        });
    }

    try {
        const openaiResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: req.body.message }],
            max_tokens: 150
        });

        const aiResponse = openaiResponse.choices[0].message.content.trim();

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