"use client";

import { useEffect, useState } from "react";

interface PieCardProps {
  percent: number;
  color: string;
  statusText: string;
}

export default function PieCard({ percent, color, statusText }: PieCardProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setProgress(percent), 100);
    return () => clearTimeout(timeout);
  }, [percent]);

  const radius = 36;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="pie-card">
      <svg className="pie-card__svg" height={radius * 2} width={radius * 2}>
        <circle
          stroke="#eee"
          fill="none"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{
            transition: "stroke-dashoffset 0.6s ease-out",
          }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="0.35em"
          fontSize="14"
          fill="#333"
          fontWeight="600"
        >
          {percent}%
        </text>
      </svg>
      <div className="pie-card__info">
        <p className="pie-card__value">{percent}%</p>
        <span className="pie-card__status">{statusText}</span>
      </div>
    </div>
  );
}
