import { test, describe } from "node:test";
import assert from "node:assert";
import { echoV2Plugin } from "./v2Plugin";

describe("Echo V2 Plugin", () => {
  test("should create plugin with default configuration", () => {
    const plugin = echoV2Plugin();
    assert.ok(plugin);
    assert.strictEqual(typeof plugin, "object");
  });

  test("should create plugin with custom configuration", () => {
    const customResponse = "Custom echo response";
    const plugin = echoV2Plugin({ defaultResponse: customResponse });
    assert.ok(plugin);
    assert.strictEqual(typeof plugin, "object");
  });

  test("should have correct plugin name", () => {
    const plugin = echoV2Plugin();
    assert.strictEqual(plugin.name, "echo-v2-plugin");
  });

  test("should initialize and return models", async () => {
    const plugin = echoV2Plugin();
    assert.ok(plugin.init, "Plugin should have init method");
    const models = await plugin.init!();

    assert.ok(Array.isArray(models));
    assert.strictEqual(models.length, 1);
  });

  test("should list available models", async () => {
    const plugin = echoV2Plugin();
    assert.ok(plugin.list, "Plugin should have list method");
    const models = await plugin.list!();

    assert.ok(Array.isArray(models));
    assert.strictEqual(models.length, 1);
    assert.strictEqual(models[0].name, "echo-v2-plugin/echo");
  });
});
