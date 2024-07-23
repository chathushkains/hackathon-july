import {
  BedrockRuntimeClient,
  ConverseCommand,
  Message,
  ConversationRole,
  ConverseRequest
} from "@aws-sdk/client-bedrock-runtime";
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from "next";
import path from 'path';

const __dirname = path.resolve();

const client = new BedrockRuntimeClient({
  region: "ap-southeast-2",
  //TODO - Please add configurations here
  credentials: {
    accessKeyId : "",
    secretAccessKey:"",
    sessionToken:""
  },
});

const modelId = "anthropic.claude-3-haiku-20240307-v1:0";
const propertyFilePath = path.join(process.cwd(),'pages/api/test', 'propertylist.xlsx');
const fileContents = fs.readFileSync(propertyFilePath);


const additionalParameters = {
  maxTokens: 4096,
  temperature: 0.5,
};


function extractJson(responseText: string) {
  // Find the position of the first opening brace '{'
  const jsonStartIndex = responseText.indexOf('{');

  // If the brace is not found, log an error and return null
  if (jsonStartIndex === -1) {
    console.error('No JSON object found in the response text.');
    return null;
  }

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



async function converse(userInput: string) {
  try {
    const jsonText = `Based on the actor's role in the input data, structure the JSON as follows:
    1. If the category is "landlord", "agent", or "tenant", the JSON should include the user's properties inside the "data" array as objects.
    2. If the category is "property", the JSON should include the properties and their associated users inside the "data" array as objects.
    
    Example for category "landlord":
    {
      "category": "landlord",
      "data": [
        {
          "id": "550e8400-e29b-41d4-a716-446655440000",
          "name": "John Smith",
          "dob": "1980-01-15",
          "bio": null,
          "sex": "Male",
          "phone": "4364344590",
          "email": "john.smith@example.com",
          "createdAt": "2020-03-16",
          "type": "landlord",
          "image": "https://i.pravatar.cc/100",
          "properties": [
            {
              "id": 1,
              "name": "Riverside Villas",
              "address": "123 Main St, NSW 1122",
              "state": "NSW",
              "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTDg-Su0SiwXNP88Oz1j2GV_bU8Hm9gpeB6Q&s",
              "price": 12000,
              "rent": 120,
              "bond": 1000,
              "createdAt": "2020-03-16"
            }
          ]
        }
      ]
    }

    Example for category "property":
    {
      "category": "property",
      "data": [
        {
          "id": 1,
          "name": "Riverside Villas",
          "address": "123 Main St, NSW 1122",
          "state": "NSW",
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTDg-Su0SiwXNP88Oz1j2GV_bU8Hm9gpeB6Q&s",
          "price": 12000,
          "rent": 120,
          "bond": 1000,
          "createdAt": "2020-03-16",
          "users": [
            {
              "id": "550e8400-e29b-41d4-a716-446655440000",
              "name": "John Smith",
              "dob": "1980-01-15",
              "bio": null,
              "sex": "Male",
              "phone": "4364344590",
              "email": "john.smith@example.com",
              "createdAt": "2020-03-16",
              "type": "landlord",
              "image": "https://i.pravatar.cc/100"
            }
          ]
        }
      ]
    }
    and return without any additional text paragraphs make sure Do not include any explanations.Make sure data.length less than 11`;
    ;
    const response = await client.send(
      new ConverseCommand({
        modelId,
        messages: [
          {
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
              { text: `${userInput},${jsonText}`},
            ],
          },
        ],
        inferenceConfig: additionalParameters,
      })
    );

    const responseText = response.output?.message?.content?.length
      ? response.output?.message?.content[0]?.text
      : "";

      if (responseText) {
        return JSON.parse(responseText);
      }else {
      console.error("No response text received");
      return null;
    }
  } catch (error) {
    console.error("Error during conversation:", error);
    return null;
  }
}



function transformDataStructure(data: any) {
  const transformedData = {
    category: data.category,
    data: data.data.map((user: any) => {
      if (user.type === "landlord" || user.type === "agent" || user.type === "tenant") {
        return {
          ...user,
          properties: user.properties.map((property: any) => ({
            id: property.id,
            name: property.name,
            address: property.address,
            state: property.state,
            image: property.image,
            price: property.price,
            rent: property.rent,
            bond: property.bond,
            createdAt: property.createdAt,
          })),
        };
      } else if (user.type === "property") {
        return {
          ...user,
          users: user.users.map((userDetail: any) => ({
            id: userDetail.id,
            name: userDetail.name,
            dob: userDetail.dob,
            bio: userDetail.bio,
            sex: userDetail.sex,
            phone: userDetail.phone,
            email: userDetail.email,
            createdAt: userDetail.createdAt,
            type: userDetail.type,
            image: userDetail.image,
          })),
        };
      }
    }),
  };
  return transformedData;
}







export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { question } = await req.body as any;
    const trimmedQuestion = question.trim();
    const questionData = await converse(trimmedQuestion);
    if (questionData) {
      return res.status(200).json(questionData);
    } else {
      return res.status(400).json({error : 'No data returned from converse function'});
    }
  } catch (error) {
    console.error('Error handling POST request:', error);
    return res.status(500).json({error : 'Internal Server error'});
  }
}

