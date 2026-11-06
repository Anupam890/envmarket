import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let environmentSlug = "default-environment";
  try {
    const body = await request.json();
    if (body?.environmentSlug) environmentSlug = body.environmentSlug;
  } catch (e) {
    // Optional request body
  }

  const sessionId = `sess_${Math.random().toString(36).substring(2, 10)}`;
  const ephemeralToken = `envtok_${Math.random().toString(36).substring(2, 15)}`;

  return NextResponse.json({
    sessionId,
    ephemeralToken,
    environmentSlug,
    status: "READY",
    connectUrl: `wss://runtime.envmarket.dev/v1/sessions/${sessionId}?token=${ephemeralToken}`,
    lifecycle: {
      provisionedInMs: 142,
      isolationLevel: "Firecracker MicroVM",
      egressEnforced: true,
      cpuAllocated: "2 vCPU",
      memoryAllocated: "4 GB RAM",
    },
    auditLogs: [
      `[lifecycle] Booted microVM kernel in 88ms`,
      `[egress] Enforced proxy domain whitelist`,
      `[ready] Awaiting agent WebSocket connection`,
    ],
  });
}
