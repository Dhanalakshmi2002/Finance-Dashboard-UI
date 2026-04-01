import { useStore } from '../store/useStore';

export const RoleSwitcher = () => {
  const { role, setRole } = useStore();

  return (
    <select
      value={role}
      onChange={(e) => setRole(e.target.value as any)}
      className="border p-2 rounded"
    >
      <option value="viewer">Viewer</option>
      <option value="admin">Admin</option>
    </select>
  );
};
