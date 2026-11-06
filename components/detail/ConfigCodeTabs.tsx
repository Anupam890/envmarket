"use client";

import * as React from "react";
import { Copy, Check, Terminal, FileCode2, Layers } from "lucide-react";
import { ConfigTemplates } from "@/lib/types";
import { toast } from "sonner";

interface ConfigCodeTabsProps {
  config: ConfigTemplates;
  supportsMcp: boolean;
  mcpDetails?: string;
}

export function ConfigCodeTabs({
  config,
  supportsMcp,
  mcpDetails,
}: ConfigCodeTabsProps) {
  const availableTabs: Array<{ id: keyof ConfigTemplates; label: string }> = [];

  if (config.python) availableTabs.push({ id: "python", label: "Python" });
  if (config.typescript) availableTabs.push({ id: "typescript", label: "TypeScript" });
  if (config.cli) availableTabs.push({ id: "cli", label: "CLI" });
  if (config.docker) availableTabs.push({ id: "docker", label: "Docker" });
  if (config.api) availableTabs.push({ id: "api", label: "cURL / API" });
  if (supportsMcp && config.mcp) availableTabs.push({ id: "mcp", label: "MCP Config" });

  const [activeTab, setActiveTab] = React.useState<keyof ConfigTemplates>(
    availableTabs[0]?.id || "python"
  );
  const [copied, setCopied] = React.useState(false);

  const activeCode = config[activeTab] || "";

  const handleCopy = () => {
    if (!activeCode) return;
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    toast.success("Snippet copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-950 overflow-hidden shadow-sm">
      {/* Tab Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 overflow-x-auto">
        <div className="flex items-center gap-1">
          {availableTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-2xs"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer border border-slate-700 ml-2 shrink-0"
          title="Copy code snippet"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Display */}
      <div className="p-4 overflow-x-auto text-xs font-mono text-slate-200 leading-relaxed max-h-[360px]">
        <pre className="selection:bg-blue-600 selection:text-white">
          <code>{activeCode}</code>
        </pre>
      </div>

      {/* MCP Integration Note */}
      {activeTab === "mcp" && mcpDetails && (
        <div className="px-4 py-2.5 bg-blue-950/60 border-t border-blue-900 text-[11px] text-blue-300 flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>{mcpDetails}</span>
        </div>
      )}
    </div>
  );
}

