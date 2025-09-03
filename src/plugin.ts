import { genkitPluginV2, model } from "genkit/plugin";
import { z } from "genkit";

// Define configuration schema
const PluginConfigSchema = z.object({
  defaultResponse: z.string().optional(),
});

type PluginConfig = z.infer<typeof PluginConfigSchema>;

// Create the plugin
export function echoPlugin(config?: PluginConfig) {
  return genkitPluginV2({
    name: "echo-plugin",
    init: async () => {
      // Create a simple model
      const pluginModel = model(
        {
          name: "echo-plugin/echo",
          supports: {
            media: false,
            tools: false,
          },
        },
        async (request) => {
          // Echo back the last message or use the default
          const lastMessage = request.messages[request.messages.length - 1];
          const response =
            config?.defaultResponse || lastMessage?.content[0]?.text || "Echo!";

          return {
            message: {
              role: "model",
              content: [{ text: response }],
            },
          };
        }
      );
      return [pluginModel];
    },
    list: async () => {
      return [
        {
          name: "echo-plugin/echo",
          type: "model",
          info: {
            label: "Echo Echo Plugin",
          },
        },
      ];
    },
  });
}
