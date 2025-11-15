CREATE TABLE "tasks" (
	"id" text PRIMARY KEY NOT NULL,
	"title" varchar(50) NOT NULL,
	"description" varchar(255) NOT NULL,
	"completed_at" timestamp,
	"user_id" text NOT NULL,
	CONSTRAINT "tasks_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;