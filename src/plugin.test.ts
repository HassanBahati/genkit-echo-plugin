import { test, describe } from "node:test";
import assert from "node:assert";
import { echoPlugin } from "./plugin";

describe("Echo Plugin", () => {
  test("should create plugin with default configuration", () => {
    const plugin = echoPlugin();
    assert.ok(plugin);
    assert.strictEqual(typeof plugin, "object");
  });

  test("should create plugin with custom configuration", () => {
    const customResponse = "Custom echo response";
    const plugin = echoPlugin({ defaultResponse: customResponse });
    assert.ok(plugin);
    assert.strictEqual(typeof plugin, "object");
  });

  test("should have correct plugin name", () => {
    const plugin = echoPlugin();
    assert.strictEqual(plugin.name, "echo-plugin");
  });

  test("should initialize and return models", async () => {
    const plugin = echoPlugin();
    assert.ok(plugin.init, "Plugin should have init method");
    const models = await plugin.init!();

    assert.ok(Array.isArray(models));
    assert.strictEqual(models.length, 1);
  });

  test("should list available models", async () => {
    const plugin = echoPlugin();
    assert.ok(plugin.list, "Plugin should have list method");
    const models = await plugin.list!();

    assert.ok(Array.isArray(models));
    assert.strictEqual(models.length, 1);
    assert.strictEqual(models[0].name, "echo-plugin/echo");
  });
});
