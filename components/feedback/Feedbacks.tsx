"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { axiosInstance } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export type AuthorType = {
	full_name: string;
};

export type FeedbackType = {
	author: AuthorType;
	comment: string;
};

export default function Feedbacks() {
	const { data } = useQuery({
		queryKey: ["feedback"],
		queryFn: async () => {
			try {
				const response = await axiosInstance.get("feedbacks/");
				return response.data.data as FeedbackType[];
			} catch (error) {
				throw new Error(`Error fetching feedbacks: ${error}`);
			}
		},
	});

	return (
		<Card className="w-[600px] h-[510px]">
			<CardHeader>
				<CardTitle>Feedbacks</CardTitle>
				<CardDescription>
					Share your thoughts with us! Explore feedback from our valued customers,
					helping us improve and serve you better.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-3 max-h-[368px] overflow-y-auto">
				{data?.map(({ author: { full_name }, comment }, index) => (
					<div
						key={index}
						className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
					>
						<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
						<div className="space-y-1">
							<p className="text-sm font-medium leading-none">{full_name}</p>
							<p className="text-sm text-muted-foreground">{comment}</p>
						</div>
					</div>
				))}
			</CardContent>
			<CardFooter></CardFooter>
		</Card>
	);
}
