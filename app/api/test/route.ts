import {
  BedrockRuntimeClient,
  ConverseCommand,
  Message,
  ConversationRole,
  ConverseRequest
} from "@aws-sdk/client-bedrock-runtime";
import fs from 'fs';
import { NextRequest, NextResponse } from "next/server";
import path from 'path';
// import { NextResponse } from "next/server";

const __dirname = path.resolve();

const client = new BedrockRuntimeClient({
  region: "ap-southeast-2",
  credentials: {
    accessKeyId : "",
    secretAccessKey:"",
    sessionToken:""
  },
});

const modelId = "anthropic.claude-3-haiku-20240307-v1:0";
const propertyFilePath = path.join(process.cwd(),'src/app/api/test', 'property.xlsx');
const fileContents = fs.readFileSync(propertyFilePath);
const userFilePath = path.join(process.cwd(),'src/app/api/test', 'user.xlsx');
const userContents = fs.readFileSync(userFilePath);


const additionalParameters = {
  maxTokens: 4096,
  temperature: 0.5,
};


function extractJson(responseText : string) {
    // Find the position of the first opening brace '{'
    const jsonStartIndex = responseText.indexOf('{');
  
    // Extract the JSON string from that position
    const jsonString = responseText.substring(jsonStartIndex);
  
    try {
      // Parse the JSON string to ensure it's valid
      const responseData = JSON.parse(jsonString);
      return responseData;
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      return null;
    }
  }


async function converse(userInput : string) {
  try {
    let JsonText  = `Convert to JSON`
    const response = await client.send(
      new ConverseCommand({
        modelId,
        messages: [{
            role: "user" as ConversationRole,
            content: [
              {
                document: {
                  name: "property Data",
                  format: "xlsx",
                  source: {
                    bytes: fileContents,
                  },
                },
              },
              {
                document: {
                  name: "User Data",
                  format: "xlsx",
                  source: {
                    bytes: userContents,
                  },
                },
              },
              { text: userInput + JsonText },
            ],
          }],
        inferenceConfig: additionalParameters,
      })
    );

    const responseText = response.output?.message?.content?.length ? response.output?.message?.content[0]?.text: "";
    if (responseText) {
      let data =   extractJson(responseText)
      return data
    } else {
      console.error("No response text received");
    }
  } catch (error) {
    console.error("Error during conversation:", error);
  }
}


  export async function POST(req : NextRequest,res : NextResponse){
    const data  =await req.json()
    const questionData = await converse(data?.question);
    return NextResponse.json(questionData)
}

