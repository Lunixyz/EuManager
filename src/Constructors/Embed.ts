import {
  APIEmbed,
  ColorResolvable,
  EmbedAuthorData,
  EmbedBuilder,
  EmbedData,
  isJSONEncodable,
  JSONEncodable,
} from "discord.js";
export class BEmbed extends EmbedBuilder {
  constructor(data?: EmbedData | APIEmbed) {
    super(data);
  }
  setADC(author: EmbedAuthorData, description: string, color: ColorResolvable) {
    return (
      super.setAuthor(author),
      super.setDescription(description),
      super.setColor(color)
    );
  }
  static from(other: JSONEncodable<APIEmbed> | APIEmbed) {
    if (isJSONEncodable(other)) {
      return new this(other.toJSON());
    }
    return new this(other);
  }
}
