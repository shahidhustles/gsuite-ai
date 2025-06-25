import { prisma } from "@/prisma";
import { Account } from "next-auth";

export const getGoogleAccountByEmail = async (email: string) =>
  prisma.account.findFirst({
    where: {
      provider: "google",
      user: { email },
    },
  });

export const updateAccessToken = async (
  account: Account,
  refreshed: Record<string, unknown>
): Promise<string> => {
    
};
