import { genkit } from "genkit";
import { echoPlugin } from "./plugin";

async function main() {
  const ai = genkit({
    // plugins: [echoPlugin({ defaultResponse: "Hellooooo!" })],
    plugins: [echoPlugin()],
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
