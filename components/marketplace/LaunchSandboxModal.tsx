"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Environment } from "@/lib/types";
import {
  Terminal,
  Play,
  RotateCcw,
  CheckCircle2,
  Copy,
  Check,
  ShieldAlert,
  Cpu,
  HardDrive,
  Activity,
  Globe,
  Radio,
} from "lucide-react";

interface LaunchSandboxModalProps {
  environment: Environment | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LaunchSandboxModal({
  environment,
  isOpen,
  onClose,
}: LaunchSandboxModalProps) {
  const [phase, setPhase] = React.useState<"idle" | "provisioning" | "ready" | "executing">("idle");
  const [commandInput, setCommandInput] = React.useState("");
  const [logs, setLogs] = React.useState<string[]>([]);
  const [copiedToken, setCopiedToken] = React.useState(false);
  const [sessionId, setSessionId] = React.useState("");
  const [ephemeralToken, setEphemeralToken] = React.useState("");

  React.useEffect(() => {
    if (isOpen && environment) {
      const generatedSession = `sess_${Math.random().toString(36).substring(2, 9)}`;
      const generatedToken = `envtok_live_${Math.random().toString(36).substring(2, 14)}`;
      setSessionId(generatedSession);
      setEphemeralToken(generatedToken);
      setPhase("provisioning");
      setLogs([
        `[orchestrator] Initializing isolated ${environment.specs.isolationLevel}...`,
        `[orchestrator] Allocating ${environment.specs.defaultCpu}, ${environment.specs.defaultMemory}...`,
        `[network] Setting up egress proxy with policy: ${environment.specs.networkEgress}...`,
      ]);

      const t1 = setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          `[container] Base image warm-start complete in 142ms.`,
          `[agent-rpc] Handshake established on wss://runtime.envmarket.dev/v1/sessions/${generatedSession}`,
          `[ready] Runtime environment is live and awaiting agent commands.`,
        ]);
        setPhase("ready");
      }, 900);

      return () => clearTimeout(t1);
    } else {
      setPhase("idle");
      setLogs([]);
    }
  }, [isOpen, environment]);

  if (!environment) return null;

  const handleRunCommand = () => {
    const cmd = commandInput.trim() || `agent.exec("echo 'System Ready: ${environment.name}'")`;
    setPhase("executing");
    setLogs((prev) => [...prev, `$ ${cmd}`, `[executing] Invoking sandbox isolated RPC...`]);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        `✓ [stdout] Process exited with code 0 (execution time: 38ms)`,
        `✓ [output] Memory delta: +4.2MB, syscalls: 14, network egress: 0 B`,
      ]);
      setPhase("ready");
      setCommandInput("");
    }, 500);
  };

  const copyToken = () => {
    navigator.clipboard.writeText(`ENVMARKET_SESSION_ID="${sessionId}" ENVMARKET_TOKEN="${ephemeralToken}"`);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <span>Launch Session:</span>
          <span className="text-blue-600">{environment.name}</span>
        </div>
      }
      description="Isolated runtime session simulator with real-time lifecycle provisioning, resource metering, and security logging."
      maxWidth="3xl"
    >
      <div className="space-y-4">
        {/* Status Bar */}
        <div className="flex flex-wrap items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Status:</span>
            {phase === "provisioning" ? (
              <Badge variant="warning" className="animate-pulse">
                <RotateCcw className="w-3 h-3 animate-spin" />
                Provisioning
              </Badge>
            ) : phase === "ready" || phase === "executing" ? (
              <Badge variant="success">
                <CheckCircle2 className="w-3 h-3" />
                Ready & Connected
              </Badge>
            ) : (
              <Badge variant="secondary">Idle</Badge>
            )}
          </div>

          <div className="flex items-center gap-4 text-slate-500 font-mono text-[11px]">
            <span className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              {environment.specs.defaultCpu}
            </span>
            <span className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              {environment.specs.defaultMemory}
            </span>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              {environment.specs.isolationLevel}
            </span>
          </div>
        </div>

        {/* Credentials / Ephemeral Connect String */}
        <div className="p-3 rounded-lg border border-slate-200 bg-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">Ephemeral Agent Credentials</span>
            <button
              onClick={copyToken}
              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
            >
              {copiedToken ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Env Vars</span>
                </>
              )}
            </button>
          </div>
          <div className="bg-slate-900 text-slate-200 p-2.5 rounded-lg text-xs font-mono break-all selection:bg-blue-600">
            wss://runtime.envmarket.dev/v1/sessions/{sessionId}?token={ephemeralToken}
          </div>
        </div>

        {/* Interactive Live Log Terminal */}
        <div className="rounded-lg border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-emerald-400 min-h-[180px] max-h-[260px] overflow-y-auto space-y-1">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
              <span>LIVE RUNTIME AUDIT CONSOLE</span>
            </div>
            <span>Egress: {environment.specs.networkEgress}</span>
          </div>

          {logs.map((log, i) => (
            <div key={i} className="leading-relaxed whitespace-pre-wrap">
              {log}
            </div>
          ))}
        </div>

        {/* Command Input */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Terminal className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              placeholder="e.g. agent.exec('cat /etc/os-release') or python test script"
              className="w-full pl-9 pr-3 py-2 text-xs font-mono rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRunCommand();
              }}
              disabled={phase === "provisioning" || phase === "executing"}
            />
          </div>
          <Button
            size="sm"
            onClick={handleRunCommand}
            disabled={phase === "provisioning" || phase === "executing"}
            className="gap-1.5 shrink-0"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Send Test</span>
          </Button>
        </div>

        {/* Security & Lifecycle Notice */}
        <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-800 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Architecture Notice:</strong> The execution runtime runs in a dedicated microVM isolation ring with automated lifecycle reaping, separate from the marketplace catalog. Untrusted code cannot access host filesystem.
          </p>
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-100">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Session
          </Button>
        </div>
      </div>
    </Modal>
  );
}

