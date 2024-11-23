CREATE TABLE IF NOT EXISTS "elections" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "elections_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"proposal" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "repesentative" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "repesentative_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"election" varchar(255) NOT NULL
);
