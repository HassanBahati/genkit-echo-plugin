import { genkit } from "genkit";
import { echoV2Plugin } from "./v2Plugin";

async function main() {
  const ai = genkit({
    // plugins: [echoV2Plugin({ defaultResponse: "Hellooooo!" })],
    plugins: [echoV2Plugin()],
  });

  const response = await ai.generate({
    model: "echo-plugin/echo",
    prompt: "What is the weather in Kampala?",
  });

  console.log("response", response);
  console.log("response message", response.message?.content[0]?.text);

  return response;
}

main().catch(console.error);
