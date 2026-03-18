import { Link } from 'react-router-dom';
import { Pill, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#1E88E5] p-2 rounded-lg">
                <Pill className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-[#2C3E50]">PharmaCare</span>
            </div>
            <p className="text-[#64748B] text-sm leading-relaxed">
              Your trusted medicine reminder and prescription storage system.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[#2C3E50] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[#64748B] text-sm hover:text-[#1E88E5] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#features" className="text-[#64748B] text-sm hover:text-[#1E88E5] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <Link to="/login" className="text-[#64748B] text-sm hover:text-[#1E88E5] transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-[#64748B] text-sm hover:text-[#1E88E5] transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-[#2C3E50] mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#64748B] text-sm hover:text-[#1E88E5] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[#64748B] text-sm hover:text-[#1E88E5] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-[#64748B] text-sm hover:text-[#1E88E5] transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[#2C3E50] mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-[#64748B] text-sm">
                <Mail className="w-4 h-4 text-[#1E88E5]" />
                <span>support@pharmacare.com</span>
              </li>
              <li className="flex items-center gap-2 text-[#64748B] text-sm">
                <Phone className="w-4 h-4 text-[#1E88E5]" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-[#64748B] text-sm">
                <MapPin className="w-4 h-4 text-[#1E88E5]" />
                <span>Healthcare District</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-[#64748B] text-sm">
            © 2026 PharmaCare. Academic Project - Software Engineering & Project Management (SEPM)
          </p>
        </div>
      </div>
    </footer>
  );
}
