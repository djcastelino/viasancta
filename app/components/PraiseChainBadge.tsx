'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Flame } from 'lucide-react';

export default function PraiseChainBadge() {
  const [totalMinutes, setTotalMinutes] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://reels.192-227-172-231.sslip.io/praise-chain', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data?.totalMinutes === 'number') {
          setTotalMinutes(data.totalMinutes);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <Link
      href="/pray-without-ceasing"
      className="pilgrim-top-praise-pill"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '7px 14px',
        borderRadius: '999px',
        background: 'linear-gradient(135deg, #241b10 0%, #17110a 100%)',
        border: '1px solid #c5a358',
        color: '#fef08a',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.5px',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        boxShadow: '0 2px 10px rgba(165, 139, 96, 0.2)',
      }}
      title="Join the 60-Second Pray Without Ceasing Thanksgiving Chain"
    >
      <Flame size={14} color="#fbbf24" style={{ flexShrink: 0 }} />
      <span>NEW: Pray Without Ceasing</span>
      {totalMinutes !== null && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            paddingLeft: '8px',
            marginLeft: '2px',
            borderLeft: '1px solid rgba(197, 163, 88, 0.4)',
            color: '#a7f3d0',
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#34d399',
              display: 'inline-block',
            }}
          />
          {totalMinutes.toLocaleString()} {totalMinutes === 1 ? 'min' : 'mins'} offered
        </span>
      )}
    </Link>
  );
}
