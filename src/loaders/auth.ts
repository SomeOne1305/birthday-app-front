import { AuthService } from "@/services";
import type { LoaderFunction } from "react-router";

export const verifyLoader: LoaderFunction<{ token: string }> = async ({
  params,
}) => {
  const result = await AuthService.verify(params.token as string);
  if (result.status !== 200) {
    throw new Response("Verification failed", { status: result.status });
  }
  
  return {};
};
