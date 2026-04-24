export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg">
        <p className="text-gray-600 mb-6">
          <strong>Last Updated:</strong> April 24, 2026
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
        <p>
          Divine Pilgrim ("we", "our", or "us") is committed to protecting your privacy. 
          This Privacy Policy explains how we collect, use, and safeguard your information 
          when you use our mobile application and website.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
        <p>
          Divine Pilgrim is designed to respect your privacy. We do not collect, store, 
          or share personal information. The app provides virtual pilgrimage experiences 
          without requiring user accounts or personal data.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Local Storage</h2>
        <p>
          The app may use local storage on your device to save your preferences and 
          progress. This data remains on your device and is not transmitted to our servers.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Services</h2>
        <p>
          Our app may use third-party services for functionality such as:
        </p>
        <ul>
          <li>Google Maps API for location services</li>
          <li>Content delivery networks for images and audio</li>
        </ul>
        <p>
          These services have their own privacy policies governing their use of information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Children's Privacy</h2>
        <p>
          Our app is suitable for all ages. We do not knowingly collect personal information 
          from children or any users.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted 
          on this page with an updated revision date.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at:
          <br />
          <a href="mailto:feedback@divinepilgrim.com" className="text-purple-600 hover:underline">
            feedback@divinepilgrim.com
          </a>
        </p>
      </div>
    </div>
  );
}
