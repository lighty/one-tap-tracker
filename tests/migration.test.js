const test = require("node:test");
const assert = require("node:assert/strict");
const Module = require("node:module");

// main.js は Obsidian 実行時にしか存在しない "obsidian" モジュールを読むため、最小限のスタブを差し込む。
const obsidianStub = {
  App: class {},
  ItemView: class {},
  Modal: class {},
  Notice: class {},
  Plugin: class {},
  Setting: class {},
  normalizePath: (path) => path.replace(/\/+/g, "/").replace(/^\/|\/$/g, ""),
  setIcon: () => {},
};
const originalLoad = Module._load;
Module._load = function load(request, ...rest) {
  if (request === "obsidian") {
    return obsidianStub;
  }
  return originalLoad.call(this, request, ...rest);
};
const { migrateLegacyStorageFolder } = require("../main.js");
Module._load = originalLoad;

function createVault(paths) {
  const entries = new Map(
    paths.map((path) => [path, path.includes(".") ? { path } : { path, children: [] }]),
  );
  const renames = [];
  return {
    renames,
    getAbstractFileByPath: (path) => entries.get(path) ?? null,
    rename: async (file, newPath) => {
      renames.push([file.path, newPath]);
      entries.delete(file.path);
      entries.set(newPath, { ...file, path: newPath });
    },
  };
}

test("旧フォルダだけがある場合は新フォルダへリネームする", async () => {
  const vault = createVault(["PebbleTracker"]);
  assert.equal(await migrateLegacyStorageFolder(vault), true);
  assert.deepEqual(vault.renames, [["PebbleTracker", "OneTapTracker"]]);
});

test("新フォルダが既にある場合は何もしない", async () => {
  const vault = createVault(["PebbleTracker", "OneTapTracker"]);
  assert.equal(await migrateLegacyStorageFolder(vault), false);
  assert.deepEqual(vault.renames, []);
});

test("旧フォルダがない場合は何もしない", async () => {
  const vault = createVault([]);
  assert.equal(await migrateLegacyStorageFolder(vault), false);
  assert.deepEqual(vault.renames, []);
});

test("旧パスがフォルダでなくファイルの場合は何もしない", async () => {
  const vault = createVault(["PebbleTracker.md"]);
  vault.getAbstractFileByPath = (path) =>
    path === "PebbleTracker" ? { path } : null;
  assert.equal(await migrateLegacyStorageFolder(vault), false);
});
