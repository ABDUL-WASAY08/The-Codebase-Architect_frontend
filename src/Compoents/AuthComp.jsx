import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { 
  Code2, 
  ExternalLink, 
  File, 
  GitBranch, 
  GitBranchPlus, 
  Shield, 
  BookOpen,
  CheckCircle,
  ArrowRight,
  CreditCard,
  Server,
  Zap,
  FolderTree,
  Search,
} from 'lucide-react';
import React, { useState } from 'react';
import { auth, provider } from '../api/firebaseSetup.js';
import api from '../api/axios.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../Store/userStore.js';

function AuthComp() {
  const { login } = useUserStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGithubLogin = async () => {
    setIsLoading(true);
    try {
      const response = await signInWithPopup(auth, provider);
      const credentials = GithubAuthProvider.credentialFromResult(response);
      const token = credentials.accessToken;

      const payload = {
        gitToken: token,
        user: {
          id: response.user.uid,
          name: response.user.displayName,
          email: response.user.email,
          img: response.user.photoURL
        }
      };
      const res = await login(payload);
      if (res && res.success) {
        toast.success('Authentication successful. Redirecting...');
        navigate('/DashBoard');
      } else {
        toast.error('Authentication failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('GitHub authentication failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    const element = document.getElementById('startbtn');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: <GitBranchPlus size={20} />,
      title: "Repository Analysis",
      description: "Comprehensive analysis of Git repository structure, code quality metrics, and architectural patterns.",
      documentation: "/docs/repo-analysis",
      tags: ["Enterprise", "Real-time"]
    },
    {
      icon: <GitBranch size={20} />,
      title: "URL Integration",
      description: "Direct repository URL analysis without local cloning. Supports public and private repositories.",
      documentation: "/docs/url-analysis",
      tags: ["REST API", "Webhook"]
    },
    {
      icon: <File size={20} />,
      title: "File Indexing",
      description: "Advanced file indexing system with full-text search, dependency mapping, and impact analysis.",
      documentation: "/docs/file-indexing",
      tags: ["Search", "Analytics"]
    },
    {
      icon: <ExternalLink size={20} />,
      title: "Browser Extension",
      description: "Chrome extension for instant GitHub repository analysis directly from your browser.",
      documentation: "/docs/extension",
      tags: ["Open Source", "Free"]
    }
  ];

  const documentationSections = [
    {
      icon: <BookOpen size={24} />,
      title: "Getting Started",
      description: "Learn the basics of CodeBase Architecture and set up your first analysis.",
      articles: ["Installation Guide", "Authentication Setup", "First Repository Analysis", "Understanding Reports"],
      link: "/docs/getting-started"
    },
    {
      icon: <Server size={24} />,
      title: "API Reference",
      description: "Complete API documentation for integrating with your existing workflow.",
      articles: ["Authentication API", "Repository Endpoints", "Analysis Webhooks", "Rate Limits"],
      link: "/docs/api-reference"
    },
    {
      icon: <FolderTree size={24} />,
      title: "Guides & Tutorials",
      description: "In-depth guides for advanced features and best practices.",
      articles: ["Team Collaboration", "Custom Metrics", "CI/CD Integration", "Security Best Practices"],
      link: "/docs/guides"
    },
    {
      icon: <Zap size={24} />,
      title: "Extensions & Plugins",
      description: "Extend functionality with our official extensions and plugins.",
      articles: ["Chrome Extension", "VS Code Plugin", "GitHub Actions", "Slack Integration"],
      link: "/docs/extensions"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for individual developers",
      features: [
        "Up to 5 repositories",
        "Basic code analysis",
        "Community support",
        "7-day data retention"
      ],
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "For professional developers",
      features: [
        "Unlimited repositories",
        "Advanced code metrics",
        "Priority support",
        "30-day data retention",
        "Team collaboration (up to 5)",
        "Export reports (PDF, JSON)"
      ],
      buttonText: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "custom pricing",
      description: "For large organizations",
      features: [
        "Unlimited everything",
        "Dedicated support",
        "Custom data retention",
        "SLA guarantee",
        "SSO & SAML integration",
        "On-premise deployment"
      ],
      buttonText: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Code2 size={32} className="text-gray-900" />
              <span className="font-semibold text-xl text-gray-900">CodeBase</span>
              <span className="text-xs text-gray-500 ml-2 border border-gray-300 px-2 py-0.5 rounded">v2.0</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm">
              <a href="#documentation" className="text-gray-600 hover:text-gray-900">Documentation</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-gray-100 rounded-md px-3 py-1">
              <BookOpen size={14} className="text-gray-600" />
              <span className="text-sm text-gray-600">Documentation / Getting Started</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                Code Analysis Platform
                <br />
                <span className="text-gray-600">Enterprise Documentation</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-gray-300 pl-4">
                Professional-grade Git repository analysis solution for development teams. 
                Integrate seamlessly with your existing workflow.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-gray-900 rounded-full"></div>
                <h2 className="text-lg font-semibold text-gray-900">Quick Start Guide</h2>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold text-gray-700">1</div>
                  <div>
                    <h3 className="font-medium text-gray-900">Authentication</h3>
                    <p className="text-sm text-gray-600">Sign in with your GitHub account to start analyzing repositories.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold text-gray-700">2</div>
                  <div>
                    <h3 className="font-medium text-gray-900">Connect Repository</h3>
                    <p className="text-sm text-gray-600">Provide repository URL or connect via OAuth for private access.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold text-gray-700">3</div>
                  <div>
                    <h3 className="font-medium text-gray-900">Analyze & Review</h3>
                    <p className="text-sm text-gray-600">Get comprehensive analysis reports and actionable insights.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
              <Shield size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Enterprise Security</p>
                <p className="text-sm text-blue-700">SOC2 compliant infrastructure with end-to-end encryption for all repository data.</p>
              </div>
            </div>
          </div>

          <div className="lg:pl-8">
            <div className="sticky top-24">
              <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-xl font-semibold text-gray-900">Authentication Required</h2>
                  <p className="text-sm text-gray-600 mt-1">Sign in to access the analysis dashboard</p>
                </div>
                
                <div className="px-6 py-6 space-y-6">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-700">Access includes:</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={16} className="text-green-600" />
                        <span>Unlimited repository analysis</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={16} className="text-green-600" />
                        <span>Advanced code metrics and insights</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={16} className="text-green-600" />
                        <span>Team collaboration features</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={16} className="text-green-600" />
                        <span>Export reports (PDF, JSON, CSV)</span>
                      </div>
                    </div>
                  </div>

                  <button
                    id="startbtn"
                    onClick={handleGithubLogin}
                    disabled={isLoading}
                    className="w-full bg-gray-900 text-white rounded-md px-4 py-2.5 font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Authenticating...</span>
                      </>
                    ) : (
                      <>
                        <GitBranch size={18} />
                        <span>Sign in with GitHub</span>
                      </>
                    )}
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-white text-gray-500">Secure OAuth 2.0</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    By signing in, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="documentation" className="mt-20 scroll-mt-20">
          <div className="border-t border-gray-200 pt-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gray-100 rounded-md px-3 py-1 mb-4">
                <BookOpen size={14} className="text-gray-600" />
                <span className="text-sm text-gray-600">Documentation</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Comprehensive Documentation</h2>
              <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                Everything you need to integrate and use CodeBase Architecture effectively
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {documentationSections.map((section, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 text-gray-700">
                    {section.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">{section.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{section.description}</p>
                  <div className="space-y-2 mb-4">
                    {section.articles.slice(0, 2).map((article, articleIdx) => (
                      <div key={articleIdx} className="text-sm text-gray-600 flex items-center gap-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <span>{article}</span>
                      </div>
                    ))}
                    {section.articles.length > 2 && (
                      <div className="text-sm text-gray-500">+{section.articles.length - 2} more articles</div>
                    )}
                  </div>
                  <a href={section.link} className="text-sm text-gray-900 font-medium hover:text-gray-600 inline-flex items-center gap-1">
                    Browse documentation <ArrowRight size={14} />
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3">
                <Search size={20} className="text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search documentation..." 
                  className="flex-1 bg-transparent border-none focus:outline-none text-gray-900 placeholder-gray-400"
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 bg-white border border-gray-300 rounded text-xs text-gray-600">
                  <span>⌘</span> <span>K</span>
                </kbd>
              </div>
            </div>
          </div>
        </div>

        <div id="features" className="mt-20 scroll-mt-20">
          <div className="border-t border-gray-200 pt-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gray-100 rounded-md px-3 py-1 mb-4">
                <Zap size={14} className="text-gray-600" />
                <span className="text-sm text-gray-600">Platform Capabilities</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Core Features</h2>
              <p className="text-gray-600 mt-2">Professional tools for comprehensive code analysis</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4 text-gray-700">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {feature.tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a href={feature.documentation} className="text-sm text-gray-900 font-medium hover:text-gray-600 inline-flex items-center gap-1">
                    Read documentation <ArrowRight size={14} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="pricing" className="mt-20 scroll-mt-20">
          <div className="border-t border-gray-200 pt-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gray-100 rounded-md px-3 py-1 mb-4">
                <CreditCard size={14} className="text-gray-600" />
                <span className="text-sm text-gray-600">Pricing</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
              <p className="text-gray-600 mt-2">Choose the plan that works best for you</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, idx) => (
                <div 
                  key={idx} 
                  className={`border rounded-lg p-6 relative ${plan.popular ? 'border-gray-900 shadow-lg' : 'border-gray-200'}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full">Most Popular</span>
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      {plan.price !== "Custom" && <span className="text-gray-600">/{plan.period}</span>}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
                  </div>
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIdx) => (
                      <div key={featureIdx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button className={`w-full py-2 rounded-md font-medium transition-colors ${
                    plan.popular 
                      ? 'bg-gray-900 text-white hover:bg-gray-800' 
                      : 'border border-gray-300 text-gray-900 hover:bg-gray-50'
                  }`}>
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                All plans include core features. Need custom pricing?{" "}
                <a href="#" className="text-gray-900 font-medium hover:underline">Contact our sales team</a>
              </p>
            </div>
          </div>
        </div>

        <footer className="mt-20 border-t border-gray-200 pt-8 pb-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code2 size={24} className="text-gray-900" />
                <span className="font-semibold text-gray-900">CodeBase</span>
              </div>
              <p className="text-sm text-gray-600">Enterprise code analysis platform</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Documentation</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Getting Started</a></li>
                <li><a href="#" className="hover:text-gray-900">API Reference</a></li>
                <li><a href="#" className="hover:text-gray-900">Guides</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Support</a></li>
                <li><a href="#" className="hover:text-gray-900">Status</a></li>
                <li><a href="#" className="hover:text-gray-900">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Privacy</a></li>
                <li><a href="#" className="hover:text-gray-900">Terms</a></li>
                <li><a href="#" className="hover:text-gray-900">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            © 2026 CodeBase Architecture. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}

export default AuthComp;