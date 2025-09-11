import React, { useCallback, useEffect, useRef, useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import PrimaryButton from '../components/ui/PrimaryButton';
import { QrScanner } from '@yudiel/react-qr-scanner';

export default function Scanner() {
  const [permission, setPermission] = useState('idle'); // idle | asking | granted | denied | error
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const streamRef = useRef(null);

  // Ask for camera access explicitly (user gesture friendly)
  const requestPermission = useCallback(async () => {
    setError('');
    setPermission('asking');
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Camera not supported in this browser');
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      // Stop immediately; the scanner component will acquire its own stream
      stream.getTracks().forEach((t) => t.stop());
      setPermission('granted');
    } catch (e) {
      console.error(e);
      setError(e?.message || 'Camera permission failed');
      setPermission(e?.name === 'NotAllowedError' ? 'denied' : 'error');
    }
  }, []);

  // Clean-up if anything leaked
  useEffect(() => () => {
    if (streamRef.current) {
      try {
        streamRef.current.getTracks().forEach((t) => t.stop());
      } catch (e) {
        // ignore cleanup errors
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      <GlassCard>
        <div className="heading mb-2">QR Scanner</div>
        <p className="text-sm text-gray-500 mb-4">Scan a QR code to paste its contents below. We’ll ask for camera access first.</p>

        {permission !== 'granted' ? (
          <div className="flex flex-col items-center gap-3 py-6">
            <PrimaryButton onClick={requestPermission} disabled={permission === 'asking'}>
              {permission === 'asking' ? 'Requesting…' : 'Enable Camera'}
            </PrimaryButton>
            {permission === 'denied' && (
              <p className="text-red-500 text-sm text-center">
                Camera access was denied. Please allow camera permission in your browser settings and try again.
              </p>
            )}
            {error && permission !== 'denied' && <p className="text-amber-600 text-sm">{error}</p>}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="w-full max-w-md overflow-hidden rounded-xl border border-white/10">
              <QrScanner
                onDecode={(text) => setResult(text)}
                onError={(err) => setError(err?.message || String(err))}
                constraints={{ facingMode: 'environment' }}
                // Slightly lower fps to save power on mobile
                scanDelay={250}
              />
            </div>
            <div className="w-full max-w-md">
              <label className="block text-sm text-gray-500 mb-1">Decoded Result</label>
              <textarea
                className="w-full h-28 rounded-md bg-white/5 border border-white/10 p-3 text-sm"
                readOnly
                value={result}
                placeholder="Point the camera at a QR code…"
              />
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
