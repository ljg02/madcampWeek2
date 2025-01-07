// backend/utils/sentimentAnalysis.js
const language = require('@google-cloud/language');
const path = require('path');

// 환경 변수에서 키 파일 경로 가져오기
const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS;

// LanguageServiceClient 초기화
const client = new language.LanguageServiceClient({
    keyFilename: path.resolve(__dirname, keyFilename),
});

const analyzeSentiment = async (text) => {
    const document = {
        content: text,
        type: 'PLAIN_TEXT',
    };

    try {
        const [result] = await client.analyzeSentiment({ document });
        const sentiment = result.documentSentiment;
        return sentiment; // { score: number, magnitude: number }
    } catch (error) {
        console.error('Sentiment analysis error:', error);
        return null;
    }
};

module.exports = { analyzeSentiment };
