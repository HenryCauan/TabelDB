import db from '@/lib/db';

export async function GET() {
  const stmt = db.prepare('SELECT * FROM usuarios');
  const usuarios = stmt.all();

  return Response.json(usuarios);
}
