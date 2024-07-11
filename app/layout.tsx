import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Aspiration",
	description:
		"Aspiration is an innovative banking and transaction management system designed to streamline and automate the process of managing financial transactions, featuring e-signature and digital signature capabilities.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					{children}
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
