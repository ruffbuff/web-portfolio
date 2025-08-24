"use client"

import React, { useState, useEffect } from "react"
import { GitHubContribution } from "@/lib/github"

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

interface GitHubContributionsProps {
  data?: GitHubContribution[]
}

export function GitHubContributions({ data }: GitHubContributionsProps) {
  const [contributionData, setContributionData] = useState<number[][]>([])
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  
  const currentYear = new Date().getFullYear()
  const availableYears = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4]

  useEffect(() => {
    setIsClient(true)
    
    if (data) {
      // Convert GitHub API data to grid format
      const gridData = processContributionData(data)
      setContributionData(gridData)
      setIsLoading(false)
    } else {
      // Fetch data if not provided
      fetchContributions()
    }
  }, [data, selectedYear])

  const fetchContributions = async () => {
    try {
      const response = await fetch(`/api/github/contributions?year=${selectedYear}`)
      if (response.ok) {
        const contributions = await response.json()
        const gridData = processContributionData(contributions)
        setContributionData(gridData)
      } else {
        // Fallback to mock data if API fails
        const mockData = generateMockData()
        setContributionData(mockData)
      }
    } catch (error) {
      console.error('Error fetching contributions:', error)
      // Fallback to mock data
      const mockData = generateMockData()
      setContributionData(mockData)
    } finally {
      setIsLoading(false)
    }
  }

  const processContributionData = (contributions: GitHubContribution[]): number[][] => {
    const weeks: number[][] = []
    
    // Initialize 53 weeks (standard GitHub contributions grid)
    for (let i = 0; i < 53; i++) {
      weeks.push(new Array(7).fill(0))
    }

    // Create a map for quick lookup
    const contributionMap = new Map<string, number>()
    contributions.forEach(contribution => {
      contributionMap.set(contribution.date, contribution.count)
    })

    // Start from the first Sunday of the year
    const yearStart = new Date(selectedYear, 0, 1)
    const firstSunday = new Date(yearStart)
    // Adjust to first Sunday
    const dayOfWeek = yearStart.getDay()
    if (dayOfWeek !== 0) {
      firstSunday.setDate(yearStart.getDate() - dayOfWeek)
    }

    // Fill the grid with contributions
    for (let week = 0; week < 53; week++) {
      for (let day = 0; day < 7; day++) {
        const currentDate = new Date(firstSunday)
        currentDate.setDate(firstSunday.getDate() + (week * 7) + day)
        
        const dateString = currentDate.toISOString().split('T')[0]
        const count = contributionMap.get(dateString) || 0
        
        weeks[week][day] = Math.min(count, 4) // Cap at 4 for consistent coloring
      }
    }

    return weeks
  }

  const generateMockData = (): number[][] => {
    const data: number[][] = []
    const totalWeeks = 53
    
    for (let week = 0; week < totalWeeks; week++) {
      const weekData: number[] = []
      for (let day = 0; day < 7; day++) {
        // Use deterministic pattern
        const seed = (week * 7 + day) * 123456
        const pseudo = (seed * 9301 + 49297) % 233280
        const baseActivity = (pseudo / 233280) * 4
        const weekdayBoost = day >= 1 && day <= 5 ? 1.5 : 0.8
        const monthlyVariation = Math.sin((week / totalWeeks) * Math.PI * 2) * 0.5 + 1
        
        const contributions = Math.floor(baseActivity * weekdayBoost * monthlyVariation)
        weekData.push(Math.min(contributions, 4))
      }
      data.push(weekData)
    }
    
    return data
  }
  
  const getContributionLevel = (count: number): string => {
    if (count === 0) return 'bg-muted/30'
    if (count === 1) return 'bg-primary/20'
    if (count === 2) return 'bg-primary/40'
    if (count === 3) return 'bg-primary/70'
    return 'bg-primary'
  }

  const totalContributions = contributionData.flat().reduce((sum, count) => sum + count, 0)

  if (!isClient || isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">GitHub Contributions</h3>
            <p className="text-sm text-muted-foreground">
              Loading contributions...
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-2.5 h-2.5 rounded-sm bg-muted/30"></div>
              <div className="w-2.5 h-2.5 rounded-sm bg-primary/20"></div>
              <div className="w-2.5 h-2.5 rounded-sm bg-primary/40"></div>
              <div className="w-2.5 h-2.5 rounded-sm bg-primary/70"></div>
              <div className="w-2.5 h-2.5 rounded-sm bg-primary"></div>
            </div>
            <span>More</span>
          </div>
        </div>
        
        <div className="inline-block p-4 bg-card/50 rounded-lg border border-border/40">
          <div className="h-32 flex items-center justify-center">
            <div className="text-sm text-muted-foreground">Loading GitHub activity...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">GitHub Contributions</h3>
          <p className="text-sm text-muted-foreground">
            {totalContributions} contributions in {selectedYear}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Year Selector */}
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="text-xs bg-muted border border-border rounded px-2 py-1 text-foreground"
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          
          {/* Legend */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-2.5 h-2.5 rounded-sm bg-muted/30"></div>
              <div className="w-2.5 h-2.5 rounded-sm bg-primary/20"></div>
              <div className="w-2.5 h-2.5 rounded-sm bg-primary/40"></div>
              <div className="w-2.5 h-2.5 rounded-sm bg-primary/70"></div>
              <div className="w-2.5 h-2.5 rounded-sm bg-primary"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
      
      <div className="inline-block p-4 bg-card/50 rounded-lg border border-border/40">
        <div className="grid grid-cols-[auto_1fr] gap-2">
          {/* Month labels */}
          <div></div>
          <div className="grid grid-cols-12 gap-1 text-xs text-muted-foreground mb-2">
            {MONTHS.map((month, index) => (
              <div key={index} className="text-center">
                {month}
              </div>
            ))}
          </div>
          
          {/* Day labels and contribution grid */}
          <div className="flex flex-col gap-1 text-xs text-muted-foreground pr-2">
            {DAYS.map((day, index) => (
              <div key={index} className="h-2.5 flex items-center">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-flow-col gap-1">
            {contributionData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((contributions, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-2.5 h-2.5 rounded-sm ${getContributionLevel(contributions)} transition-colors hover:ring-1 hover:ring-primary/50`}
                    title={`${contributions} contributions`}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}