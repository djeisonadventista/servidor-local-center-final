"use client";

import { ApolloProvider } from "@apollo/client/react";
import client from "@/services/apollo";

type ProvidersProps = {
  children: React.ReactNode;
};

export function ApollolClientProvider({ children }: ProvidersProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
