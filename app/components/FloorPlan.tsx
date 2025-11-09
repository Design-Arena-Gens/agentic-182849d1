"use client";

import React from "react";

type Dimension = {
  feet: number;
};

const FT_TO_PX = 20; // 1 ft = 20 px (scale)

function ft(n: number): number { return n * FT_TO_PX; }

export default function FloorPlan() {
  // Spec:
  // Hall: 24' (L) x 12' (W)
  // Rooms: two on top, two on bottom, each 12' x 11'
  // Stairs: from one corner of the hall
  // House height: 11.6'

  const hallLengthFt = 24;
  const hallWidthFt = 12;
  const roomLenFt = 12; // along X
  const roomWidFt = 11; // along Y (outward from hall)

  const totalWidthFt = hallLengthFt; // 24
  const totalHeightFt = roomWidFt + hallWidthFt + roomWidFt; // 11 + 12 + 11 = 34

  const svgWidth = ft(totalWidthFt);
  const svgHeight = ft(totalHeightFt);

  // Hall rectangle positioned between rooms vertically
  const hallX = 0;
  const hallY = ft(roomWidFt);

  // Partition between two rooms on each side at 12'
  const partitionX = ft(12);

  // Stairs: 6' x 6' block at hall top-left corner
  const stairSizeFt = 6;
  const stairX = hallX + ft(0.5); // slight inset for wall thickness visual
  const stairY = hallY + ft(0.5);

  // Helpers for dimension lines
  const dimOffset = 24; // px outside the plan
  const arrow = 6; // px

  return (
    <div style={{
      display: "grid",
      placeItems: "center",
      padding: 24,
      gap: 16
    }}>
      <div style={{textAlign: "center"}}>
        <h1>??????? ????? ?????</h1>
        <div style={{opacity: 0.8}}>
          ?????: 1 ??? = {FT_TO_PX} ??????? ? ?? ?? ?????: 11.6'
        </div>
      </div>

      <div style={{
        overflow: "auto",
        background: "#fff",
        padding: 16,
        borderRadius: 12,
        boxShadow: "0 4px 24px rgba(2,6,23,0.08)",
        border: "1px solid #e2e8f0"
      }}>
        <svg
          width={svgWidth + 120}
          height={svgHeight + 120}
          viewBox={`${-60} ${-60} ${svgWidth + 120} ${svgHeight + 120}`}
        >
          {/* Outer boundary (overall 24' x 34') */}
          <rect x={0} y={0} width={svgWidth} height={svgHeight} fill="#f8fafc" stroke="#0f172a" strokeWidth={2} />

          {/* Hall */}
          <rect x={hallX} y={hallY} width={ft(hallLengthFt)} height={ft(hallWidthFt)} fill="#e0f2fe" stroke="#0369a1" strokeWidth={2} />
          <text x={hallX + ft(hallLengthFt/2)} y={hallY + ft(hallWidthFt/2)} textAnchor="middle" dominantBaseline="middle" fontSize={14} fill="#0f172a">
            ??? 24' x 12'
          </text>

          {/* Top rooms (two rooms of 12' x 11') */}
          {/* Top-left room */}
          <rect x={0} y={0} width={ft(roomLenFt)} height={ft(roomWidFt)} fill="#fef3c7" stroke="#92400e" strokeWidth={2} />
          {/* Top-right room */}
          <rect x={ft(roomLenFt)} y={0} width={ft(roomLenFt)} height={ft(roomWidFt)} fill="#fef3c7" stroke="#92400e" strokeWidth={2} />

          {/* Bottom rooms (two rooms of 12' x 11') */}
          {/* Bottom-left room */}
          <rect x={0} y={ft(roomWidFt + hallWidthFt)} width={ft(roomLenFt)} height={ft(roomWidFt)} fill="#fef3c7" stroke="#92400e" strokeWidth={2} />
          {/* Bottom-right room */}
          <rect x={ft(roomLenFt)} y={ft(roomWidFt + hallWidthFt)} width={ft(roomLenFt)} height={ft(roomWidFt)} fill="#fef3c7" stroke="#92400e" strokeWidth={2} />

          {/* Vertical partitions at 12' */}
          <line x1={partitionX} y1={0} x2={partitionX} y2={svgHeight} stroke="#0f172a" strokeWidth={1.5} strokeDasharray="6 6" />

          {/* Room labels */}
          <text x={ft(6)} y={ft(5.5)} textAnchor="middle" fontSize={13} fill="#1f2937">???? 12' x 11'</text>
          <text x={ft(18)} y={ft(5.5)} textAnchor="middle" fontSize={13} fill="#1f2937">???? 12' x 11'</text>
          <text x={ft(6)} y={ft(34 - 5.5)} textAnchor="middle" fontSize={13} fill="#1f2937">???? 12' x 11'</text>
          <text x={ft(18)} y={ft(34 - 5.5)} textAnchor="middle" fontSize={13} fill="#1f2937">???? 12' x 11'</text>

          {/* Stairs block in hall's top-left corner */}
          <rect x={stairX} y={stairY} width={ft(stairSizeFt)} height={ft(stairSizeFt)} fill="#e2e8f0" stroke="#334155" strokeWidth={1.5} />
          {/* simple stair treads */}
          {Array.from({ length: 6 }).map((_, i) => (
            <line
              key={i}
              x1={stairX + ft(0.5)}
              y1={stairY + ft(0.5 + i * (stairSizeFt / 6))}
              x2={stairX + ft(stairSizeFt - 0.5)}
              y2={stairY + ft(0.5 + i * (stairSizeFt / 6))}
              stroke="#475569"
              strokeWidth={1}
            />
          ))}
          <text x={stairX + ft(stairSizeFt/2)} y={stairY + ft(stairSizeFt/2)} textAnchor="middle" dominantBaseline="middle" fontSize={12} fill="#0f172a">????????</text>

          {/* Dimension lines - overall width (24') */}
          <line x1={0} y1={svgHeight + dimOffset} x2={svgWidth} y2={svgHeight + dimOffset} stroke="#0f172a" strokeWidth={1} />
          {/* arrows */}
          <polyline points={`${0},${svgHeight + dimOffset} ${arrow},${svgHeight + dimOffset - arrow} ${arrow},${svgHeight + dimOffset + arrow}`} fill="#0f172a" />
          <polyline points={`${svgWidth},${svgHeight + dimOffset} ${svgWidth - arrow},${svgHeight + dimOffset - arrow} ${svgWidth - arrow},${svgHeight + dimOffset + arrow}`} fill="#0f172a" />
          <text x={svgWidth/2} y={svgHeight + dimOffset - 10} textAnchor="middle" fontSize={13} fill="#0f172a">?????? 24'</text>

          {/* Dimension lines - overall height (34') */}
          <line x1={svgWidth + dimOffset} y1={0} x2={svgWidth + dimOffset} y2={svgHeight} stroke="#0f172a" strokeWidth={1} />
          <polyline points={`${svgWidth + dimOffset},${0} ${svgWidth + dimOffset - arrow},${arrow} ${svgWidth + dimOffset + arrow},${arrow}`} fill="#0f172a" />
          <polyline points={`${svgWidth + dimOffset},${svgHeight} ${svgWidth + dimOffset - arrow},${svgHeight - arrow} ${svgWidth + dimOffset + arrow},${svgHeight - arrow}`} fill="#0f172a" />
          <text x={svgWidth + dimOffset + 10} y={svgHeight/2} writingMode="tb" fontSize={13} fill="#0f172a">????? 34'</text>

          {/* Hall height label 12' */}
          <line x1={-dimOffset} y1={hallY} x2={-dimOffset} y2={hallY + ft(hallWidthFt)} stroke="#0f172a" strokeWidth={1} />
          <polyline points={`${-dimOffset},${hallY} ${-dimOffset - arrow},${hallY + arrow} ${-dimOffset + arrow},${hallY + arrow}`} fill="#0f172a" />
          <polyline points={`${-dimOffset},${hallY + ft(hallWidthFt)} ${-dimOffset - arrow},${hallY + ft(hallWidthFt) - arrow} ${-dimOffset + arrow},${hallY + ft(hallWidthFt) - arrow}`} fill="#0f172a" />
          <text x={-dimOffset - 16} y={hallY + ft(hallWidthFt/2)} writingMode="tb" fontSize={12} fill="#0f172a">??? 12'</text>

          {/* Notes */}
          <text x={0} y={-24} fontSize={12} fill="#334155">???: ??? ??? ???, ???/???? 12' x 11' ?? ??-?? ????</text>
        </svg>
      </div>

      <div style={{display: "flex", gap: 12, alignItems: "center", justifyContent: "center"}}>
        <DownloadButton />
      </div>
    </div>
  );
}

function DownloadButton() {
  const onClick = () => {
    const svg = document.querySelector("svg");
    if (!svg) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ground-floor-plan.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={onClick} style={{
      padding: "10px 14px",
      borderRadius: 8,
      border: "1px solid #cbd5e1",
      background: "#0ea5e9",
      color: "white",
      cursor: "pointer",
      fontWeight: 600
    }}>
      SVG ??????? ????
    </button>
  );
}
