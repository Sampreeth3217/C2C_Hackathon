import { useMemo, useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import PrimaryButton from '../components/ui/PrimaryButton';
import SecondaryButton from '../components/ui/SecondaryButton';
import InputField from '../components/ui/InputField';
import { useApp } from '../hooks/useApp';

export default function Profile() {
  const { wallet, user, setUser } = useApp();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(() => ({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    avatar: user?.avatar || '',
  }));

  const avatarSrc = useMemo(
    () => form.avatar || user?.avatar || 'https://api.dicebear.com/9.x/identicon/svg?seed=blocadamia',
    [form.avatar, user?.avatar]
  );

  const startEdit = () => {
    setForm({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
      avatar: user?.avatar || '',
    });
    setEditing(true);
  };

  const cancelEdit = () => setEditing(false);

  const save = () => {
    const next = {
      name: form.name.trim() || 'Guest',
      email: form.email.trim(),
      bio: form.bio.trim(),
      avatar: form.avatar.trim(),
    };
    setUser(next);
    setEditing(false);
  };

  return (
    <div className="space-y-6">
      <GlassCard>
        <div className="flex items-center gap-4">
          <img src={avatarSrc} alt="avatar" className="h-16 w-16 rounded-full object-cover bg-white/60" />
          <div className="flex-1">
            <div className="heading flex items-center gap-3">
              <span>{user?.name || 'Guest'}</span>
              {!editing && (
                <SecondaryButton onClick={startEdit} className="px-3 py-1 text-sm">Edit Profile</SecondaryButton>
              )}
            </div>
            <div className="text-sm text-gray-600">{user?.email || 'No email set'}</div>
            <div className="text-sm text-gray-600 line-clamp-2">{user?.bio || 'No bio yet'}</div>
            <div className="text-sm text-gray-600 mt-1">Wallet: {wallet.address || 'Not connected'}</div>
            {wallet.address && (
              <PrimaryButton className="mt-2" onClick={() => navigator.clipboard.writeText(wallet.address)}>Copy Address</PrimaryButton>
            )}
          </div>
        </div>
      </GlassCard>

      {editing && (
        <GlassCard>
          <div className="heading mb-4">Edit Profile</div>
          <div className="grid md:grid-cols-2 gap-4">
            <InputField label="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            <InputField label="Email" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            <InputField label="Avatar URL" placeholder="https://..." value={form.avatar} onChange={(e) => setForm((f) => ({ ...f, avatar: e.target.value }))} />
            <label className="block md:col-span-2">
              <div className="label mb-1">Bio</div>
              <textarea
                className="w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 px-3 py-2 bg-white/70 min-h-[96px]"
                value={form.bio}
                onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              />
            </label>
          </div>
          <div className="flex gap-3 mt-4">
            <PrimaryButton onClick={save}>Save</PrimaryButton>
            <SecondaryButton onClick={cancelEdit}>Cancel</SecondaryButton>
          </div>
        </GlassCard>
      )}

      <GlassCard>
        <div className="heading mb-2">Recent Activity</div>
        <div className="text-sm text-gray-600">No recent activity.</div>
      </GlassCard>
  </div>
  );
}
