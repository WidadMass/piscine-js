import { NextResponse } from 'next/server';
import { loginOrRegister } from '../../../backend/services/authService';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 });
    }

    const user = await loginOrRegister(username, password);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
