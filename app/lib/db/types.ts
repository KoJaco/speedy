import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { reactionSpeedLeaderboard, typingSpeedLeaderboard } from "./schema";

export type ReactionSpeedEntry = InferSelectModel<
    typeof reactionSpeedLeaderboard
>;
export type TypingSpeedEntry = InferSelectModel<typeof typingSpeedLeaderboard>;

export type ReactionSpeedUpdate = InferInsertModel<
    typeof reactionSpeedLeaderboard
>;
export type TypingSpeedUpdate = InferInsertModel<typeof typingSpeedLeaderboard>;
