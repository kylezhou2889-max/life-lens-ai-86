import { useState } from 'react';
import { UserAccount } from '@/types/memoir';

const USERS_KEY = 'memoir_users';
const CURRENT_USER_KEY = 'memoir_current_user';

function getUsers(): Record<string, { password: string; account: UserAccount }> {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, { password: string; account: UserAccount }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const register = (email: string, password: string, name: string): { success: boolean; error?: string } => {
    const users = getUsers();
    if (users[email]) {
      return { success: false, error: '该邮箱已注册' };
    }
    const account: UserAccount = {
      id: crypto.randomUUID(),
      email,
      name,
      createdAt: new Date().toISOString(),
    };
    users[email] = { password, account };
    saveUsers(users);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(account));
    setCurrentUser(account);
    return { success: true };
  };

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const users = getUsers();
    const user = users[email];
    if (!user) return { success: false, error: '账号不存在' };
    if (user.password !== password) return { success: false, error: '密码错误' };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user.account));
    setCurrentUser(user.account);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setCurrentUser(null);
  };

  return { currentUser, register, login, logout };
}
