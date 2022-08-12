import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

interface ResourceFields {
  title: string;
  description: string;
  links?: {
    name: string;
    url: string;
  }[];
  credits?: (
    | {
        type: "discord" | "github";
        id: string;
      }
    | {
        name: string;
      }
  )[];
  discordInvite?: string;
}

export type Resource = ResourceFields & ParsedContent;

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type ResourceTranslation = DeepPartial<ResourceFields> & ParsedContent;
