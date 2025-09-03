import { genkit } from "genkit";
import { mockEchoPlugin } from "./plugin";

async function main() {
  const ai = genkit({
    // plugins: [mockEchoPlugin({ defaultResponse: "Hellooooo!" })],
    plugins: [mockEchoPlugin()],
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
