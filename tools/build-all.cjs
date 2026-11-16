// Gera as 4 opções de visual. A principal (Studio) vai para dist/; as alternativas para dist-<nome>/.
const { execFileSync } = require("child_process");
const path = require("path");
const root = path.join(__dirname, "..");
for (const [skin, out] of [["studio", "dist"], ["catalog", "dist-catalog"], ["manual", "dist-manual"], ["cinema", "dist-cinema"]]) {
  const o = execFileSync("node", ["build.mjs"], { cwd: root, env: { ...process.env, SKIN: skin, OUT: out } }).toString().trim();
  console.log(skin.padEnd(8), o);
}
