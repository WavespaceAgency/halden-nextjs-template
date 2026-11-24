import type { MDXComponents } from "mdx/types";
import { Heading } from "./Heading";
import { List } from "./List";
import { ListItem } from "./ListItem";
import { Paragraph } from "./Paragraph";
import { TextLink } from "./TextLink";

/** MDX element styles for the legal pages: `<Content components={legalMdx} />`. */
export const legalMdx = { h2: Heading, p: Paragraph, ul: List, li: ListItem, a: TextLink } satisfies MDXComponents;
