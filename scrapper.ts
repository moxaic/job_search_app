/**
 * Use gmail api instead of scrapping
 */

require("dotenv").config({ path: ".env.dev" });
import puppeteer from "puppeteer-extra";
import Stealth from "puppeteer-extra-plugin-stealth";

puppeteer.use(Stealth());

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(
      "https://accounts.google.com/signin/v2/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&service=mail&sacu=1&rip=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin",
      {
        waitUntil: "domcontentloaded",
      }
    );
    await page.waitForTimeout(10000);
    await page.type("input[type='email']", process.env.GMAIL_ID!, {
      delay: 200,
    });
    const buttons1 = await page.$$("button");
    const button1 = buttons1[buttons1.length - 2];
    await button1.click();
    await page.waitForTimeout(5000);
    await page.type("input[type='password']", process.env.GMAIL_PASSWORD!, {
      delay: 300,
    });
    const buttons2 = await page.$$("button");
    const button2 = buttons2[buttons2.length - 2];
    await button2.click();
    await page.waitForTimeout(20000);

    const emailIds = await page.$$eval(
      "table[role='grid'] td span.yP",
      (nodes, target) => {
        const getId = (node: Element | HTMLElement | null): string => {
          if (node === null) return "";
          if (node.id === "") return getId(node.parentElement);
          return node.id;
        };
        return nodes.filter((node) => node.textContent === target).map(getId);
      },
      process.env.GMAIL_TARGET!
    );

    console.log(emailIds);

    const fields: {
      field: string;
      keywords: string[];
      data?: string;
    }[] = [
      { field: "target audience", keywords: ["kind att"] },
      { field: "eligibility criteria", keywords: ["eligiblity"] },
      { field: "profile", keywords: ["profile", "roles", "designation"] },
      { field: "salary", keywords: ["stipend", "salary", "package"] },
      { field: "job location", keywords: ["location"] },
    ];

    await page.click(`#\\${emailIds[0]}`, {
      delay: 300,
    });

    emailIds.forEach(async (id) => {
      await page.click(id);
      await page.waitForTimeout(2000);

      await page.evaluate((fields) => {
        const bTags: NodeListOf<HTMLElement> =
          document.querySelectorAll("div.gmail_quote b");

        bTags.forEach((tag) => {
          for (const field of fields) {
            if (field.data) continue;
            for (const keyword of field.keywords) {
              if (tag.innerText.toLowerCase().includes(keyword)) {
                field.data = tag.parentElement?.innerText.slice(
                  tag.innerText.length
                );
                break;
              }
            }
          }
        });
        console.log(fields);
      }, fields);

      await page.goBack();
      await page.waitForTimeout(2000);
    });

    await browser.close();
  } catch (err) {
    console.error(err);
  }
})();
