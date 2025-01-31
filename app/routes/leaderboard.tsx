import { useLoaderData } from "@remix-run/react";
import { db } from "~/lib/db";
import {
    reactionSpeedLeaderboard,
    typingSpeedLeaderboard,
} from "~/lib/db/schema";
import { desc } from "drizzle-orm";
import { ReactionSpeedEntry, TypingSpeedEntry } from "~/lib/db/types";
import LeaderboardTable from "~/modules/leaderboard/leaderboard-table";

export const loader = async ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const testType = url.searchParams.get("test"); //?test=reaction_speed or ?test=typing_speed

    let scores: ReactionSpeedEntry[] | TypingSpeedEntry[];

    if (testType === "reaction_speed") {
        scores = await db
            .select()
            .from(reactionSpeedLeaderboard)
            .orderBy(reactionSpeedLeaderboard.reactionTime)
            .limit(10);
    } else if (testType === "typing_speed") {
        scores = await db
            .select()
            .from(typingSpeedLeaderboard)
            .orderBy(desc(typingSpeedLeaderboard.overallScore))
            .limit(10);
    } else {
        return { scores: [], error: "Invalid test type", status: 400 };
    }

    return { scores: scores, error: null, status: 200 };
};

const LeaderboardPage = () => {
    const { scores, error, status } = useLoaderData<typeof loader>();

    return (
        <div>
            LeaderboardPage
            {status === 200 ? (
                <LeaderboardTable scores={scores} />
            ) : (
                <>
                    <p>{error}</p>
                </>
            )}
        </div>
    );
};

export default LeaderboardPage;
