import { prisma } from "@/prisma";
import { prop } from "ramda";

export const getGoogleAccountByEmail = async (email: string) =>
  prisma.account.findFirst({
    where: {
      provider: "google",
      user: { email },
    },
  });

type Account = {
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
};

export const updateAccessToken = async (
  account: Account,
  refreshed: Record<string, unknown>
): Promise<string> => {
  //prop function from ramda doesn't throw any error if 
  // its unable to find the the property from an object.
  const accessToken = prop("accessToken", refreshed) as string;
  const refreshToken =
    (prop("refreshToken", refreshed) as string) ??
    (account.refresh_token as string);
  const expiresAt = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

  await prisma.account.update({
    where: {
      provider_providerAccountId: {
        provider: "google",
        providerAccountId: account.providerAccountId,
      },
    },
    data: {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: expiresAt,
    },
  });

  return accessToken;
};
