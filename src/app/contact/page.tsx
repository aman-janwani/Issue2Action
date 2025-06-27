export default function Contact() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-8">Contact</h1>

      <p className="text-lg mb-8">Need help with Issue2Action? Have feedback or questions?</p>

      <div className="bg-gray-900 border border-gray-800 rounded p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Email Support</h2>
        <p className="mb-4">For technical support, bug reports, or questions:</p>
        <p className="text-lg">
          <a href="mailto:amanjanwani1486@gmail.com" className="text-blue-400 hover:text-blue-300">
            amanjanwani1486@gmail.com
          </a>
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-4">What to Include</h2>
      <ul className="mb-8">
        <li>
          <strong>Bug Reports:</strong> Steps to reproduce, expected vs actual behavior
        </li>
        <li>
          <strong>Feature Requests:</strong> Describe the problem and proposed solution
        </li>
        <li>
          <strong>Account Issues:</strong> Include your registered email
        </li>
        <li>
          <strong>General Questions:</strong> Be specific for better answers
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-4">Response Times</h2>
      <ul className="mb-8">
        <li>
          <strong>Critical Issues:</strong> Within 24 hours
        </li>
        <li>
          <strong>General Support:</strong> 1-3 business days
        </li>
        <li>
          <strong>Feature Requests:</strong> 1 week
        </li>
      </ul>

      <div className="bg-gray-900 border border-gray-800 rounded p-6">
        <h3 className="text-lg font-semibold mb-3">About</h3>
        <p className="mb-4">
          Issue2Action is built by Aman, a developer passionate about making GitHub workflows more efficient.
        </p>
        <p className="text-sm text-gray-400">Based in India • IST Timezone</p>
        <p className="mt-4">
          <strong>Website:</strong>{" "}
          <a href="https://issue2action.nrbuilt.live" className="text-blue-400">
            issue2action.nrbuilt.live
          </a>
        </p>
      </div>
    </div>
  )
}
