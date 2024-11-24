CREATE TABLE IF NOT EXISTS "election_proposals" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "election_proposals_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"electionId" integer NOT NULL,
	"proposal" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "public_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"public_voter_id" integer NOT NULL,
	"electionId" integer NOT NULL,
	"preferred_proposal_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "public_voters" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "public_voters_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "representative" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "representative_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "representative_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "representative_public_votes" (
	"id" serial PRIMARY KEY NOT NULL,
	"representative_id" integer NOT NULL,
	"public_voter_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "votes" (
	"id" serial PRIMARY KEY NOT NULL,
	"public_voter_id" integer NOT NULL,
	"election_proposal_id" integer NOT NULL,
	"representative_id" integer NOT NULL
);
--> statement-breakpoint
DROP TABLE "repesentative" CASCADE;--> statement-breakpoint
ALTER TABLE "elections" ADD COLUMN "status" varchar(50) DEFAULT 'on';--> statement-breakpoint
ALTER TABLE "elections" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "elections" ADD COLUMN "concluded_at" timestamp;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "election_proposals" ADD CONSTRAINT "election_proposals_electionId_elections_id_fk" FOREIGN KEY ("electionId") REFERENCES "public"."elections"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "public_preferences" ADD CONSTRAINT "public_preferences_public_voter_id_public_voters_id_fk" FOREIGN KEY ("public_voter_id") REFERENCES "public"."public_voters"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "public_preferences" ADD CONSTRAINT "public_preferences_electionId_elections_id_fk" FOREIGN KEY ("electionId") REFERENCES "public"."elections"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "public_preferences" ADD CONSTRAINT "public_preferences_preferred_proposal_id_election_proposals_id_fk" FOREIGN KEY ("preferred_proposal_id") REFERENCES "public"."election_proposals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "representative_public_votes" ADD CONSTRAINT "representative_public_votes_representative_id_representative_id_fk" FOREIGN KEY ("representative_id") REFERENCES "public"."representative"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "representative_public_votes" ADD CONSTRAINT "representative_public_votes_public_voter_id_public_voters_id_fk" FOREIGN KEY ("public_voter_id") REFERENCES "public"."public_voters"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "votes" ADD CONSTRAINT "votes_public_voter_id_public_voters_id_fk" FOREIGN KEY ("public_voter_id") REFERENCES "public"."public_voters"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "votes" ADD CONSTRAINT "votes_election_proposal_id_election_proposals_id_fk" FOREIGN KEY ("election_proposal_id") REFERENCES "public"."election_proposals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "votes" ADD CONSTRAINT "votes_representative_id_representative_id_fk" FOREIGN KEY ("representative_id") REFERENCES "public"."representative"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "elections" DROP COLUMN IF EXISTS "proposal";