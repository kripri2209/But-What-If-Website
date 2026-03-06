'use client'

import { Button } from '@/components/ui/button'
import { AlertCircle, Zap, TrendingDown, Eye, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function LandingPage() {
  const features = [
    {
      icon: AlertCircle,
      title: 'Challenge Assumptions',
      description: 'Identify hidden beliefs and biases that drive your decisions.',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
    {
      icon: Zap,
      title: 'Counterarguments',
      description: 'Explore powerful opposing viewpoints you might have missed.',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      icon: TrendingDown,
      title: 'Risk Analysis',
      description: 'Discover worst-case scenarios and hidden failure modes.',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      icon: Eye,
      title: 'See Complexity',
      description: 'Understand trade-offs and ripple effects you might overlook.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white font-[family-name:var(--font-playfair)]">Devils Advocate</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/analytics">
              <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                Analytics
              </Button>
            </Link>
            <Link href="/chat">
              <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                Start Debating
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-[family-name:var(--font-playfair)]">
              Make better decisions by questioning everything
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Devils Advocate is an AI that challenges your assumptions, explores worst-case scenarios, and reveals the hidden complexity of your choices. Stop making decisions in a vacuum.
            </p>
            <div className="flex gap-4">
              <Link href="/chat">
                <Button size="lg" className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                  Try Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-slate-800 border border-slate-700 rounded-3xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <AlertCircle className="w-16 h-16 text-orange-400 mx-auto mb-4 animate-pulse" />
                <p className="text-slate-300">Share your decision</p>
                <p className="text-slate-400 text-sm mt-2">And let me challenge it ruthlessly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-xl text-slate-400">
            Devils Advocate analyzes your decision through multiple lenses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group relative bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-slate-600 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-slate-700 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-white mb-8">The Pipeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2">
            {[
              { num: '1', label: 'Parse', desc: 'Extract your decision' },
              { num: '2', label: 'Assumptions', desc: 'Identify hidden beliefs' },
              { num: '3', label: 'Challenge', desc: 'Generate counterarguments' },
              { num: '4', label: 'Risks', desc: 'Analyze failure modes' },
              { num: '5', label: 'Synthesis', desc: 'Comprehensive challenge' },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white font-bold mb-2">
                  {step.num}
                </div>
                <p className="text-sm font-semibold text-white text-center">{step.label}</p>
                <p className="text-xs text-slate-400 text-center mt-1">{step.desc}</p>
                {idx < 4 && <div className="h-8 w-0.5 bg-slate-600 mt-2 hidden md:block"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Stop Making Decisions in the Dark</h2>
        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
          Get a ruthless second opinion that challenges your thinking and reveals what you're missing.
        </p>
        <Link href="/chat">
          <Button size="lg" className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
            Start Your First Challenge <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-slate-400">
          <p className="text-sm">Devils Advocate - Making you a better decision maker</p>
          <p className="text-xs text-slate-500 mt-2">AI-powered decision intelligence © 2026</p>
        </div>
      </footer>
    </div>
  )
}
