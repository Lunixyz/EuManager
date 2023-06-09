import { AstraLuna } from "./Client";
import { handler } from "./handler";
import { onInteraction } from "../events/onInteraction";
import { Init } from "../events/Init";
import { Events } from "discord.js";
import { onMessage } from "../events/onMessage";
import { gcStatus } from "../events/onGCDisconnect";
import { checkStatus } from "../events/checkCSStatus";
import { xpReset } from "../events/xpBonusResetAlert";
import { blogCheck } from "../events/checkCSBlog";
const client = new AstraLuna();
client.mongoConnect();
client.login();
handler();
checkStatus();
xpReset(client);
blogCheck(client)
gcStatus(client);
client.once(Events.ClientReady, async () => await Init(client));
client.on(Events.InteractionCreate, async (interaction) => {
  await onInteraction(interaction, client);
});
client.on("messageCreate", async (message) => await onMessage(client, message));
export { client };
