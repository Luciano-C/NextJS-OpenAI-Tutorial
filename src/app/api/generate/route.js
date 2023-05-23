import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

if (!configuration.apiKey) {
    throw new Error('Open AI key not defined')
}

const openai = new OpenAIApi(configuration)


export async function POST(request) {

    const body = await request.json()

    //   better error handling
    if (!body.prompt || body.prompt.length === 0) {
        return NextResponse.error(new Error("You must provide a prompt"), {
            status: 400,
        });
    }

    try {
        console.log(process.env.OPENAI_API_KEY)
        const response = await openai.createCompletion({
            prompt: `Dame un chiste para programador enfocado en el tema: ${body.prompt}`,
            model: 'text-davinci-003',
            temperature: 0.7,
            max_tokens: 60
        })
        return NextResponse.json(response.data.choices[0].text);
    } catch (error) {
        return NextResponse.error(error, { status: 500 });
    }
}