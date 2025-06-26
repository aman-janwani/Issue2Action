'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

export default function AuthCallbackPage() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/github/callback`);

    // GitHub App installation URL (triggers repo selection UI)
    const installUrl = `https://github.com/apps/Issues2Action/installations/new?state=${user?.id}&redirect_uri=${redirectUri}`;
    
    window.location.href = installUrl;
  }, [isLoaded]);

  return <p>Redirecting to GitHub App installation…</p>;
}
