declare module "@danktuary/react-discord-message" {
  import { ReactElement, ReactNode } from "react";

  export function DiscordMessages({
    children,
    compactMode,
    lightTheme,
  }: {
    children?: ReactNode;
    compactMode?: boolean;
    lightTheme?: boolean;
  }): ReactElement;

  export function DiscordMessage({
    author,
    avatar,
    bot,
    children,
    compactMode,
    edited,
    profile,
    roleColor,
    timestamp,
  }: {
    author?: string;
    avatar?: string;
    bot?: boolean;
    children?: ReactNode;
    compactMode?: boolean;
    edited?: boolean;
    profile?: string;
    roleColor?: string;
    timestamp?: Date | string;
  }): ReactElement;

  export function DiscordEmbed({
    authorImage,
    authorName,
    authorUrl,
    children,
    color,
    footerImage,
    image,
    thumbnail,
    timestamp,
    title,
    url,
  }: {
    authorImage?: string;
    authorName?: string;
    authorUrl?: string;
    children?: ReactNode;
    color?: string;
    footerImage?: string;
    image?: string;
    thumbnail?: string;
    timestamp?: Date | string;
    title?: string;
    url?: string;
  }): ReactElement;

  export function DiscordEmbedField({
    children,
    fieldTitle,
    inline,
  }: {
    children?: ReactNode;
    fieldTitle?: string;
    inline?: boolean;
  }): ReactElement;

  export function DiscordEmbedFields({
    children,
  }: {
    children?: ReactNode;
  }): ReactElement;

  export function DiscordMention({
    children,
    color,
    profile,
    type,
  }: {
    children?: ReactNode;
    color?: string;
    profile?: string;
    highlight?: boolean;
    type?: "user" | "channel" | "role";
  }): ReactElement;
}
