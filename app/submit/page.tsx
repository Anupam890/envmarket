"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  PlusCircle,
  Terminal,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  Code2,
  CheckCircle2,
  Info,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/ui/aceternity/ShimmerButton";
import { BackgroundGrid } from "@/components/ui/aceternity/BackgroundGrid";
import { CATEGORIES } from "@/lib/data/categories";
import { useMarketplaceStore } from "@/lib/store/useMarketplaceStore";
import { CategorySlug, DeploymentType, PricingModel, AgentFramework } from "@/lib/types";
import { toast } from "sonner";

// Zod Schema for Structured Submission
const submissionSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  shortDescription: z.string().min(15, "Short description must be at least 15 characters").max(180, "Must be under 180 characters"),
  fullDescription: z.string().min(40, "Full description must be at least 40 characters"),
  providerName: z.string().min(2, "Provider name is required"),
  providerWebsite: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  docsUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  categorySlug: z.string().min(1, "Please choose a category"),
  deploymentType: z.enum(["Managed Cloud", "Self-Hosted Docker", "MicroVM Sandbox", "Serverless Sandbox", "Local Daemon", "WASM Enclave"]),
  pricing: z.enum(["Free", "Open Source", "Freemium", "Usage-based", "Commercial"]),
  isOpenSource: z.boolean(),
  defaultCpu: z.string().min(1, "CPU required"),
  defaultMemory: z.string().min(1, "Memory required"),
  defaultDisk: z.string().min(1, "Disk required"),
  maxTimeoutMinutes: z.coerce.number().min(5).max(1440),
  isolationLevel: z.enum(["gVisor Sandbox", "Firecracker MicroVM", "Docker Container", "WebAssembly", "Baremetal Virtualization"]),
  networkEgress: z.enum(["Full", "Restricted (Domain Whitelist)", "Air-gapped", "Configurable"]),
  supportsMcp: z.boolean(),
  mcpDetails: z.string().optional(),
  pythonSnippet: z.string().min(10, "Python snippet is required"),
  cliSnippet: z.string().optional(),
});

type FormValues = z.infer<typeof submissionSchema>;

