import { sql } from "drizzle-orm";
import { sqliteTable, text, real } from "drizzle-orm/sqlite-core";

// helpers
const timestamps = {
    updated_at: text("updated_at")
        .notNull()
        .default(sql`(current_timestamp)`),
    created_at: text("created_at")
        .notNull()
        .default(sql`(current_timestamp)`),
    deleted_at: text("deleted_at"),
};

export const reactionSpeedLeaderboard = sqliteTable(
    "reaction_speed_leaderboard",
    {
        id: text("id").primaryKey(),
        username: text("username").notNull(),
        reactionTime: real("reaction_time").notNull(), // Pure reaction speed (Click test)
        estimatedLatency: real("estimated_latency").notNull(), // Subtracted from reaction time
        ...timestamps,
    }
);

export const typingSpeedLeaderboard = sqliteTable("typing_speed_leaderboard", {
    id: text("id").primaryKey(),
    username: text("username").notNull(),
    wpm: real("wpm").notNull(), // Words per minute
    reactionTime: real("reaction_time").notNull(), // Reaction speed from typing test
    estimatedLatency: real("estimated_latency").notNull(), // Adjusted reaction time
    overallScore: real("overall_score").notNull(), // Computed from WPM & reaction speed
    ...timestamps,
});
