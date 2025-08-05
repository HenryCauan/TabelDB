import db from '@/lib/db';

export async function PUT(req, { params }) {
  const id = params.id;
  const { nome, email } = await req.json();

  const stmt = db.prepare('UPDATE usuarios SET nome = ?, email = ? WHERE id = ?');
  stmt.run(nome, email, id);

  return Response.json({ status: 'ok' });
}
