import { useState } from "react";
import { TaskProps } from "@/app/Models/models";

type RequestType = "recommend" | "model" | "praise";

interface RequestBody {
    type: RequestType;
    prompt?: string;
    img?: string;
    tag?: string;
    level?: string;
}

export const useChatGPT = () => {
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [response, setResponse] = useState<string>("");
    const [responseArray, setResponseArray] = useState<TaskProps[]>([]);

    const generateResponse = async (body: RequestBody) => {
        setIsGenerating(true);
        setResponse("");
        setResponseArray([]);

        try {
            const res = await fetch("/api/chatgpt", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                throw new Error("APIリクエストに失敗しました。");
            }

            // ストリーミングを伴う "model" タイプの場合
            if (body.type === "model" && res.body) {
                const reader = res.body.getReader();
                const decoder = new TextDecoder();
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value);
                    const lines = chunk.split("\n");
                    for (const line of lines) {
                        if (line.startsWith("data: ")) {
                            const jsonString = line.replace("data: ", "");
                            if (jsonString === "[DONE]") {
                                setIsGenerating(false);
                                return;
                            }
                            try {
                                const parsed = JSON.parse(jsonString);
                                if (parsed.choices[0].finish_reason !== "stop") {
                                    setResponse((prev) => prev + parsed.choices[0].delta.content);
                                }
                            } catch {
                                // JSON解析エラー
                            }
                        }
                    }
                }
            } else {
                // 通常のJSONレスポンスの場合
                const data = await res.json();
                
                if (body.type === "recommend") {
                    const arrayResult = data.result
                    setResponseArray(arrayResult);
                } else {
                    setResponse(data.result);
                }
            }
        } catch (error) {
            alert(error instanceof Error ? error.message : "エラーが発生しました。");
        } finally {
            setIsGenerating(false);
        }
    };

    return { response, responseArray, isGenerating, generateResponse };
};
