import { Command } from "../utils/command";
import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ChannelType,
  PermissionFlagsBits,
} from "discord.js";
import { Channels } from "../Schem/Schematica";

export = {
  data: new SlashCommandBuilder()
    .setName("notify")
    .setDescription("channel notifications > ...")
    .addChannelOption((sub) =>
      sub
        .setName("channel")
        .setDescription("channel notifications > warns")
        .setRequired(true)
    ),
  async execute(interaction: ChatInputCommandInteraction, client) {
    const Guild = client.guilds.cache.get(interaction.guildId ?? "");
    const User = Guild?.members.cache.get(interaction.user.id);
    if (!User?.permissions.has(PermissionFlagsBits.Administrator))
      return interaction.reply({
        content: "[❌] Sem permissão.",
        ephemeral: true,
      });
    const selectedChannel = interaction.options.getChannel("channel");
    if (selectedChannel?.type !== ChannelType.GuildText)
      return interaction.reply({
        content: "Esse canal não é um canal de texto.",
        ephemeral: true,
      });
    await Channels.create({
      GuildId: interaction.guildId,
      BlogChannelId: selectedChannel?.id,
    });
    interaction.reply({
      content: "Canal salvo com sucesso, agora você irá ser notificado!",
      ephemeral: true,
    });
  },
} as Command;