export default function SubmitEnvironmentPage() {
  const router = useRouter();
  const { submitEnvironment } = useMarketplaceStore();

  const [selectedFrameworks, setSelectedFrameworks] = React.useState<AgentFramework[]>([
    "LangGraph",
    "OpenAI Agents SDK",
  ]);
  const [capabilitiesInput, setCapabilitiesInput] = React.useState("Isolated MicroVM, Auto-reaper, Fast cold start");
  const [runtimesInput, setRuntimesInput] = React.useState("Python 3.11, Debian 12, Bash 5.2");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(submissionSchema) as any,
    defaultValues: {
      name: "",
      slug: "",
      shortDescription: "",
      fullDescription: "",
      providerName: "",
      providerWebsite: "",
      githubUrl: "",
      docsUrl: "",
      categorySlug: "terminal-environments",
      deploymentType: "MicroVM Sandbox",
      pricing: "Freemium",
      isOpenSource: true,
      defaultCpu: "2 vCPU",
      defaultMemory: "4 GB RAM",
      defaultDisk: "10 GB NVMe",
      maxTimeoutMinutes: 60,
      isolationLevel: "Firecracker MicroVM",
      networkEgress: "Restricted (Domain Whitelist)",
      supportsMcp: false,
      mcpDetails: "Exposes Model Context Protocol tool definitions for safe command execution.",
      pythonSnippet: `from my_sandbox import Sandbox\n\nwith Sandbox.create() as sb:\n    result = sb.run_code("print('Hello from Agent!')")\n    print(result.output)`,
      cliSnippet: `envmarket run my-custom-sandbox`,
    },
  });

  const watchName = watch("name");

  // Auto-generate slug from name
  React.useEffect(() => {
    if (watchName) {
      const generated = watchName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", generated, { shouldValidate: true });
    }
  }, [watchName, setValue]);

  const toggleFramework = (fw: AgentFramework) => {
    setSelectedFrameworks((prev) =>
      prev.includes(fw) ? prev.filter((f) => f !== fw) : [...prev, fw]
    );
  };

  const onSubmit = (data: FormValues) => {
    const caps = capabilitiesInput.split(",").map((c) => c.trim()).filter(Boolean);
    const runs = runtimesInput.split(",").map((r) => r.trim()).filter(Boolean);

    const created = submitEnvironment({
      name: data.name,
      slug: data.slug,
      shortDescription: data.shortDescription,
      fullDescription: data.fullDescription,
      providerName: data.providerName,
      providerWebsite: data.providerWebsite || undefined,
      categorySlug: data.categorySlug as CategorySlug,
      deploymentType: data.deploymentType as DeploymentType,
      pricing: data.pricing as PricingModel,
      isOpenSource: data.isOpenSource,
      githubUrl: data.githubUrl || undefined,
      docsUrl: data.docsUrl || undefined,
      runtimes: runs.length ? runs : ["Python 3.11", "Linux"],
      supportedFrameworks: selectedFrameworks.length ? selectedFrameworks : ["LangGraph"],
      capabilities: caps.length ? caps : ["Isolated process", "Ephemeral filesystem"],
      supportsMcp: data.supportsMcp,
      mcpDetails: data.supportsMcp ? data.mcpDetails : undefined,
      specs: {
        defaultCpu: data.defaultCpu,
        defaultMemory: data.defaultMemory,
        defaultDisk: data.defaultDisk,
        maxTimeoutMinutes: data.maxTimeoutMinutes,
        gpuAvailable: false,
        isolationLevel: data.isolationLevel,
        networkEgress: data.networkEgress,
      },
      configTemplates: {
        python: data.pythonSnippet,
        cli: data.cliSnippet,
      },
    });

    toast.success(`Environment "${created.name}" submitted successfully! It is now pending verification.`);
    router.push("/developer/manage");
  };

  return (
    <div className="w-full pb-20">
      {/* Header Banner */}
      <BackgroundGrid variant="grid" className="border-b border-slate-200 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-200">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Developer Publishing Portal</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Publish an AI Agent Environment
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Register your execution sandbox, cloud browser node, or ephemeral runtime in the global EnvMarket registry.
          </p>
        </div>
      </BackgroundGrid>

      {/* Main Submission Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-8">
          {/* Section 1: Basic Information */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">1. Basic Information</h2>
              <p className="text-xs text-slate-500">Identity, naming, and provider details</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Environment Name *
                </label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="e.g. Firecracker Python Sandbox"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {errors.name && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Unique Slug (URL identifier) *
                </label>
                <input
                  type="text"
                  {...register("slug")}
                  placeholder="e.g. firecracker-python-sandbox"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-slate-50 font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {errors.slug && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.slug.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Short Description (Listing card summary) *
              </label>
              <input
                type="text"
                {...register("shortDescription")}
                placeholder="High-speed microVM sandbox for untrusted Python code execution in <150ms."
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.shortDescription && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.shortDescription.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Description & Architecture *
              </label>
              <textarea
                rows={4}
                {...register("fullDescription")}
                placeholder="Describe container lifecycle, syscall restrictions, filesystem isolation, network policies, and ideal agent use cases..."
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
              />
              {errors.fullDescription && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.fullDescription.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Publisher / Provider Name *
                </label>
                <input
                  type="text"
                  {...register("providerName")}
                  placeholder="e.g. Acme Sandbox Labs"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {errors.providerName && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.providerName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Publisher Website
                </label>
                <input
                  type="url"
                  {...register("providerWebsite")}
                  placeholder="https://acme.dev"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category *
                </label>
                <select
                  {...register("categorySlug")}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  GitHub Repository URL
                </label>
                <input
                  type="url"
                  {...register("githubUrl")}
                  placeholder="https://github.com/org/repo"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Official Documentation URL
                </label>
                <input
                  type="url"
                  {...register("docsUrl")}
                  placeholder="https://docs.acme.dev"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Technical Specifications & Isolation */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">2. Technical Specs & Security Isolation</h2>
              <p className="text-xs text-slate-500">Resource quotas, virtualization ring, and network boundaries</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Deployment Type *
                </label>
                <select
                  {...register("deploymentType")}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="MicroVM Sandbox">MicroVM Sandbox</option>
                  <option value="Managed Cloud">Managed Cloud</option>
                  <option value="Self-Hosted Docker">Self-Hosted Docker</option>
                  <option value="Serverless Sandbox">Serverless Sandbox</option>
                  <option value="Local Daemon">Local Daemon</option>
                  <option value="WASM Enclave">WASM Enclave</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Isolation Level *
                </label>
                <select
                  {...register("isolationLevel")}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Firecracker MicroVM">Firecracker MicroVM</option>
                  <option value="gVisor Sandbox">gVisor Sandbox</option>
                  <option value="Docker Container">Docker Container</option>
                  <option value="WebAssembly">WebAssembly</option>
                  <option value="Baremetal Virtualization">Baremetal Virtualization</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Network Egress Policy *
                </label>
                <select
                  {...register("networkEgress")}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Restricted (Domain Whitelist)">Restricted (Domain Whitelist)</option>
                  <option value="Full">Full Egress</option>
                  <option value="Air-gapped">Air-gapped (No Outbound)</option>
                  <option value="Configurable">Configurable by Agent</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Default CPU</label>
                <input
                  type="text"
                  {...register("defaultCpu")}
                  placeholder="2 vCPU"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Default RAM</label>
                <input
                  type="text"
                  {...register("defaultMemory")}
                  placeholder="4 GB RAM"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Default Disk</label>
                <input
                  type="text"
                  {...register("defaultDisk")}
                  placeholder="10 GB SSD"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Max Timeout (mins)</label>
                <input
                  type="number"
                  {...register("maxTimeoutMinutes")}
                  placeholder="60"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Capabilities Tags (comma separated)
              </label>
              <input
                type="text"
                value={capabilitiesInput}
                onChange={(e) => setCapabilitiesInput(e.target.value)}
                placeholder="MicroVM isolation, Auto-reaper, In-memory scratchpad, Stealth CDP"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Included Runtimes (comma separated)
              </label>
              <input
                type="text"
                value={runtimesInput}
                onChange={(e) => setRuntimesInput(e.target.value)}
                placeholder="Python 3.11, Node.js 20, Alpine 3.20"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Section 3: Frameworks & Protocols */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">3. Supported Agent Frameworks & MCP</h2>
              <p className="text-xs text-slate-500">Compatibility badges and protocol adherence</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Supported Frameworks (Select all that apply)
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {(
                  [
                    "LangGraph",
                    "OpenAI Agents SDK",
                    "CrewAI",
                    "AutoGen",
                    "LlamaIndex",
                    "Claude Code / Anthropic",
                    "Smolagents",
                  ] as AgentFramework[]
                ).map((fw) => {
                  const selected = selectedFrameworks.includes(fw);
                  return (
                    <button
                      type="button"
                      key={fw}
                      onClick={() => toggleFramework(fw)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                        selected
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {fw}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MCP Toggle */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <label className="flex items-center gap-2.5 text-xs text-slate-800 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  {...register("supportsMcp")}
                  className="rounded text-blue-600 focus:ring-blue-600 w-4 h-4 border-slate-300"
                />
                <span>Provides native Model Context Protocol (MCP) server</span>
              </label>

              {watch("supportsMcp") && (
                <div className="pl-6 pt-1">
                  <input
                    type="text"
                    {...register("mcpDetails")}
                    placeholder="Describe tools exposed via MCP (e.g. exec_command, read_file, eval_browser)"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Section 4: Configuration & Code Snippets */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">4. Configuration Snippets</h2>
              <p className="text-xs text-slate-500">How developers import and instantiate this environment in code</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Python Code Snippet *
              </label>
              <textarea
                rows={4}
                {...register("pythonSnippet")}
                className="w-full text-xs font-mono p-2.5 rounded-lg border border-slate-200 bg-slate-950 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.pythonSnippet && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.pythonSnippet.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                CLI Command (Optional)
              </label>
              <input
                type="text"
                {...register("cliSnippet")}
                placeholder="docker run -d -p 8080:8080 my-agent-box"
                className="w-full text-xs font-mono p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Section 5: Pricing & Licensing */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">5. Pricing & License</h2>
              <p className="text-xs text-slate-500">Commercial or open source licensing terms</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pricing Model *</label>
                <select
                  {...register("pricing")}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Open Source">Open Source (Free)</option>
                  <option value="Freemium">Freemium (Free tier + paid credits)</option>
                  <option value="Usage-based">Usage-based (Per compute second)</option>
                  <option value="Free">Free</option>
                  <option value="Commercial">Commercial / Enterprise</option>
                </select>
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2.5 text-xs text-slate-800 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("isOpenSource")}
                    className="rounded text-blue-600 focus:ring-blue-600 w-4 h-4 border-slate-300"
                  />
                  <span>Open Source (Apache 2.0 / MIT / BSD)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Info className="w-4 h-4 text-blue-600" />
              <span>Submissions are screened for sandbox security boundaries before public listing.</span>
            </div>

            <ShimmerButton
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 font-semibold text-sm gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit for Verification</span>
            </ShimmerButton>
          </div>
        </form>
      </div>
    </div>
  );
}
