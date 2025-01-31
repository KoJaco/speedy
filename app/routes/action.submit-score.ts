import { db } from "~/lib/db";
import {
    reactionSpeedLeaderboard,
    typingSpeedLeaderboard,
} from "~/lib/db/schema";

export const action = async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const username = formData.get("username")?.toString();
    const testType = formData.get("testType")?.toString(); // "reaction_speed" or "typing_speed"
    const reactionTime = parseFloat(formData.get("reactionTime") as string);
    const estimatedLatency = parseFloat(
        formData.get("estimatedLatency") as string
    );

    if (!username || isNaN(reactionTime) || isNaN(estimatedLatency)) {
        return { error: "Invalid input.", status: 400 };
    }

    if (testType === "reaction_speed") {
        await db.insert(reactionSpeedLeaderboard).values({
            id: crypto.randomUUID(),
            username,
            reactionTime,
            estimatedLatency,
        });
    } else if (testType === "typing_speed") {
        const wpm = parseFloat(formData.get("wpm") as string);
        const overallScore = parseFloat(formData.get("overallScore") as string);

        if (isNaN(wpm) || isNaN(overallScore)) {
            return { error: "Invalid input.", status: 400 };
        }

        await db.insert(typingSpeedLeaderboard).values({
            id: crypto.randomUUID(),
            username,
            reactionTime,
            estimatedLatency,
            wpm,
            overallScore,
        });
    } else {
        return { error: "Invalid test type", status: 400 };
    }

    return { success: true };
};
