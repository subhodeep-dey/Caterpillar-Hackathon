const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const promptsByType = {
    tire: `Extract the following information from the speech about tire inspection:
    - Tire pressure for left front, right front, left rear, and right rear (in PSI)
    - Tire condition for left front, right front, left rear, and right rear (Good, Ok, or Needs Replacement)
    - Overall tire summary (if mentioned)
    Format the response as a JSON object with these keys: tirePressureLeftFront, tirePressureRightFront, tirePressureLeftRear, tirePressureRightRear, tireConditionLeftFront, tireConditionRightFront, tireConditionLeftRear, tireConditionRightRear, overallTireSummary`,

    battery: `Extract the following information from the speech about battery inspection:
    - Battery make
    - Battery replacement date (in YYYY-MM-DD format)
    - Battery voltage
    - Battery water level (Good, Ok, or Low)
    - Battery condition (true if good, false if bad)
    - Presence of battery leak or rust (true if present, false if not)
    - Overall battery summary (if mentioned)
    Format the response as a JSON object with these keys: batteryMake, batteryReplacementDate, batteryVoltage, batteryWaterLevel, batteryCondition, batteryLeakOrRust, batteryOverallSummary`,

    exterior: `Extract the following information from the speech about exterior inspection:
    - Presence of rust, dent, or damage (true if present, false if not)
    - Notes about rust, dent, or damage (if mentioned)
    - Presence of oil leak in suspension (true if present, false if not)
    - Overall exterior summary (if mentioned)
    Format the response as a JSON object with these keys: rustDentOrDamage, rustDentOrDamageNotes, oilLeakInSuspension, exteriorOverallSummary`,

    brake: `Extract the following information from the speech about brake inspection:
    - Brake fluid level (Good, Ok, or Low)
    - Brake condition for front and rear (Good, Ok, or Needs Replacement)
    - Emergency brake condition (Good, Ok, or Low)
    - Overall brake summary (if mentioned)
    Format the response as a JSON object with these keys: brakeFluidLevel, brakeConditionFront, brakeConditionRear, emergencyBrakeCondition, brakeOverallSummary`,

    engine: `Extract the following information from the speech about engine inspection:
    - Presence of rust, dent, or damage (true if present, false if not)
    - Notes about rust, dent, or damage (if mentioned)
    - Engine oil condition (Good or Bad)
    - Engine oil color (Clean, Brown, or Black)
    - Brake fluid condition (Good or Bad)
    - Brake fluid color (Clean, Brown, or Black)
    - Presence of oil leak in engine (true if present, false if not)
    - Overall engine summary (if mentioned)
    Format the response as a JSON object with these keys: rustDentOrDamage, rustDentOrDamageNotes, engineOilCondition, engineOilColor, brakeFluidCondition, brakeFluidColor, oilLeakInEngine, engineOverallSummary`,

    vehicle: `Extract the following information from the speech about vehicle registration:
    - Serial number
    - Model
    - Customer name
    - CAT customer ID
    Format the response as a JSON object with these keys: serialNumber, model, customerName, catCustomerID`
};

const defaultValues = {
    tire: {
        tirePressureLeftFront: 0,
        tirePressureRightFront: 0,
        tirePressureLeftRear: 0,
        tirePressureRightRear: 0,
        tireConditionLeftFront: 'Good',
        tireConditionRightFront: 'Good',
        tireConditionLeftRear: 'Good',
        tireConditionRightRear: 'Good',
        overallTireSummary: null,
        attachedImages: []
    },
    battery: {
        batteryMake: '',
        batteryReplacementDate: new Date(),
        batteryVoltage: 0,
        batteryWaterLevel: 'Good',
        batteryCondition: false,
        batteryLeakOrRust: false,
        batteryOverallSummary: null,
        attachedImages: []
    },
    exterior: {
        rustDentOrDamage: false,
        rustDentOrDamageNotes: null,
        oilLeakInSuspension: false,
        exteriorOverallSummary: null,
        attachedImages: []
    },
    brake: {
        brakeFluidLevel: 'Good',
        brakeConditionFront: 'Good',
        brakeConditionRear: 'Good',
        emergencyBrakeCondition: 'Good',
        brakeOverallSummary: null,
        attachedImages: []
    },
    engine: {
        rustDentOrDamage: false,
        rustDentOrDamageNotes: null,
        engineOilCondition: 'Good',
        engineOilColor: 'Clean',
        brakeFluidCondition: 'Good',
        brakeFluidColor: 'Clean',
        oilLeakInEngine: false,
        engineOverallSummary: null,
        attachedImages: []
    },
    vehicle: {
        serialNumber: '',
        model: '',
        customerName: '',
        catCustomerID: ''
    }
};


exports.analyze = async (req, res) => {
    const response = {
        success: false,
        message: '',
        inputData: {},
        aiResponse: {},
        parsedData: {},
        apiCallResult: {
            success: false,
            statusCode: null,
            data: null,
            error: null
        },
        error: null
    };

    try {
        if (!req.body.message || !req.body.inspectionType) {
            throw new Error("Invalid data. Both message and inspectionType are required.");
        }

        const { message, inspectionType } = req.body;
        response.inputData = { message, inspectionType };

        if (!promptsByType[inspectionType]) {
            throw new Error("Invalid inspection type.");
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `${promptsByType[inspectionType]}\n\nSpeech content: "${message}"\n\nProvide only the JSON object as the response, without any additional text or formatting.`;

        const result = await model.generateContent(prompt);
        let aiResponse = await result.response;
        aiResponse = aiResponse.text();

        // Remove any potential code block formatting
        aiResponse = aiResponse.replace(/```json\n|\n```/g, '');
        response.aiResponse = { raw: aiResponse };

        // Parse the JSON response from Gemini
        let parsedResponse = JSON.parse(aiResponse);

        // Add default values for missing parameters
        parsedResponse = { ...defaultValues[inspectionType], ...parsedResponse };
        response.parsedData = parsedResponse;

        // Determine the correct API endpoint based on inspection type
        const apiEndpoint = `http://localhost:3000/${inspectionType}-inspections/`;

        // Send the parsed data to the appropriate API endpoint
        try {
            const apiResponse = await axios.post(apiEndpoint, parsedResponse);
            response.apiCallResult = {
                success: true,
                statusCode: apiResponse.status,
                data: apiResponse.data
            };
        } catch (apiError) {
            response.apiCallResult = {
                success: false,
                statusCode: apiError.response ? apiError.response.status : null,
                error: apiError.response ? apiError.response.data : apiError.message
            };
        }

        response.success = true;
        response.message = "Inspection data processed successfully";

    } catch (error) {
        response.success = false;
        response.message = "An error occurred while processing the inspection data";
        response.error = {
            message: error.message,
            stack: error.stack
        };
    }

    // Send the comprehensive response
    res.status(response.success ? 200 : 500).json(response);
};