"use client";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation";
import { FcGoogle } from 'react-icons/fc'
import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

type LoginButtonProps = {
    onDialogOpen?: () => void;
};

export function LoginButton({ onDialogOpen }: LoginButtonProps) {
    const router = useRouter();
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);
            const result = await signIn("google", {
                redirect: false,
                callbackUrl: "/home",
            });

            if (result?.ok && result.url) {
                const session = await getSession();
                const userDisplayName = session?.user?.name || session?.user?.email;
                toast.success(`Welcome back! ${userDisplayName}`, {
                    description: "Successfully logged in with Google",
                    duration: 3000,
                });
                router.push(result.url);
            } else {
                setError('Google sign-in failed. Please try again.');
                toast.error('Login failed', {
                    description: 'Google sign-in failed. Please try again.',
                });
            }
        } catch (err) {
            setError('An error occurred during Google sign-in.');
        } finally {
            setIsLoading(false);
        }
    }

    const handleOpen = () => {
        setError('');
        if (onDialogOpen) {
            onDialogOpen();
        } else {
            setOpen(true);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="text-white hover:-translate-y-0.5 transition duration-200"
                    onClick={handleOpen}
                >
                    Log In
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#FFF3EF] sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Welcome Back</DialogTitle>
                    <DialogDescription>
                        Sign in with your Google account to continue
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center space-y-4 py-6">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={isLoading}
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-2"
                    >
                        <FcGoogle className="w-5 h-5" />
                        Continue with Google
                    </Button>

                    {error && (
                        <div className="bg-destructive/15 text-destructive px-4 py-2 rounded-md text-sm">
                            {error}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}