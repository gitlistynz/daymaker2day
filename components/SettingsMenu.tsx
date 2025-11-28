import React, { useState } from 'react';
import { Settings, X, Lock, FileText, DollarSign, LogIn } from 'lucide-react';

interface SettingsMenuProps {
  onAdminClick: () => void;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({ onAdminClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'plans' | 'terms' | 'privacy' | null>(null);

  const handleMenuClick = (action: 'plans' | 'terms' | 'privacy' | 'admin') => {
    if (action === 'admin') {
      onAdminClick();
    } else {
      setActiveModal(action);
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all duration-300"
        title="Settings"
      >
        <Settings size={20} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 right-0 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden z-50 min-w-[200px] animate-in fade-in slide-in-from-top-2">
          <button
            onClick={() => handleMenuClick('plans')}
            className="w-full px-4 py-3 flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors text-left"
          >
            <DollarSign size={18} className="text-blue-400" />
            <span>Plans & Pricing</span>
          </button>
          <button
            onClick={() => handleMenuClick('terms')}
            className="w-full px-4 py-3 flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors text-left border-t border-gray-700"
          >
            <FileText size={18} className="text-green-400" />
            <span>Terms of Use</span>
          </button>
          <button
            onClick={() => handleMenuClick('privacy')}
            className="w-full px-4 py-3 flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors text-left border-t border-gray-700"
          >
            <Lock size={18} className="text-purple-400" />
            <span>Privacy Policy</span>
          </button>
          <button
            onClick={() => handleMenuClick('admin')}
            className="w-full px-4 py-3 flex items-center gap-3 text-gray-300 hover:text-white hover:bg-red-900/30 transition-colors text-left border-t border-gray-700"
          >
            <LogIn size={18} className="text-red-400" />
            <span className="font-semibold">Admin Portal</span>
          </button>
        </div>
      )}

      {/* Modals */}
      {/* Plans & Pricing Modal */}
      {activeModal === 'plans' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-700 sticky top-0 bg-gray-900">
              <h2 className="text-2xl font-bold text-white">Plans & Pricing</h2>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 hover:bg-gray-800 rounded transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Starter Plan */}
                <div className="border border-gray-700 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">Starter</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-4">$9.99<span className="text-sm text-gray-400">/mo</span></div>
                  <ul className="text-sm text-gray-400 space-y-2 mb-6 text-left">
                    <li>✓ 5 sessions/month</li>
                    <li>✓ Email support</li>
                    <li>✓ Basic booking calendar</li>
                  </ul>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">Choose Plan</button>
                </div>

                {/* Pro Plan */}
                <div className="border border-blue-500 rounded-lg p-6 text-center bg-blue-500/10 transform scale-105">
                  <div className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">POPULAR</div>
                  <h3 className="text-xl font-bold mb-2">Pro</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-4">$24.99<span className="text-sm text-gray-400">/mo</span></div>
                  <ul className="text-sm text-gray-400 space-y-2 mb-6 text-left">
                    <li>✓ Unlimited sessions</li>
                    <li>✓ Priority support</li>
                    <li>✓ Advanced analytics</li>
                    <li>✓ Gift delivery options</li>
                  </ul>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">Choose Plan</button>
                </div>

                {/* Business Plan */}
                <div className="border border-gray-700 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">Business</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-4">$99.99<span className="text-sm text-gray-400">/mo</span></div>
                  <ul className="text-sm text-gray-400 space-y-2 mb-6 text-left">
                    <li>✓ Everything in Pro</li>
                    <li>✓ Custom branding</li>
                    <li>✓ API access</li>
                    <li>✓ Dedicated manager</li>
                  </ul>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">Choose Plan</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Use Modal */}
      {activeModal === 'terms' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-700 sticky top-0 bg-gray-900">
              <h2 className="text-2xl font-bold text-white">Terms of Use</h2>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 hover:bg-gray-800 rounded transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-gray-400 text-sm leading-relaxed">
              <h3 className="text-white font-bold">1. Acceptance of Terms</h3>
              <p>By using daymaker2day, you agree to these terms and conditions. If you do not agree, please do not use our service.</p>

              <h3 className="text-white font-bold">2. User Responsibilities</h3>
              <p>Users agree to use the service lawfully and not to engage in any conduct that restricts or inhibits anyone's use or enjoyment of the service.</p>

              <h3 className="text-white font-bold">3. Booking & Cancellation</h3>
              <p>All bookings can be cancelled up to 24 hours before the scheduled time. Cancellations made within 24 hours may be subject to a fee.</p>

              <h3 className="text-white font-bold">4. Payment Terms</h3>
              <p>Payment must be made through the approved payment methods. All fees are non-refundable unless otherwise stated.</p>

              <h3 className="text-white font-bold">5. Limitation of Liability</h3>
              <p>daymaker2day is not liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.</p>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-700 sticky top-0 bg-gray-900">
              <h2 className="text-2xl font-bold text-white">Privacy Policy</h2>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 hover:bg-gray-800 rounded transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-gray-400 text-sm leading-relaxed">
              <h3 className="text-white font-bold">1. Information We Collect</h3>
              <p>We collect personal information such as name, email address, and payment information when you use our service.</p>

              <h3 className="text-white font-bold">2. How We Use Information</h3>
              <p>Your information is used to provide and improve our services, process payments, and communicate with you about your bookings.</p>

              <h3 className="text-white font-bold">3. Data Security</h3>
              <p>We implement industry-standard security measures to protect your personal data from unauthorized access, alteration, or destruction.</p>

              <h3 className="text-white font-bold">4. Third-Party Sharing</h3>
              <p>We do not share your personal information with third parties except as required by law or with your explicit consent.</p>

              <h3 className="text-white font-bold">5. Your Rights</h3>
              <p>You have the right to access, correct, or delete your personal information at any time. Contact us for assistance.</p>

              <h3 className="text-white font-bold">6. Cookies</h3>
              <p>We use cookies to enhance your experience. You can disable cookies in your browser settings at any time.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
