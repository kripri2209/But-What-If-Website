'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, BarChart3, TrendingUp, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function AnalyticsDashboard() {
  // Mock data - in a real app, this would come from the database
  const decisions = [
    {
      id: '1',
      title: 'Should I change jobs?',
      date: '2024-02-20',
      riskLevel: 'high',
      assumptions: 5,
      risks: 8,
    },
    {
      id: '2',
      title: 'Launch new product feature early',
      date: '2024-02-18',
      riskLevel: 'medium',
      assumptions: 3,
      risks: 6,
    },
    {
      id: '3',
      title: 'Invest in startup opportunity',
      date: '2024-02-15',
      riskLevel: 'high',
      assumptions: 7,
      risks: 12,
    },
  ]

  const stats = [
    { label: 'Decisions Analyzed', value: '23', icon: BarChart3 },
    { label: 'Assumptions Challenged', value: '127', icon: AlertCircle },
    { label: 'Risks Identified', value: '184', icon: TrendingUp },
    { label: 'Avg. Session Time', value: '8m 34s', icon: Clock },
  ]

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-500/20 text-red-300 border-red-500/30'
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'low':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/chat">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Decision Analytics</h1>
              <p className="text-sm text-slate-400">Your decision-making history and insights</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <Card key={idx} className="bg-slate-800/50 border-slate-700 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <stat.icon className="w-6 h-6 text-orange-400 opacity-60" />
              </div>
            </Card>
          ))}
        </div>

        {/* Decisions List */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Recent Decisions</h2>
          <div className="space-y-4">
            {decisions.map((decision) => (
              <Card
                key={decision.id}
                className="bg-slate-800/50 border-slate-700 p-6 hover:border-slate-600 transition-colors cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
                      {decision.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">{decision.date}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(decision.riskLevel)}`}>
                    {decision.riskLevel.charAt(0).toUpperCase() + decision.riskLevel.slice(1)} Risk
                  </div>
                </div>
                <div className="flex gap-6 mt-4 text-sm">
                  <div>
                    <span className="text-slate-400">Assumptions: </span>
                    <span className="text-white font-semibold">{decision.assumptions}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Risks: </span>
                    <span className="text-white font-semibold">{decision.risks}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Insights Section */}
        <div className="mt-12 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-slate-700 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Decision Patterns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-3">Common Assumptions</h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• Assuming time constraints are fixed and unchangeable</li>
                <li>• Believing you have complete information for the decision</li>
                <li>• Underestimating probability of negative outcomes</li>
                <li>• Assuming past success predicts future outcomes</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Top Risk Categories</h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• Financial/resource constraints (28%)</li>
                <li>• Team capability gaps (24%)</li>
                <li>• Market/competitive changes (22%)</li>
                <li>• Execution/timing risks (18%)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 mb-6">Ready to challenge another decision?</p>
          <Link href="/chat">
            <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
              Start New Challenge
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
