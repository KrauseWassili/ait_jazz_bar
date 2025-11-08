import { pgTable, integer, varchar, serial, text } from "drizzle-orm/pg-core";


// При любых изменениях снача меняем/добавляем схему
// генерируем npx drizzle-kit generate  - сгенерирует скрипты в папку drizzle
// мигрируем npx drizzle-kit migrate  -внесет изменения в базу данных

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  place: varchar("text", {length: 255}),
  description: text("description"),
  date: varchar("date", {length: 100}),
  imageUrl: text("image_url"),
});




