"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { RotateCcw } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import { z } from "zod";

const formSchema = z.object({
	comment: z.string().min(2).max(255),
	signature: z.string(),
});

export default function Home() {
	const sigCanvas = useRef<SignatureCanvas>(null);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			comment: "",
		},
	});

	const handleCanvasChange = () => {
		if (sigCanvas.current) {
			const signature: string = sigCanvas.current
				.getTrimmedCanvas()
				.toDataURL("image/png");
			form.setValue("signature", signature);
		}
	};

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<main className="flex justify-center items-center h-full">
			<Card className="w-[600px]">
				<CardHeader className="pb-4">
					<CardTitle>Feedback Form</CardTitle>
					<CardDescription>
						We value your feedback! Please take a moment to share your thoughts with
						us.
					</CardDescription>
				</CardHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<CardContent className="space-y-3">
							<FormField
								control={form.control}
								name="comment"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Your Comment</FormLabel>
										<FormControl>
											<Textarea placeholder="Type your feedback here..." {...field} />
										</FormControl>
										<FormMessage className="form-error-message" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="signature"
								render={() => (
									<FormItem className="flex-1">
										<FormLabel>Signature Pad</FormLabel>
										<FormControl>
											<div className="relative">
												<Button
													size="icon"
													variant="ghost"
													type="button"
													className="absolute right-2 top-1 "
													onClick={() => sigCanvas.current?.clear()}
												>
													<RotateCcw size={18} />
												</Button>
												<SignatureCanvas
													ref={sigCanvas}
													canvasProps={{
														width: 545,
														height: 170,
														className: "signature-pad",
													}}
													onEnd={handleCanvasChange}
												/>
											</div>
										</FormControl>
										<FormMessage className="form-error-message" />
									</FormItem>
								)}
							/>
						</CardContent>
						<CardFooter>
							<Button type="submit">Submit</Button>
						</CardFooter>
					</form>
				</Form>
			</Card>
		</main>
	);
}
