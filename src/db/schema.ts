import {
  pgTable,
  integer,
  varchar,
  serial,
  text,
  timestamp,
  decimal,
  time,
  date,
} from "drizzle-orm/pg-core";

// При любых изменениях снача меняем/добавляем схему
// генерируем npx drizzle-kit generate  - сгенерирует скрипты в папку drizzle
// мигрируем npx drizzle-kit migrate  -внесет изменения в базу данных

export const events = pgTable("events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  image: text(),
  description: varchar({ length: 255 }),
  place: varchar({length: 255}),
  datetime: timestamp().notNull(),
  price: decimal(),
  email: varchar({ length: 255 }),
  phone: varchar({ length: 20 }),
  createdAt: timestamp("created_at").defaultNow(),
});

//На будущее добавить отображение будущих/прошедших мероприятий по фильтру поля timestamp

export const users = pgTable("users", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  image: text(),
  role: varchar({ length: 100 }).notNull().default("customer"),
});

export const artists = pgTable("artists", {
  id: serial().primaryKey(),
  artistName: varchar({ length: 255 }).notNull(),
  instrumentRole: varchar({ length: 255 }).notNull(),
  artistImage: text(),
  eventId: integer("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
});

