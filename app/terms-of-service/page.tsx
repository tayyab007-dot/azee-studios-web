import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Azee Studios",
  description: "Terms of Service for Azee Studios.",
};

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-32 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-invert max-w-none text-muted-foreground">
        <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Agreement to Terms</h2>
        <p className="mb-4">
          By accessing our website and utilizing our digital agency services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Use License</h2>
        <p className="mb-4">
          Permission is granted to temporarily download one copy of the materials (information or software) on Azee Studios' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>modify or copy the materials;</li>
          <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
          <li>attempt to decompile or reverse engineer any software contained on Azee Studios' website;</li>
          <li>remove any copyright or other proprietary notations from the materials; or</li>
          <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Disclaimer</h2>
        <p className="mb-4">
          The materials on Azee Studios' website are provided on an 'as is' basis. Azee Studios makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Limitations</h2>
        <p className="mb-4">
          In no event shall Azee Studios or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Azee Studios' website, even if Azee Studios or a Azee Studios authorized representative has been notified orally or in writing of the possibility of such damage.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Revisions and Errata</h2>
        <p className="mb-4">
          The materials appearing on Azee Studios' website could include technical, typographical, or photographic errors. Azee Studios does not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the materials contained on its website at any time without notice.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Governing Law</h2>
        <p className="mb-4">
          These terms and conditions are governed by and construed in accordance with international laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
        </p>
      </div>
    </div>
  );
}
