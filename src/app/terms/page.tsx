export default function TermsOfService() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

      <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="bg-gray-900 border border-gray-800 rounded p-4 mb-8">
        <p>
          <strong>TL;DR:</strong> Use Issue2Action responsibly, don&apos;t break things, and we&apos;ll provide a great service.
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-4">The Service</h2>
      <p className="mb-4">Issue2Action converts GitHub issues into structured action plans using AI.</p>
      <ul className="mb-6">
        <li>Connect your GitHub account securely</li>
        <li>Process issues from repositories</li>
        <li>Generate AI-powered action plans</li>
        <li>Save plans in your dashboard</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4">Your Responsibilities</h2>
      <ul className="mb-6">
        <li>Provide accurate signup information</li>
        <li>Keep account credentials secure</li>
        <li>Use for legitimate development purposes</li>
        <li>Don&apos;t exploit or reverse engineer the service</li>
        <li>Respect rate limits</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4">What We Provide</h2>
      <ul className="mb-6">
        <li>Reliable AI-powered issue processing</li>
        <li>Secure data handling</li>
        <li>Regular updates and improvements</li>
        <li>Technical support</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4">Intellectual Property</h2>
      <ul className="mb-6">
        <li>
          <strong>Your Content:</strong> You own your issues and generated plans
        </li>
        <li>
          <strong>Our Service:</strong> We own the Issue2Action platform
        </li>
        <li>
          <strong>AI Output:</strong> Generated plans are yours to use
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-4">Limitations</h2>
      <div className="bg-yellow-900/20 border border-yellow-700 rounded p-4 mb-4">
        <p>
          <strong>AI Disclaimer:</strong> Always review AI-generated plans before implementation.
        </p>
      </div>
      <ul className="mb-6">
        <li>Service provided &quot;as is&quot;</li>
        <li>We&apos;re not liable for decisions based on AI plans</li>
        <li>Usage limits may apply</li>
        <li>We can suspend accounts for violations</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4">Termination</h2>
      <ul className="mb-6">
        <li>
          <strong>You:</strong> Delete account anytime
        </li>
        <li>
          <strong>Us:</strong> Suspend for violations (with notice)
        </li>
        <li>
          <strong>Data:</strong> Deleted within 30 days
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-4">Contact</h2>
      <p>
        Questions? Email:{" "}
        <a href="mailto:amanjanwani1486@gmail.com" className="text-blue-400">
          amanjanwani1486@gmail.com
        </a>
      </p>

      <div className="bg-gray-900 border border-gray-800 rounded p-4 mt-8">
        <p className="text-sm text-gray-400">
          <strong>Governing Law:</strong> These terms are governed by the laws of India.
        </p>
      </div>
    </div>
  )
}
