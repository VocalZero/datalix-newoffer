import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { parse } from "node-html-parser";
import cron from "node-cron";
import { LogService } from "./log.service";
import { MessageBuilder, Webhook } from "discord-webhook-node";
import crypto from "crypto";

let savedMessageHash = "";
const discordHook = new Webhook(process.env.DISCORD_WEBHOOK_URL);

function checkDatalix() {
  axios.get("https://datalix.de/sale-dedicated-server-mieten").then((data) => {
    LogService.logInfo("Status code: " + data.status);
    const doc = parse(data.data);
    const elements = doc.querySelectorAll("#packages > div > div > div > div > table > tbody > tr");
    if (elements.length === 1) {
      const element = elements[0];
      const text = element.querySelector("td > div");
      if (text && text.rawText.includes("Keine Sale Dedicated Server auf Lager")) {
        LogService.logInfo(`Es gibt keine neuen Angebote bei Datalix :(`);
        return;
      }
    }
    const offers = [];
    elements.forEach((element, index) => {
      const cpu = element
        .querySelector("th")
        .rawText.replace(/[\r\n]+/g, " ")
        .trim();
      const ram = element
        .querySelectorAll("td")[0]
        .rawText.replace(/[\r\n]+/g, " ")
        .trim();
      const ssd = element
        .querySelectorAll("td")[1]
        .rawText.replace(/[\r\n]+/g, " ")
        .trim();
      const price = element
        .querySelectorAll("td")[6]
        .rawText.replace(/[\r\n]+/g, " ")
        .trim();
      LogService.logInfo(`${index + 1}. CPU: ${cpu}, RAM: ${ram}, SSD: ${ssd}, Price: ${price}`);
      offers.push(`${index + 1}. CPU: ${cpu}, RAM: ${ram}, SSD: ${ssd}, Price: ${price}`);
    });

    const message =
      `Jackpot es gibt **${elements.length} Server Angebote** bei Datalix zu bestellen!\nhttps://datalix.de/sale-dedicated-server-mieten\n\n` +
      offers.join("\n");
    const messageHash = crypto.createHash("sha256").update(message).digest("hex");
    if (messageHash === savedMessageHash) {
      LogService.logInfo("Angebotsnachricht wurde bereits verschickt. Keine neue Nachricht.");
      return;
    }
    savedMessageHash = messageHash;
    LogService.logInfo(`Jackpot es gibt ${elements.length} Server Angebote bei Datalix zu bestellen!`);
    sendDiscordMessage(message);
  });
}

function sendDiscordMessage(message: string): void {
  const embed = new MessageBuilder().setColor(13235527).setDescription(message);
  discordHook.send(embed);
}

cron.schedule("*/1 * * * *", () => checkDatalix());
checkDatalix();
