'use client';

import { useState } from 'react';
import type { LeaseAnalysisResult } from '@/types';
import { getRiskLevel, RISK_LEVEL_CONFIG, FLAG_CONFIG, countFlags } from '@/lib/utils';

type Props = {
  result: LeaseAnalysisResult;
  fileName: string;
};

export default function ReportDownloadButton({ result, fileName }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      const pageW = 210;
      const pageH = 297;
      const margin = 20;
      const contentW = pageW - margin * 2;
      let y = margin;

      const level = getRiskLevel(result.riskScore);
      const cfg = RISK_LEVEL_CONFIG[level];
      const counts = countFlags(result.flags);

      // Helper: add page if needed
      const checkPage = (needed: number) => {
        if (y + needed > pageH - margin) {
          doc.addPage();
          y = margin;
        }
      };

      // ── Header ──────────────────────────────────────────────────
      doc.setFillColor(26, 24, 20);
      doc.rect(0, 0, pageW, 18, 'F');
      doc.setTextColor(250, 249, 247);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('REVEALR', margin, 12);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text('Lease Intelligence Platform', margin + 38, 12);

      y = 26;

      // ── Title ────────────────────────────────────────────────────
      doc.setTextColor(26, 24, 20);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('Contract Analysis Report', margin, y);
      y += 8;

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(107, 101, 96);
      doc.text(`File: ${fileName}`, margin, y);
      y += 4;
      doc.text(`Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, margin, y);
      y += 10;

      // ── Risk Score ───────────────────────────────────────────────
      doc.setFillColor(250, 249, 247);
      doc.roundedRect(margin, y, contentW, 28, 3, 3, 'F');
      doc.setDrawColor(232, 228, 223);
      doc.roundedRect(margin, y, contentW, 28, 3, 3, 'S');

      // Score
      doc.setFontSize(28);
      doc.setFont('helvetica', 'bold');
      const [r, g, b] = hexToRgb(cfg.color);
      doc.setTextColor(r, g, b);
      doc.text(String(result.riskScore), margin + 6, y + 18);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(156, 149, 144);
      doc.text('/100', margin + 6 + doc.getTextWidth(String(result.riskScore)) + 1, y + 18);

      // Level label
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(r, g, b);
      doc.text(cfg.label, margin + 45, y + 12);

      // Counts
      const countX = pageW - margin - 60;
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(220, 38, 38);
      doc.text(`${counts.critical} Critical`, countX, y + 10);
      doc.setTextColor(217, 119, 6);
      doc.text(`${counts.warning} Warnings`, countX, y + 17);
      doc.setTextColor(37, 99, 235);
      doc.text(`${counts.info} Info`, countX, y + 24);

      y += 36;

      // Summary
      doc.setTextColor(26, 24, 20);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      const summaryLines = doc.splitTextToSize(result.summary, contentW);
      doc.text(summaryLines, margin, y);
      y += summaryLines.length * 5 + 8;

      // State / Type
      if (result.state || result.leaseType) {
        doc.setTextColor(107, 101, 96);
        doc.setFontSize(8);
        const meta = [result.state && `State: ${result.state}`, result.leaseType && `Type: ${result.leaseType}`].filter(Boolean).join('   |   ');
        doc.text(meta, margin, y);
        y += 8;
      }

      // Divider
      doc.setDrawColor(232, 228, 223);
      doc.line(margin, y, pageW - margin, y);
      y += 8;

      // ── Flags ────────────────────────────────────────────────────
      const flagOrder: Array<'critical' | 'warning' | 'info'> = ['critical', 'warning', 'info'];

      for (const type of flagOrder) {
        const flags = result.flags.filter((f) => f.type === type);
        if (flags.length === 0) continue;

        const fcfg = FLAG_CONFIG[type];
        checkPage(16);

        // Section heading
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        const [fr, fg, fb] = hexToRgb(fcfg.color);
        doc.setTextColor(fr, fg, fb);
        doc.text(`${fcfg.label} Issues (${flags.length})`, margin, y);
        y += 8;

        for (const flag of flags) {
          checkPage(30);

          // Card background
          const cardH = estimateCardHeight(doc, flag, contentW);
          const [bgR, bgG, bgB] = hexToRgb(fcfg.bgColor);
          doc.setFillColor(bgR, bgG, bgB);
          doc.roundedRect(margin, y, contentW, cardH, 2, 2, 'F');
          const [bdR, bdG, bdB] = hexToRgb(fcfg.borderColor);
          doc.setDrawColor(bdR, bdG, bdB);
          doc.roundedRect(margin, y, contentW, cardH, 2, 2, 'S');

          // Left accent bar
          doc.setFillColor(fr, fg, fb);
          doc.rect(margin, y, 3, cardH, 'F');

          const cx = margin + 7;
          let cy = y + 6;

          // Section + title
          doc.setFontSize(8);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(fr, fg, fb);
          doc.text(`${flag.section} — ${flag.title}`, cx, cy);
          cy += 5;

          // Description
          doc.setFontSize(8);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(68, 68, 68);
          const descLines = doc.splitTextToSize(flag.description, contentW - 12);
          doc.text(descLines, cx, cy);
          cy += descLines.length * 4.5 + 3;

          // Action
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(fr, fg, fb);
          doc.setFontSize(7.5);
          doc.text('Action: ', cx, cy);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(68, 68, 68);
          const actionX = cx + doc.getTextWidth('Action: ');
          const actionLines = doc.splitTextToSize(flag.action, contentW - 12 - doc.getTextWidth('Action: '));
          doc.text(actionLines, actionX, cy);

          y += cardH + 4;
          checkPage(8);
        }

        y += 4;
      }

      // ── Footer ───────────────────────────────────────────────────
      const totalPages = (doc as any).getNumberOfPages();
      for (let p = 1; p <= totalPages; p++) {
        doc.setPage(p);
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(156, 149, 144);
        doc.text(
          'This report is for informational purposes only and does not constitute legal advice.',
          margin,
          pageH - 8
        );
        doc.text(`Page ${p} of ${totalPages}`, pageW - margin - 20, pageH - 8);
      }

      // Save
      const safeName = fileName.replace(/\.[^.]+$/, '').replace(/[^a-z0-9]/gi, '-');
      doc.save(`revealr-report-${safeName}.pdf`);
    } catch (err) {
      console.error('PDF generation error:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border-base bg-bg-card text-text-primary font-semibold text-sm hover:border-accent/40 hover:text-accent transition-all duration-150 shadow-card disabled:opacity-50"
    >
      {loading ? (
        <>
          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
          </svg>
          Generating PDF…
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download PDF Report
        </>
      )}
    </button>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function estimateCardHeight(doc: any, flag: any, width: number): number {
  const descLines = doc.splitTextToSize(flag.description, width - 12);
  const actionLines = doc.splitTextToSize(flag.action, width - 12 - 20);
  return 6 + 5 + descLines.length * 4.5 + 3 + actionLines.length * 4.5 + 6;
}
