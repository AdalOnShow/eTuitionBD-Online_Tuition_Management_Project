"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

export function TokenPlayground() {
  const getAccessToken = () => {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(
      new RegExp(`(^| )access_token=([^;]+)`),
    );
    return match ? match[2] : null;
  };

  const accessToken = getAccessToken();
  const [copied, setCopied] = React.useState(false);

  const tokenPreview = accessToken ? `${accessToken.slice(0, 30)}...` : "";

  const copyToken = async () => {
    if (!accessToken) return;

    await navigator.clipboard.writeText(accessToken);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-3 rounded-lg border p-4">
      <p className="text-sm font-medium">Access Token</p>
      {accessToken ? (
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" onClick={copyToken}>
            {copied ? "Copied" : "Copy access token"}
          </Button>
        </div>
      ) : null}
      {tokenPreview ? (
        <p className="text-xs break-all">{tokenPreview}</p>
      ) : (
        <p className="text-muted-foreground text-sm">
          No access token is present in cookies.
        </p>
      )}
    </div>
  );
}
