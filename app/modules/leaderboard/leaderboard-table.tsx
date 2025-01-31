import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table";
import { ReactionSpeedEntry, TypingSpeedEntry } from "~/lib/db/types";

interface LeaderboardEntry {
    id: string;
    username: string;
    reactionTime?: number;
    wpm?: number;
    overallScore?: number;
    created_at: string;
}

export default function LeaderboardTable({
    scores,
}: {
    scores: ReactionSpeedEntry[] | TypingSpeedEntry[];
}) {
    const [testType, setTestType] = useState<"reaction_speed" | "typing_speed">(
        "reaction_speed"
    );

    const columns: ColumnDef<LeaderboardEntry>[] = [
        {
            accessorKey: "username",
            header: "Username",
        },
        {
            accessorKey:
                testType === "reaction_speed" ? "reactionTime" : "overallScore",
            header:
                testType === "reaction_speed"
                    ? "Reaction Time (ms)"
                    : "Overall Score",
            cell: ({ row }) => (
                <span>
                    {testType === "reaction_speed"
                        ? `${row.original.reactionTime?.toFixed(2)} ms`
                        : row.original.overallScore?.toFixed(1)}
                </span>
            ),
        },
        {
            accessorKey: "created_at",
            header: "Date",
            cell: ({ row }) => (
                <span>
                    {new Date(row.original.created_at).toLocaleDateString()}
                </span>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Leaderboard</h2>
                <select
                    value={testType}
                    onChange={(e) =>
                        setTestType(
                            e.target.value as "reaction_speed" | "typing_speed"
                        )
                    }
                    className="p-2 border rounded"
                >
                    <option value="reaction_speed">Reaction Speed Test</option>
                    <option value="typing_speed">Typing Speed Test</option>
                </select>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((col) => (
                            <TableHead key={col.accessorKey as string}>
                                {col.header as string}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {scores.map((entry) => (
                        <TableRow key={entry.id}>
                            <TableCell>{entry.username}</TableCell>
                            <TableCell>
                                {testType === "reaction_speed"
                                    ? `${entry.reactionTime?.toFixed(2)} ms`
                                    : entry.overallScore?.toFixed(1)}
                            </TableCell>
                            <TableCell>
                                {new Date(
                                    entry.created_at
                                ).toLocaleDateString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
