"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

type TokenApiResponse = {
  tokenType: string;
  accessToken: string;
  accessTokenExpiresAt: string;
};

export function TokenPlayground() {
  const [message, setMessage] = React.useState("");
  const [tokenPreview, setTokenPreview] = React.useState("");

  const requestToken = async (
    path: "/api/auth/token" | "/api/auth/refresh",
  ) => {
    setMessage("Processing...");

    const response = await fetch(path, { method: "POST" });
    const payload = (await response.json()) as
      | TokenApiResponse
      | { message: string };

    if (!response.ok || !("accessToken" in payload)) {
      setMessage(
        "message" in payload ? payload.message : "Token request failed",
      );
      return;
    }

    setTokenPreview(`${payload.accessToken.slice(0, 30)}...`);
    setMessage(`Access token valid until: ${payload.accessTokenExpiresAt}`);
  };

  return (
    <div className="space-y-3 rounded-lg border p-4">
      <p className="text-sm font-medium">Access/Refresh Token Demo</p>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          onClick={() => requestToken("/api/auth/token")}
        >
          Issue Token Pair
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => requestToken("/api/auth/refresh")}
        >
          Rotate with Refresh
        </Button>
      </div>
      {message ? (
        <p className="text-muted-foreground text-sm">{message}</p>
      ) : null}
      {tokenPreview ? (
        <p className="text-xs break-all">{tokenPreview}</p>
      ) : null}
    </div>
  );
}
