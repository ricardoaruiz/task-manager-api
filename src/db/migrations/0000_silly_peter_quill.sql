CREATE TABLE "tasks" (
	"id" text PRIMARY KEY NOT NULL,
	"title" varchar(50) NOT NULL,
	"description" varchar(255) NOT NULL,
	"completedAt" timestamp,
	CONSTRAINT "tasks_title_unique" UNIQUE("title")
);
