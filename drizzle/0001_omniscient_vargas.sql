ALTER TABLE "events" DROP CONSTRAINT "events_email_unique";--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "phone" SET DATA TYPE varchar(20);