import "dotenv/config";

export const config = {
  token: process.env.BOT_TOKEN || "",
  clientId: process.env.CLIENT_ID || "",
};
