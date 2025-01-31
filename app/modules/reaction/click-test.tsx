import { useEffect, useRef, useState } from "react";
import { Card, CardFooter } from "~/components/ui/card";

const ClickTest = () => {
    const [testState, setTestState] = useState<
        "idle" | "holding" | "waiting" | "ready" | "clicked"
    >("idle");
    const [startTime, setStartTime] = useState<number | null>(null);
    const [releaseTime, setReleaseTime] = useState<number | null>(null);
    const [clickTime, setClickTime] = useState<number | null>(null);
    const [reactionTime, setReactionTime] = useState<number | null>(null);
    const [targetPosition, setTargetPosition] = useState<{
        x: number;
        y: number;
    } | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);

    const handleHoldStart = () => {
        if (testState !== "idle") return;
        setTestState("holding");

        timeoutRef.current = setTimeout(() => {
            setTestState("waiting");

            const randomDelay = Math.random() * 2000 + 1000; // 1-3 seconds delay
            timeoutRef.current = setTimeout(() => {
                setTestState("ready");
                setStartTime(performance.now());

                if (cardRef.current) {
                    const { left, top, width, height } =
                        cardRef.current.getBoundingClientRect();
                    setTargetPosition({
                        x: left + Math.random() * (width - 50),
                        y: top + Math.random() * (height - 50),
                    });
                }
            }, randomDelay);
        }, 500); // User must hold for at least 500ms
    };

    const handleHoldRelease = () => {
        if (testState === "waiting") {
            // User released too early before the green light → reset state
            clearTimeout(timeoutRef.current!);
            setTestState("idle");
            return;
        }
        if (testState !== "ready") return;

        setReleaseTime(performance.now());
        setTestState("clicked");
    };

    const handleTargetClick = () => {
        if (testState !== "clicked") return;

        const finalTime = performance.now();
        setClickTime(finalTime);

        if (startTime && releaseTime) {
            const totalReactionTime =
                releaseTime - startTime + (finalTime - releaseTime);
            setReactionTime(totalReactionTime);
        }

        setTestState("idle");
        setTargetPosition(null);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <Card
            ref={cardRef}
            className="min-h-[600px] h-full flex flex-col justify-center items-center relative"
        >
            <CardFooter className="mt-auto flex-col flex gap-4">
                <button
                    className={`py-2 px-6 text-foreground rounded-md transition-all ${
                        testState === "idle"
                            ? "bg-gray-500"
                            : testState === "holding"
                            ? "bg-blue-500"
                            : testState === "waiting"
                            ? "bg-red-500"
                            : "bg-green-500"
                    }`}
                    onMouseDown={handleHoldStart}
                    onMouseUp={handleHoldRelease}
                    onTouchStart={handleHoldStart}
                    onTouchEnd={handleHoldRelease}
                >
                    {testState === "idle" && "Hold to Start"}
                    {testState === "holding" && "Keep Holding..."}
                    {testState === "waiting" && "Wait for Green..."}
                    {testState === "ready" && "Click the Target!"}
                    {testState === "clicked" && "Processing..."}
                </button>
                {reactionTime && (
                    <p className="text-lg font-bold">
                        {reactionTime.toFixed(2)} ms
                    </p>
                )}
            </CardFooter>

            {targetPosition && testState === "clicked" && (
                <button
                    onClick={handleTargetClick}
                    style={{
                        position: "absolute",
                        left: targetPosition.x,
                        top: targetPosition.y,
                        width: 50,
                        height: 50,
                        backgroundColor: "red",
                        borderRadius: "50%",
                        cursor: "pointer",
                    }}
                />
            )}
        </Card>
    );
};

export default ClickTest;
