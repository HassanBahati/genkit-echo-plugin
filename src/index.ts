import { genkit } from "genkit";
import { echoV2Plugin } from "./v2Plugin";
import echoV1Plugin from "./v1Plugin";

async function main() {
  const ai = genkit({
    // plugins: [echoV2Plugin({ defaultResponse: "Hellooooo!" })],
    plugins: [echoV2Plugin(), echoV1Plugin],
  });

  const v1Response = await ai.generate({
    model: "echo-v1-plugin/echo",
    prompt: "What is the weather in Kampala?",
  });

  const v2Response = await ai.generate({
    model: "echo-v2-plugin/echo",
    prompt: "What is the weather in Kampala?",
  });

  console.log("v1Response", v1Response);
  console.log("v1Response message", v1Response.text);

  console.log("v2Response", v2Response);
  console.log("v2Response message", v2Response.message?.content[0]?.text);

  return v2Response;
}

main().catch(console.error);
