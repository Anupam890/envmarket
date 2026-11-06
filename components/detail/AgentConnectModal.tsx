"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Environment } from "@/lib/types";
import { Copy, Check, Sparkles, Bot, Layers } from "lucide-react";
import { toast } from "sonner";

interface AgentConnectModalProps {
  environment: Environment;
  isOpen: boolean;
  onClose: () => void;
}

export function AgentConnectModal({
  environment,
  isOpen,
  onClose,
}: AgentConnectModalProps) {
  const [activeFw, setActiveFw] = React.useState<"langgraph" | "openai" | "crewai">("langgraph");
  const [copied, setCopied] = React.useState(false);

  const snippets = {
    langgraph: `# LangGraph Tool Wrapper for ${environment.name}
from langchain_core.tools import tool
from typing import Dict, Any

@tool
def execute_in_${environment.slug.replace(/[^a-zA-Z0-9]/g, "_")}(code_or_prompt: str) -> str:
    """Executes actions inside the isolated ${environment.name} sandbox."""
    # Handshake with EnvMarket session
    endpoint = "https://runtime.envmarket.dev/v1/sessions"
    # Agent executes tool in isolated ${environment.specs.isolationLevel}
    return f"Execution complete for: {code_or_prompt[:30]}..."

# Add to your LangGraph state graph
tools = [execute_in_${environment.slug.replace(/[^a-zA-Z0-9]/g, "_")}]`,

    openai: `# OpenAI Agents SDK / Swarm Integration
from agents import Agent, Runner

def run_environment_sandbox(prompt: str) -> str:
    """Invokes ${environment.name} with security policy: ${environment.specs.networkEgress}"""
    return f"Connected to ${environment.slug} via secure RPC"

agent = Agent(
    name="${environment.name} Agent",
    instructions="You have access to an isolated execution sandbox.",
    tools=[run_environment_sandbox]
)

result = Runner.run_sync(agent, "Analyze and execute task")
print(result.final_output)`,

    crewai: `# CrewAI Tool Integration
from crewai.tools import tool

@tool("${environment.name} Executor")
def run_env_task(command: str) -> str:
    """Tool for ${environment.category.name} execution."""
    return f"${environment.name} executed: {command}"

# Attach to CrewAI Agent
# agent = Agent(role="Executor", tools=[run_env_task], ...)`,
  };

  const currentCode = snippets[activeFw];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    toast.success("Connection code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-600" />
          <span>Connect to Agent Framework</span>
        </div>
      }
      description={`Generate drop-in tool code to connect ${environment.name} directly into your agent pipeline.`}
      maxWidth="2xl"
    >
      <div className="space-y-4">
        {/* Framework Selector */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setActiveFw("langgraph")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeFw === "langgraph"
                ? "bg-white text-blue-600 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            LangGraph
          </button>
          <button
            onClick={() => setActiveFw("openai")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeFw === "openai"
                ? "bg-white text-blue-600 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            OpenAI Agents SDK
          </button>
          <button
            onClick={() => setActiveFw("crewai")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeFw === "crewai"
                ? "bg-white text-blue-600 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            CrewAI
          </button>
        </div>

        {/* Code Snippet Box */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 overflow-x-auto relative">
          <button
            onClick={handleCopy}
            className="absolute right-3 top-3 flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-md border border-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
          <pre className="selection:bg-blue-600 selection:text-white pr-20">
            <code>{currentCode}</code>
          </pre>
        </div>

        <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-800 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            Isolation level: <strong>{environment.specs.isolationLevel}</strong> with {environment.specs.networkEgress} egress networking.
          </span>
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-100">
          <Button variant="outline" size="sm" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
}

