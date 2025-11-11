ALTER TABLE "artists" ADD COLUMN "artistName" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "artists" ADD COLUMN "instrumentRole" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "artists" ADD COLUMN "artistImage" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "createdAt" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "artists" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "artists" DROP COLUMN "instrument_role";--> statement-breakpoint
ALTER TABLE "artists" DROP COLUMN "image";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "created_at";