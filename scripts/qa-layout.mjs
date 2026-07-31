import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const output = path.join(process.cwd(), ".qa");
const sizes = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: chrome });

for (const size of sizes) {
  const page = await browser.newPage({
    viewport: { width: size.width, height: size.height },
    deviceScaleFactor: 1,
  });
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  await page.screenshot({
    path: path.join(output, `${size.name}.png`),
    fullPage: true,
  });

  const audit = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyHeight: document.documentElement.scrollHeight,
    overflow: [...document.querySelectorAll("body *")]
      .filter((element) => element.getBoundingClientRect().right > document.documentElement.clientWidth + 1)
      .slice(0, 10)
      .map((element) => ({
        className: element.className,
        right: Math.round(element.getBoundingClientRect().right),
      })),
  }));
  console.log(size.name, audit);
  await page.close();
}

await browser.close();
