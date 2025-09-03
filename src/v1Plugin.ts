import { genkitPlugin } from "genkit/plugin";
import { z } from "genkit";

// Define configuration schema
const PluginConfigSchema = z.object({
  defaultResponse: z.string().optional(),
});

type PluginConfig = z.infer<typeof PluginConfigSchema>;

const echoV1Plugin = genkitPlugin("echo-v1-plugin", async (ai: any) => {
  // Register a model
  ai.defineModel(
    {
      name: "echo-v1-plugin/echo",
    },
    async (request: any) => {
      // Model implementation 
      return {
        message: {
          role: "model",
          content: [{ text: "Hello, world!" }]
        }
      };
    }
  );

  // Register an embedder
  ai.defineEmbedder(
    {
      name: "echo-v1-plugin/embedder",
    },
    async (text: string) => {
      // Embedder Implementation
      return { embeddings: [0.1, 0.2, 0.3] };
    }
  );
});

export default echoV1Plugin;
