export default function PrivacyPolicy() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="bg-gray-900 border border-gray-800 rounded p-4 mb-8">
        <p>
          <strong>TL;DR:</strong> We collect minimal data to make Issue2Action work, don&apos;t sell anything, and respect
          your privacy.
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-4">What We Collect</h2>
      <ul className="mb-6">
        <li>GitHub repository metadata and issue content you process</li>
        <li>Your email address and GitHub username</li>
        <li>Generated action plans from your issues</li>
        <li>Basic usage analytics</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4">How We Use Your Data</h2>
      <ul className="mb-6">
        <li>Generate AI-powered action plans from GitHub issues</li>
        <li>Save plans to your dashboard</li>
        <li>Improve our AI models and features</li>
        <li>Send important product updates</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4">What We Don&apos;t Do</h2>
      <ul className="mb-6">
        <li>❌ Sell your data</li>
        <li>❌ Share with third parties</li>
        <li>❌ Use for advertising</li>
        <li>❌ Access private repos without permission</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4">Data Storage</h2>
      <p className="mb-4">Your data is stored securely using:</p>
      <ul className="mb-6">
        <li>
          <strong>Hosting:</strong> Vercel
        </li>
        <li>
          <strong>Database:</strong> Supabase (encrypted)
        </li>
        <li>
          <strong>Processing:</strong> Inngest
        </li>
        <li>
          <strong>AI:</strong> Google Gemini
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
      <ul className="mb-6">
        <li>Delete your account and data anytime</li>
        <li>Export your action plans</li>
        <li>Request data deletion</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4">Contact</h2>
      <p>
        Questions? Email:{" "}
        <a href="mailto:amanjanwani1486@gmail.com" className="text-blue-400">
          amanjanwani1486@gmail.com
        </a>
      </p>
    </div>
  )
}
