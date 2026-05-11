import {
  FileSignature,
  Stamp,
  Users,
  Calculator,
  Lock,
} from "lucide-react";

export const BLOG_POST_ICON_MAP = {
  FileSignature,
  Stamp,
  Users,
  Calculator,
  Lock,
} as const;

export type BlogPostIconName = keyof typeof BLOG_POST_ICON_MAP;
