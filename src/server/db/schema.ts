// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `next_app_${name}`);

export const projects = createTable(
  "projects",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (projects) => ({
    nameIndex: index("name_idx").on(projects.name),
  })
);

export const contents = createTable(
  "contents",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    text: varchar("text", { length: 1000 }).notNull(),
    projectId: integer("project_id").references(() => projects.id).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (contents) => ({
    projectIdIndex: index("project_id_idx").on(contents.projectId),
  })
);

export const dynamicFields = createTable(
  "dynamic_fields",
  {
    id: serial("id").primaryKey(),
    contentId: integer("content_id").references(() => contents.id).notNull(),
    key: varchar("key", { length: 256 }).notNull(),
    value: varchar("value", { length: 1000 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (dynamicFields) => ({
    contentIdIndex: index("content_id_idx").on(dynamicFields.contentId),
  })
);
