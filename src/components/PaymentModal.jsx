import React from 'react';
import { X, CreditCard, Lock } from 'lucide-react';

const PaymentModal = ({ stateCode, stateName, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg w-full max-w-md animate-slide-up">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-semibold">Purchase State Guide</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-bg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Product Info */}
          <div className="text-center mb-6">
            <div className="p-4 bg-primary/10 rounded-lg mb-4">
              <CreditCard className="w-12 h-12 text-primary mx-auto" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{stateName} Rights Guide</h3>
            <p className="text-textSecondary text-sm mb-4">
              Complete legal information and scripts for police interactions in {stateName}.
            </p>
            <div className="text-3xl font-bold text-primary">$2.99</div>
            <div className="text-sm text-textSecondary">One-time purchase</div>
          </div>

          {/* Features */}
          <div className="bg-bg rounded-lg p-4 mb-6">
            <h4 className="font-medium mb-3">What's included:</h4>
            <ul className="space-y-2 text-sm text-textSecondary">
              <li>• State-specific rights and laws</li>
              <li>• Actionable scripts in English & Spanish</li>
              <li>• Emergency contact information</li>
              <li>• Lifetime access and updates</li>
            </ul>
          </div>

          {/* Security Notice */}
          <div className="flex items-center space-x-2 text-sm text-textSecondary mb-6">
            <Lock className="w-4 h-4" />
            <span>Secure payment processing via wallet connection</span>
          </div>

          {/* Payment in progress message */}
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-textSecondary">Processing payment...</p>
            <p className="text-sm text-textSecondary mt-2">
              Please complete the transaction in your wallet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;