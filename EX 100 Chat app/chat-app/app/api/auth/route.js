import { NextResponse } from 'next/server';
import { login, register } from '../../../backend/services/authService';

export async function POST(request) {
  try {
    const { username, password, mode } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 });
    }

    let user;
    if (mode === 'register') {
      user = await register(username, password);
    } else {
      user = await login(username, password);
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
