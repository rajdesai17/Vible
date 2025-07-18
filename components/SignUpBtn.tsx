"use client";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";
import { FcGoogle } from 'react-icons/fc'
import { signIn } from "next-auth/react";
import { useState } from "react";

type SignUpButtonProps = {
    onDialogOpen?: () => void;
};

export function SignUpButton({ onDialogOpen }: SignUpButtonProps) {
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleSignUp = async () => {
        try {
            setIsLoading(true);
            const result = await signIn("google", {
                redirect: false,
                callbackUrl: "/home",
            });

            if (result?.ok && result.url) {
                router.push(result.url);
            } else {
                setError('Google sign-up failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred during Google sign-up.');
        } finally {
            setIsLoading(false);
        }
    }

    const handleSignUp = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            setIsLoading(true);
            const result = await signIn('credentials', {
                email,
                password,
                action: 'signup',
                redirect: false,
                callbackUrl: '/home'
            });

            if (result?.ok && result.url) {
                router.push(result.url);
            } else {
                setError(result?.error || 'Account creation failed');
            }
        } catch (err) {
            setError('Something went wrong during sign up');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpen = () => {
        setError('');
        setEmail('');
        setPassword('');
        setName('');
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
                    Sign Up
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#FFF3EF] sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create an Account</DialogTitle>
                    <DialogDescription>
                        Sign up to get started
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={isLoading}
                        onClick={handleGoogleSignUp}
                        className="w-full flex items-center justify-center gap-2"
                    >
                        <FcGoogle className="w-5 h-5" />
                        Continue with Google
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#FFF3EF] px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <form onSubmit={handleSignUp}>
                        <div className="grid gap-4">
                            {/* <div className="grid gap-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={e => {
                                        setName(e.target.value);
                                        setError('');
                                    }}
                                    placeholder="John Doe"
                                    disabled={isLoading}
                                    required
                                />
                            </div> */}
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={e => {
                                        setEmail(e.target.value);
                                        setError('');
                                    }}
                                    placeholder="name@example.com"
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={e => {
                                        setPassword(e.target.value);
                                        setError('');
                                    }}
                                    placeholder="••••••••"
                                    disabled={isLoading}
                                    required
                                />
                            </div>

                            {error && (
                                <div className="bg-destructive/15 text-destructive px-4 py-2 rounded-md text-sm">
                                    {error}
                                </div>
                            )}

                            <Button className="w-full" type="submit" disabled={isLoading}>
                                {isLoading ? "Creating account..." : "Create account"}
                            </Button>
                        </div>
                    </form>
                </div>

                <DialogFooter className="flex flex-col items-center gap-4 sm:items-end">
                    <Button
                        variant="link"
                        onClick={() => router.push('/login')}
                        type="button"
                        disabled={isLoading}
                    >
                        Already have an account? Sign in
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
