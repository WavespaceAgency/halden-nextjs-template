import type { MDXComponents } from "mdx/types";
import { Heading } from "./Heading";
import { List } from "./List";
import { ListItem } from "./ListItem";
import { Paragraph } from "./Paragraph";
import { Quote } from "./Quote";
import { Stats } from "./Stats";

/**
 * MDX element styles for blog posts: `<Content components={blogMdx} />`.
 * Quote and Stats can be used in any post without an import.
 */
export const blogMdx = {
  h2: Heading,
  p: Paragraph,
  ul: List,
  li: ListItem,
  Quote,
  Stats,
} satisfies MDXComponents;
