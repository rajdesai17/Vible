import PromptSubmissionForm from '@/components/promptSubmissionForm';

export const metadata = {
    title: 'Submit a Prompt | Imagine',
    description: 'Share your amazing AI image prompts with the Imagine community.',
};

export default function SubmitPage() {
    return (
        <main className="min-h-screen text-white">
            {/* You can add a header or other page-specific elements here */}
            <PromptSubmissionForm />
        </main>
    );
}