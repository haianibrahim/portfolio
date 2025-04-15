import { ExampleMultilingual } from "@/components/example-multilingual";

export default function LanguageDemoPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Language Switching Demo</h1>
        <ExampleMultilingual />
      </div>
    </div>
  );
} 