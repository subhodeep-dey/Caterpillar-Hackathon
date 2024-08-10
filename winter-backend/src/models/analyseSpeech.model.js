class TranscriptSpeech {
    constructor(transcript) {
        if (!transcript) {
            throw new Error("Transcript cannot be empty");
        }
        this.transcript = transcript;
    }
}

module.exports = TranscriptSpeech;