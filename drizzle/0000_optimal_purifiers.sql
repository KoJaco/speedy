CREATE TABLE `reaction_speed_leaderboard` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`reaction_time` real NOT NULL,
	`estimated_latency` real NOT NULL,
	`updated_at` text DEFAULT (current_timestamp) NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`deleted_at` text
);
--> statement-breakpoint
CREATE TABLE `typing_speed_leaderboard` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`wpm` real NOT NULL,
	`reaction_time` real NOT NULL,
	`estimated_latency` real NOT NULL,
	`overall_score` real NOT NULL,
	`updated_at` text DEFAULT (current_timestamp) NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`deleted_at` text
);
