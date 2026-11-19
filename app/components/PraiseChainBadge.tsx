'use client';

import React, { useEffect, useState } from 'react';
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '0.35rem' }}>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          alignSelf: 'flex-start',
          padding: '0.28rem 0.65rem',
          borderRadius: '999px',
          background: 'rgba(212, 175, 55, 0.16)',
          border: '1px solid rgba(212, 175, 55, 0.55)',
          color: '#fef08a',
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        <Flame size={13} color="#fbbf24" />
        NEW: Pray Without Ceasing (60-Sec Thanksgiving Chain)
      </span>

      {totalMinutes !== null && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            alignSelf: 'flex-start',
            padding: '0.24rem 0.65rem',
            borderRadius: '999px',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(52, 211, 153, 0.45)',
            color: '#a7f3d0',
            fontSize: '0.74rem',
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#34d399',
              display: 'inline-block',
            }}
          />
          Cumulative Praise Offered: <strong style={{ color: '#fef08a' }}>{totalMinutes.toLocaleString()} {totalMinutes === 1 ? 'min' : 'mins'}</strong>
        </span>
      )}
    </div>
  );
}
