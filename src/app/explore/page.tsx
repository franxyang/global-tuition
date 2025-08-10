"use client";

import { useState } from "react";
import TrendChart from "@/components/TrendChart";
import CampusToggle from "@/components/CampusToggle";
import Calculator from "@/components/Calculator";
import EquityTabs from "@/components/EquityTabs";
import KeyFindings from "@/components/KeyFindings";
import TuitionComparison from "@/components/TuitionComparison";
import CounterArguments from "@/components/CounterArguments";
import USStateMap from "@/components/USStateMap";
import Footnote from "@/components/Footnote";
import { EXPLORE } from "@/content/copy";
import trendsData from "@/data/trends.json";

export default function ExplorePage() {
  const [selectedCampus, setSelectedCampus] = useState<'us' | 'uw' | 'alt'>('us');

  const campusOptions = [
    { key: 'us' as const, label: 'U.S. Aggregate' },
    { key: 'uw' as const, label: 'UW–Madison' },
    { key: 'alt' as const, label: 'Example Flagship' }
  ];

  const prepareChartData = () => {
    const series = [];
    
    if (selectedCampus === 'us') {
      series.push({
        name: "State $ per FTE",
        data: trendsData.years.map((year, i) => ({
          year,
          value: trendsData.state_per_fte_usd[i]
        }))
      });
      series.push({
        name: "Int'l Enrollment",
        data: trendsData.years.map((year, i) => ({
          year,
          value: trendsData.intl_enrollment[i] / 1000
        }))
      });
    } else {
      series.push({
        name: "Avg Nonresident Tuition",
        data: trendsData.years.map((year, i) => ({
          year,
          value: trendsData.avg_nonresident_tuition[i]
        }))
      });
    }
    
    return series;
  };

  const equityTabs = [
    {
      id: 'intl',
      label: 'International Students',
      content: (
        <>
          {EXPLORE.equity.intl} <Footnote n={3} />
        </>
      )
    },
    {
      id: 'equity',
      label: 'Domestic Equity',
      content: (
        <>
          {EXPLORE.equity.equity} <Footnote n={7} />
        </>
      )
    },
    {
      id: 'admissions',
      label: 'Admissions Incentives',
      content: (
        <>
          {EXPLORE.equity.admissions} <Footnote n={1} />
        </>
      )
    }
  ];

  return (
    <div className="space-y-12 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          <span className="gradient-text">Explore the Data</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Interactive visualizations revealing how universities depend on international and non-resident tuition
        </p>
      </div>

      <KeyFindings />

      <USStateMap />
      
      <section className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <CampusToggle
            options={campusOptions}
            selected={selectedCampus}
            onChange={setSelectedCampus}
          />
        </div>
        
        <TrendChart series={prepareChartData()} />
      </section>

      <TuitionComparison />

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">
            <span className="gradient-text">Revenue Impact Calculator</span>
          </h2>
          <p className="text-gray-600">
            {EXPLORE.calculatorHelp}
          </p>
        </div>
        <Calculator />
      </section>

      <CounterArguments />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">
          <span className="gradient-text">Equity Perspectives</span>
        </h2>
        <EquityTabs tabs={equityTabs} />
      </section>
    </div>
  );
}