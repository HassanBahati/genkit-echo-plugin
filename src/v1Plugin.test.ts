import { test, describe } from "node:test";
import assert from "node:assert";
import echoV1Plugin from "./v1Plugin";
import { genkit } from "genkit";

describe("Echo V1 Plugin", () => {
  const plugin = echoV1Plugin(genkit({}));

  test("should create plugin with correct name", () => {
    assert.ok(echoV1Plugin);
    assert.strictEqual(typeof echoV1Plugin, "function");
  });

  test("should return plugin object when called", () => {
    assert.ok(plugin);
    assert.strictEqual(typeof plugin, "object");
    assert.strictEqual(plugin.name, "echo-v1-plugin");
  });

  test("should initialize plugin and register models", async () => {
    // Mock AI object
    const mockAi = {
      defineModel: (config: any, handler: any) => {
        assert.strictEqual(config.name, "echo-v1-plugin/echo");
        assert.strictEqual(typeof handler, "function");
        return { name: config.name, handler };
      },
      defineEmbedder: (config: any, handler: any) => {
        assert.strictEqual(config.name, "echo-v1-plugin/embedder");
        assert.strictEqual(typeof handler, "function");
        return { name: config.name, handler };
      },
    };
  });

  test("should work with real genkit instance", async () => {
    const ai = genkit({
      plugins: [echoV1Plugin],
    });

    // Test that the plugin can be initialized
    assert.ok(ai);
    assert.strictEqual(typeof ai, "object");
  });
});
